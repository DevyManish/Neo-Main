import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
import { NextRequest } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyB_C-WLVzB59hVY7xmbC8QJURAUJ0QCUJk");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const meetId = searchParams.get("meetId");
    if (!meetId) {
      return Response.json(
        { success: false, data: null, message: "not found meetId" },
        { status: 500 }
      );
    }
    const meeting = await prisma.meeting.findFirst({
      where: {
        meetId: meetId,
      },
      select: {
        conversations: true,
      },
    });

    if (!meeting || meeting?.conversations.length === 0) {
      return Response.json(
        { success: true, data: null, message: "no conversation found" },
        { status: 200 }
      );
    }

    const transcript = meeting.conversations
      .map((c) => `[${c.speaker}] ${c.text}`)
      .join("\n");

    const payload = {
      input: transcript,
    };

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result =
      await model.generateContent(`You are a Meeting Analyzer AI. Your task is to process a full meeting transcript and generate a structured output containing two main sections: <meetingsummary> and <todo>.
Follow these instructions precisely:
<meetingsummary>
Provide a clear, concise, and comprehensive summary of the entire meeting.
Include all key discussion points, decisions made, problems identified, proposed solutions, assigned responsibilities, and any critical context.
Organize the content logically (e.g., by agenda item or topic) for readability.
Use neutral, professional language. Do not include personal opinions or assumptions.
Ensure all important details from the transcript are captured without unnecessary fluff.
<todo>
Extract all development-related tasks, feature requests, technical actions, or software implementation items discussed in the meeting.
Each task must be enclosed in a <level> tag.
Inside each <level>, include:
A title describing the task (e.g., "Set Up Backend API Server").
A <description> that clearly explains:
What needs to be built or done.
The step-by-step approach the AI coding agent should follow.
Any required tools, frameworks, or packages to install.
Code structure or file organization if relevant.
Example: If a package is needed, explicitly state: "Install [package_name] using pip: pip install [package_name]".
Ensure each <level> is self-contained and actionable for an AI coding agent.
Omit non-technical tasks (e.g., scheduling, emails) unless they involve automation or integration via code.
Output Format:

Always wrap the entire output with <meet> ... </meet>.
Never include markdown. Use only the specified XML-like tags.
Do not add explanations, comments, or extra text outside the structure.
Example Output Structure:
</system_prompt>

<meetingsummary>
...
</meetingsummary>

<todo>
<level>
Install Required Dependencies
<description>
Install Python packages needed for the project: fastapi, uvicorn, python-dotenv.
Run the following command in the terminal: pip install fastapi uvicorn python-dotenv.
Create a requirements.txt file and list all installed packages using pip freeze > requirements.txt.
</description>
</level>
<level>
Create API Endpoint for User Authentication
<description>
Build a POST endpoint /api/auth/login using FastAPI.
Create a file main.py and define a route that accepts JSON with 'email' and 'password'.
Include input validation using Pydantic models.
For now, return a mock JWT token response. Integrate real authentication in a later step.
</description>
</level>
</todo>
here is the transcription of meeting: ${transcript}
`);
    const summary = result.response.text();

    const saveSummary = await prisma.meeting.updateMany({
      where: { meetId: meetId },
      data: {
        summary,
      },
    });

    return Response.json(
      { success: true, data: summary, message: "summary saved" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, data: null }, { status: 500 });
  }
}

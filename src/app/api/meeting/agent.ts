import { createAgent, createNetwork, gemini } from "@inngest/agent-kit";
import { meetingPrompt } from "./summary/prompt";
import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";

export const meetingAgentFunction = inngest.createFunction(
  { id: "meeting-agent" },
  {
    event: "meeting-agent/run",
  },
  async ({ event, step }) => {
    const meetingAgent = createAgent({
      name: "meeting-agent",
      description: "an expert meeting agent",
      system: meetingPrompt,
      model: gemini({ model: "gemini-2.5-flash" }),
    });

    const netwrok = createNetwork({
      name: "meeting-agent-network",
      agents: [meetingAgent],
      maxIter:15 ,
      router: async ({ network }) => {
        const summary = network.state.data.summary;
        if (summary) {
          return;
        }
        return meetingAgent;
      },
    });

    const result = await netwrok.run(event.data.value);
    const isError = !result.state.data.summary;

    await step.run("save-summary-result", async () => {
      await prisma.meeting.update({
        where: { meetId: event.data.meetingId },
        data: {
          summary: isError ? null : result.state.data.summary,
        },
      });
    });
  }
);

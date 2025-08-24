import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import axios from "axios";
import { generateSlug } from "random-word-slugs";

export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany();
    return Response.json({ success: true, data: meetings }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, data: null }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { meetId } = await req.json();
  try {
    // const meetId = meetLink.split("/")[1];
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ success: false, data: null }, { status: 500 });
    }

    console.log(meetId);
    const res = await axios.post(
      "https://gateway.dev.vexa.ai/bots",
      {
        platform: "google_meet",
        native_meeting_id: meetId,
        bot_name: "Mr. Neo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "8aoVN6pTXCKvDKKs2rYd5QExom1ccZP2OIdxgKWS",
        },
      }
    );

    console.log(res.data);
    const saveMeeting = await prisma.meeting.create({
      data: {
        meetId: meetId,
        name: generateSlug(2, {
          format: "kebab",
        }),
        botId: res.data.id.toString(),
        status: res.data.status,
        // startTime: res.data.start_time,
        userId: "431aa3f5-cfbe-456c-9bcb-1486a8d3f620",
      },
    });

    return Response.json({ success: true, data: saveMeeting }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, data: null }, { status: 500 });
  }
}

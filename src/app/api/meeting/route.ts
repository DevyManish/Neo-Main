import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import axios from "axios";


export async function POST(req: Request) {
  const { meetId } = await req.json();
  try {
    // const meetId = meetLink.split("/")[1];

    console.log(meetId)
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
        botId: res.data.id.toString(),
        status: res.data.status,
        // startTime: res.data.start_time,
        userId:"d0ef6061-29a6-415d-a444-0d152861d340"
      },
    });

    return Response.json({ success: true, data: saveMeeting }, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json({success:false, data:null},{status:500});
  }
}

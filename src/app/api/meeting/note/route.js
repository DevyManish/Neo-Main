import { prisma } from "@/lib/db";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json(); // need this in Next.js App Router
    const { meetingId } = body;

    if (!meetingId) {
      return Response.json(
        { success: false, message: "meetingId and segments are required" },
        { status: 400 }
      );
    }

    try {
      const res = await axios.get(
        `https://gateway.dev.vexa.ai/transcripts/google_meet/${meetingId}`,
        {
          headers: {
            "X-API-Key": "8aoVN6pTXCKvDKKs2rYd5QExom1ccZP2OIdxgKWS",
          },
        }
      );
      console.log(meetingId);
      const meeting = await prisma.meeting.findFirst({
        where: { meetId: meetingId },
      });

      const saveConversation = await prisma.conversation.createMany({
        data: res.data.segments.map((seg) => ({
          meetingId: meeting.id,
          start: seg.start,
          end: seg.end,
          text: seg.text,
          language: seg.language,
          speaker: seg.speaker || null,
          absoluteStartTime: seg.absolute_start_time
            ? new Date(seg.absolute_start_time)
            : null,
          absoluteEndTime: seg.absolute_end_time
            ? new Date(seg.absolute_end_time)
            : null,
        })),
        skipDuplicates: true,
      });

      return Response.json(
        { success: true, data: saveConversation },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return Response.json({ success: false, data: null }, { status: 400 });
    }
  } catch (error) {
    console.error("Error saving conversation:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to save conversation",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

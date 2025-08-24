import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const meetId = searchParams.get("meetId");

    if (!meetId) {
      return Response.json(
        { success: false, data: null, message: "not found meetId" },
        { status: 500 }
      );
    }

    const meetingBullets = await prisma.meeting.findFirst({
      where: {
        meetId,
      },
    });

    if (!meetingBullets) {
      return Response.json(
        { success: false, data: null, message: "bullet not found" },
        { status: 500 }
      );
    }

    return Response.json(
        { success: false, data: meetingBullets, message: "bullets fetched successfully" },
        { status: 500 }
      );
  } catch (error) {
     return Response.json({ success: false, data: null }, { status: 500 });
  }
}

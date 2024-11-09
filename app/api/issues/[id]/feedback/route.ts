import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await prisma.feedback.findMany({
      where: {
        issueId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching feedback" },
      { status: 500 }
    );
  }
}

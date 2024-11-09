import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const issue = await prisma.issue.update({
      where: {
        id: params.id,
      },
      data: {
        notified: true,
        notifiedAt: new Date(),
      },
    });
    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating notification status" },
      { status: 500 }
    );
  }
}

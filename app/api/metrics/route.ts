import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    // Calculate averages
    const nps =
      users.reduce((acc, user) => acc + user.npsScore, 0) / users.length;
    const csat = users.reduce((acc, user) => acc + user.csatScore, 0);
    const ces =
      users.reduce((acc, user) => acc + user.cesScore, 0) / users.length;

    // Calculate sentiment from feedback
    const feedback = await prisma.feedback.findMany();
    const totalFeedback = feedback.length;
    const sentimentCounts = feedback.reduce(
      (acc, item) => {
        const sentiment = item.sentiment.toLowerCase();
        if (sentiment in acc) {
          acc[sentiment as keyof typeof acc] += 1;
        }
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 }
    );

    return NextResponse.json({
      nps,
      csat,
      ces,
      sentiment: {
        positive: (sentimentCounts.positive / totalFeedback) * 100,
        neutral: (sentimentCounts.neutral / totalFeedback) * 100,
        negative: (sentimentCounts.negative / totalFeedback) * 100,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching metrics" },
      { status: 500 }
    );
  }
}

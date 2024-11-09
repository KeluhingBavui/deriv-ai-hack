import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const issue = await prisma.issue.create({ data });
    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating issue" },
      { status: 500 }
    );
  }
}

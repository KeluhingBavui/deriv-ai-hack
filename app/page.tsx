"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { ScrollButton } from "@/components/ui/scroll-button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { WobbleCard } from "@/components/ui/wobble-card";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Brain,
  Clock,
  MessageSquare,
  Split,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LandingPage() {
  const words = [
    { text: "Client" },
    { text: "Automated" },
    { text: "Sentiment" },
    { text: "Classification" },
    { text: "Analytics" },
    { text: "Dynamic" },
    { text: "Escalation" },
    { text: "(CASCADE)" },
  ];

  const features = [
    {
      title: "Real-time Sentiment Analysis",
      description:
        "Instantly analyze customer feedback from multiple sources using AI",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Critical Issue Detection",
      description:
        "Automatically identify and notify teams of critical customer issues",
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Streamline communication between support, engineering, and finance teams",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  const problems = [
    {
      title: "Manual Feedback Analysis",
      description:
        "Teams waste hours manually reviewing and categorizing customer feedback across multiple channels",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Delayed Response Times",
      description:
        "Critical issues often go unnoticed, leading to customer dissatisfaction and churn",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: "Siloed Communication",
      description:
        "Lack of coordination between teams results in redundant work and missed opportunities",
      icon: <Split className="w-6 h-6" />,
    },
  ];

  const businessValues = [
    {
      title: "Increased Efficiency",
      description:
        "Reduce feedback processing time by up to 80% with AI-powered automation",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Better Customer Retention",
      description:
        "Improve response times and customer satisfaction by catching issues early",
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: "Cost Reduction",
      description:
        "Lower operational costs through automated analysis and streamlined workflows",
      icon: <Split className="w-6 h-6" />,
    },
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${spaceGrotesk.className}`}>
      {/* Hero section - full height */}
      <section
        id="hero"
        className="h-screen relative flex flex-col items-center justify-center"
      >
        <BackgroundBeams className="opacity-20" />
        <Boxes className="absolute inset-0 opacity-20" />
        <div className="text-center space-y-8 relative z-10 max-w-4xl">
          <TypewriterEffect words={words} />
          <p className="max-w-lg mx-auto text-lg">
            Transform customer feedback into actionable insights with our
            AI-powered dashboard.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 mt-8">
              Launch Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
        <ScrollButton targetId="problems" />
      </section>

      {/* Main content sections - each full height */}
      <div className="space-y-0">
        {/* Problems section */}
        <section
          id="problems"
          className="min-h-screen relative flex items-center justify-center py-20 bg-gray-50"
        >
          <div className="max-w-5xl mx-auto px-4">
            <FeatureGrid
              title="Problems We Solve"
              items={problems}
              accentColor="red"
            />
          </div>
          <ScrollButton targetId="solutions" />
        </section>

        {/* Solutions section */}
        <section
          id="solutions"
          className="min-h-screen relative flex items-center justify-center py-20"
        >
          <div className="max-w-5xl mx-auto px-4">
            <FeatureGrid
              title="Our Solutions"
              items={features}
              accentColor="blue"
            />
          </div>
          <ScrollButton targetId="business-value" />
        </section>

        {/* Business Value section */}
        <section
          id="business-value"
          className="min-h-screen relative flex items-center justify-center py-20 bg-gray-50"
        >
          <div className="max-w-5xl mx-auto px-4">
            <FeatureGrid
              title="Business Value"
              items={businessValues}
              accentColor="green"
            />
          </div>
          <ScrollButton targetId="preview" />
        </section>

        {/* Preview section */}
        <section
          id="preview"
          className="min-h-screen relative flex flex-col items-center justify-center py-20"
        >
          <div className="max-w-5xl mx-auto px-4">
            <WobbleCard>
              <Image
                src="/dashboard-preview.png"
                alt="dashboard"
                width={1400}
                height={720}
                className="rounded-lg border shadow-lg"
              />
            </WobbleCard>
          </div>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 mt-8">
              Try Dashboard Now
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <ScrollButton targetId="hero" direction="up" />
        </section>
      </div>
    </div>
  );
}

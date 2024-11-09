"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { ScrollButton } from "@/components/ui/scroll-button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
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
      title: "Centralized Feedback Pipeline",
      description:
        "Aggregate customer feedback from multiple sources into a centralized pipeline",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Sentiment Analysis & Smart Prioritization",
      description:
        "Automatically analyze customer feedback and prioritize issues based on sentiment and severity",
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: "Critical Issue Identification & Automated Escalation",
      description:
        "Automatically identify and escalate critical issues to the appropriate team",
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
      title: "Faster Response Times",
      description:
        "Reduce feedback processing time by 50% with AI-powered automation",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Increase Productivity",
      description: "Free up resources for more strategic initiatives",
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: "Customer Satisfaction",
      description: "Improve customer satisfaction by addressing issues faster",
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
        <ScrollButton targetId="solutions" />
      </section>

      {/* Main content sections - each full height */}
      <div className="space-y-0">
        {/* Problems section */}
        {/* <section
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
        </section> */}

        {/* Solutions section */}
        <section
          id="solutions"
          className="min-h-screen relative flex items-center justify-center py-20"
        >
          <div className="max-w-5xl mx-auto px-4">
            <FeatureGrid
              title="Our Solution: Automated Triage System"
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
          <div className="flex flex-col overflow-hidden">
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-4xl font-semibold text-black dark:text-white">
                    Experience the future of <br />
                    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                      Customer Analytics
                    </span>
                  </h1>
                </>
              }
            >
              <Image
                src={`/dashboard-preview.png`}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 mt-8">
              Launch Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <ScrollButton targetId="hero" direction="up" />
        </section>
      </div>
    </div>
  );
}

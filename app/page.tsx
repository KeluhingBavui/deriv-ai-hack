"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
import Link from "next/link";

export default function LandingPage() {
  const words = [
    {
      text: "Customer",
    },
    {
      text: "Feedback",
    },
    {
      text: "Analysis",
    },
    {
      text: "Dashboard",
    },
  ];

  const features = [
    {
      title: "Real-time Sentiment Analysis",
      description:
        "Instantly analyze customer feedback from multiple sources using AI",
    },
    {
      title: "Critical Issue Detection",
      description:
        "Automatically identify and notify teams of critical customer issues",
    },
    {
      title: "Team Collaboration",
      description:
        "Streamline communication between support, engineering, and finance teams",
    },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <BackgroundBeams />

      {/* Hero Section */}
      <div className="h-[80vh] relative flex flex-col items-center justify-center">
        <div className="text-center space-y-8 relative z-10">
          <TypewriterEffect words={words} />
          <p className="text-neutral-300 max-w-lg mx-auto">
            Transform customer feedback into actionable insights with our
            AI-powered dashboard.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-700"
            >
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <WavyBackground className="max-w-4xl mx-auto px-8">
        <div className="space-y-16 pb-20">
          <h2 className="text-3xl font-bold text-center text-white">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group rounded-xl border border-white/10 p-6 hover:border-white/30 transition"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}

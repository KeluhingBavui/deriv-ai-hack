"use client";

import { useEffect, useState } from "react";

interface Metrics {
  nps: number;
  csat: number;
  ces: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export default function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    nps: 0,
    csat: 0,
    ces: 0,
    sentiment: {
      positive: 0,
      neutral: 0,
      negative: 0,
    },
  });

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/metrics");
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Update metrics every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return { metrics, updateMetrics: fetchMetrics };
}

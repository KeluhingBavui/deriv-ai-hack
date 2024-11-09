"use client"

import { useState, useEffect } from 'react';

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
    nps: 64.34,
    csat: 84.67,
    ces: 3.09,
    sentiment: {
      positive: 45,
      neutral: 25,
      negative: 30,
    }
  });

  const updateMetrics = async () => {
    // In a real app, this would be an API call
    // For now, we'll just simulate random changes
    setMetrics(prev => ({
      ...prev,
      nps: Math.min(100, Math.max(-100, prev.nps + (Math.random() - 0.5) * 5)),
      csat: Math.min(100, Math.max(0, prev.csat + (Math.random() - 0.5) * 3)),
      ces: Math.min(5, Math.max(1, prev.ces + (Math.random() - 0.5) * 0.2)),
    }));
  };

  // Update metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(updateMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return { metrics, updateMetrics };
} 
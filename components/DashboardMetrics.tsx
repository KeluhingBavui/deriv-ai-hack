"use client";

import { SentimentIndicator } from "../components/SentimentIndicator";
import useMetrics from "../hooks/useMetrics";
import { GaugeChart } from "./GaugeChart";

export default function DashboardMetrics() {
  const { metrics } = useMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <GaugeChart
        title="Net Promoter Score (NPS)"
        value={metrics.nps ? Number(metrics.nps.toFixed(2)) : 0}
        max={100}
        colors={["#4CAF50", "#FFA000", "#F44336"]}
      />
      <GaugeChart
        title="Customer Satisfaction Score (CSAT)"
        value={metrics.csat ? Number(metrics.csat.toFixed(2)) : 0}
        max={100}
        colors={["#4CAF50", "#FFA000", "#F44336"]}
      />
      <GaugeChart
        title="Customer Effort Score (CES)"
        value={metrics.ces ? Number(metrics.ces.toFixed(2)) : 0}
        max={5}
        unit=""
        colors={["#4CAF50", "#FFA000", "#F44336"]}
      />
      <SentimentIndicator
        positive={metrics.sentiment.positive}
        neutral={metrics.sentiment.neutral}
        negative={metrics.sentiment.negative}
      />
    </div>
  );
}

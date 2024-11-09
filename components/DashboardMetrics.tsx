"use client";

import { SentimentIndicator } from "../components/SentimentIndicator";
import useMetrics from "../hooks/useMetrics";
import { CESPieChart } from "./CESPieChart";
import { CSATPieChart } from "./CSATPieChart";
import { NPSPieChart } from "./NPSPieChart";

export default function DashboardMetrics() {
  const { metrics } = useMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <NPSPieChart value={metrics.nps ? Number(metrics.nps.toFixed(2)) : 0} />
      <CSATPieChart value={metrics.csat ? Number(metrics.csat.toFixed(2)) : 0} />
      <CESPieChart value={metrics.ces ? Number(metrics.ces.toFixed(2)) : 0} />
      <SentimentIndicator
        positive={metrics.sentiment.positive}
        neutral={metrics.sentiment.neutral}
        negative={metrics.sentiment.negative}
      />
    </div>
  );
}

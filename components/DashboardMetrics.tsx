import { GaugeChart } from "./GaugeChart";
import { SentimentIndicator } from "../components/SentimentIndicator";
import useMetrics from "../hooks/useMetrics";

export default function DashboardMetrics() {
  const { metrics } = useMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <GaugeChart 
        title="Net Promoter Score (NPS)"
        value={metrics.nps}
        max={100}
        colors={['#4CAF50', '#FFA000', '#F44336']}
      />
      <GaugeChart 
        title="Customer Satisfaction Score (CSAT)"
        value={metrics.csat}
        max={100}
        colors={['#4CAF50', '#FFA000', '#F44336']}
      />
      <GaugeChart 
        title="Customer Effort Score (CES)"
        value={metrics.ces}
        max={5}
        unit=""
        colors={['#4CAF50', '#FFA000', '#F44336']}
      />
      <SentimentIndicator 
        positive={metrics.sentiment.positive}
        neutral={metrics.sentiment.neutral}
        negative={metrics.sentiment.negative}
      />
    </div>
  );
} 
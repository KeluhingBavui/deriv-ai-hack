import IssuesTable from "@/components/IssuesTable";
import ChatBubble from "../components/ChatBubble";
import DashboardMetrics from "../components/DashboardMetrics";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Customer Satisfaction Dashboard
          </h1>
        </div>

        <DashboardMetrics />
        <IssuesTable />
        <ChatBubble />
      </div>
    </main>
  );
}

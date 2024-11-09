import DashboardMetrics from "../components/DashboardMetrics";
import IssuesTable from "@/components/IssuesTable";
import ChatBubble from "../components/ChatBubble";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer Satisfaction Dashboard</h1>
          <Button variant="default">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <DashboardMetrics />
        <IssuesTable />
        <ChatBubble />
      </div>
    </main>
  );
}

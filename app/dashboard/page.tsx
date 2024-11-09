import DashboardMetrics from "@/components/DashboardMetrics";
import IssuesTable from "@/components/IssuesTable";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">CASCADE Dashboard</h1>
        </div>
        <DashboardMetrics />
        <IssuesTable />
      </div>
    </main>
  );
}

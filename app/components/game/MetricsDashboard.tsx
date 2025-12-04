import React from "react";
import { Users, Leaf, ShieldCheck, Wallet } from "lucide-react";
import { MetricCard } from "../ui/MetricCard";
import type { Metrics } from "../../types/game";

interface MetricsDashboardProps {
  metrics: Metrics;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  metrics,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
    <MetricCard
      label="Inclusion"
      value={metrics.Inclusion}
      icon={Users}
      color="blue"
    />
    <MetricCard
      label="Durabilité"
      value={metrics.Durabilité}
      icon={Leaf}
      color="green"
    />
    <MetricCard
      label="Responsabilité"
      value={metrics.Responsabilité}
      icon={ShieldCheck}
      color="orange"
    />

    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <Wallet size={60} />
      </div>
      <span
        className={`text-2xl font-black ${
          metrics.Budget < 0 ? "text-red-500" : "text-gray-200"
        }`}
      >
        {metrics.Budget}
      </span>
      <span className="text-xs font-bold text-gray-500 uppercase">
        Budget (€)
      </span>
    </div>
  </div>
);

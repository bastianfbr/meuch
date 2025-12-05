import React from "react";
import { Users, Leaf, ShieldCheck } from "lucide-react";
import { MetricCard } from "../ui/MetricCard";
import type { Metrics } from "../../types/game";

interface MetricsDashboardProps {
  metrics: Metrics;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  metrics,
}) => (
  <div className="grid grid-cols-3 gap-3 mb-8">
    <MetricCard
      label="Société"
      value={metrics.Société}
      icon={Users}
      color="blue"
    />
    <MetricCard
      label="Environnement"
      value={metrics.Environnement}
      icon={Leaf}
      color="green"
    />
    <MetricCard
      label="Economie"
      value={metrics.Economie}
      icon={ShieldCheck}
      color="orange"
    />
  </div>
);

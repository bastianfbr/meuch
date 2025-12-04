import React from "react";
import { LucideIcon } from "lucide-react";
import type { MetricColor } from "../../types/game";

interface MetricCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: MetricColor;
}

interface ColorClasses {
  text: string;
  bg: string;
  border: string;
  bar: string;
}

const colorClasses: Record<MetricColor, ColorClasses> = {
  red: {
    text: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    bar: "bg-red-500",
  },
  green: {
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    bar: "bg-emerald-500",
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    bar: "bg-orange-500",
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    bar: "bg-blue-500",
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
}) => {
  const style = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} p-4 transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start mb-2">
        <Icon className={`${style.text}`} size={24} />
        <span className={`text-xl font-black ${style.text}`}>{value}%</span>
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${style.bar} transition-all duration-700 ease-out`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
};

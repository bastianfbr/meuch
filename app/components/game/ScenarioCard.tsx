import React from "react";
import { Server, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import type { Scenario, Option } from "../../types/game";

interface ScenarioCardProps {
  scenario: Scenario;
  currentStep: number;
  totalScenarios: number;
  onChoice: (option: Option) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  currentStep,
  totalScenarios,
  onChoice,
}) => (
  <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t-4 border-t-orange-500">
    <div className="flex justify-between items-center mb-4">
      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-orange-400 border border-slate-700 flex items-center gap-2">
        <Server size={14} /> {scenario.phase}
      </span>
      <span className="text-xs font-mono text-gray-600">
        MISSION {currentStep + 1}/{totalScenarios}
      </span>
    </div>

    <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
      {scenario.context}
    </h2>

    <div className="space-y-3 mt-8">
      {scenario.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onChoice(opt)}
          className="w-full group text-left p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-linear-to-r hover:from-orange-500/10 hover:to-red-500/10 hover:border-orange-500/30 transition-all duration-300"
        >
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-gray-400 flex items-center justify-center font-bold text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
              {i + 1}
            </div>
            <span className="flex-1 font-medium text-gray-200 group-hover:text-white">
              {opt.text}
            </span>
            <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
          </div>
        </button>
      ))}
    </div>
  </Card>
);

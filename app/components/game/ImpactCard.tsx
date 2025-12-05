import React from "react";
import { TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import { FeedbackToast } from "../ui/FeedbackToast";
import type { Impact, RandomEvent } from "../../types/game";

interface ImpactCardProps {
  feedback?: string;
  userReaction?: string;
  impact: Impact | null;
  randomEvent: RandomEvent | null;
  onNext: () => void;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  feedback,
  userReaction,
  impact,
  randomEvent,
  onNext,
}) => (
  <Card className="border-orange-500/30 text-center py-10">
    <div className="text-left">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="text-orange-500" /> Impact sur le Village
      </h3>

      {feedback && userReaction && (
        <FeedbackToast feedback={feedback} userReaction={userReaction} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {impact &&
          Object.entries(impact).map(([k, v]) => (
            <div
              key={k}
              className={`flex justify-between items-center p-3 rounded-lg border
                ${
                  v > 0
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : v < 0
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-slate-800 border-slate-700 text-gray-500"
                }`}
            >
              <span className="text-xs font-bold uppercase truncate mr-2">
                {k}
              </span>
              <span className="font-bold font-mono whitespace-nowrap">
                {v > 0 ? "+" : ""}
                {v}
              </span>
            </div>
          ))}
      </div>

      {randomEvent && (
        <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-start gap-4 animate-pulse">
          <Zap className="text-purple-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-purple-200 text-sm mb-1">
              {randomEvent.title}
            </h4>
            <p className="text-xs text-purple-200/70">
              {randomEvent.description}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl bg-linear-to-r from-orange-500 to-red-600 font-bold text-white shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
      >
        Mission Suivante <ArrowRight size={20} />
      </button>
    </div>
  </Card>
);

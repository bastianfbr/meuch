import React from "react";
import { Trophy, RefreshCcw } from "lucide-react";
import { Card } from "../ui/Card";
import type { Metrics, GameState } from "../../types/game";

interface GameOverCardProps {
  gameState: GameState;
  endTitle?: string;
  endMessage?: string;
  metrics: Metrics;
  onReset: () => void;
}

export const GameOverCard: React.FC<GameOverCardProps> = ({
  gameState,
  endTitle,
  endMessage,
  metrics,
  onReset,
}) => (
  <Card className="border-orange-500/30 text-center py-10">
    <div className="animate-in zoom-in duration-300">
      <div
        className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${
          gameState === "win"
            ? "bg-linear-to-br from-orange-400 to-red-600"
            : "bg-slate-800"
        }`}
      >
        <Trophy size={40} className="text-white" />
      </div>
      <h2 className="text-4xl font-black text-white mb-2">{endTitle}</h2>
      <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
        {endMessage}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 text-center max-w-sm mx-auto">
        <div className="p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold text-blue-400">
            {metrics.Société}%
          </div>
          <div className="text-[10px] uppercase text-gray-500">Société</div>
        </div>
        <div className="p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold text-green-400">
            {metrics.Environnement}%
          </div>
          <div className="text-[10px] uppercase text-gray-500">
            Environnement
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold text-orange-400">
            {metrics.Economie}%
          </div>
          <div className="text-[10px] uppercase text-gray-500">Economie</div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition flex items-center gap-2 mx-auto cursor-pointer"
      >
        <RefreshCcw size={20} /> Recommencer la résistance
      </button>
    </div>
  </Card>
);

import React from "react";
import { ShieldCheck, Info } from "lucide-react";

interface GameHeaderProps {
  onInfoClick: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ onInfoClick }) => (
  <header className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
        <ShieldCheck size={28} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          VILLAGE{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
            RÉSISTANT
          </span>
        </h1>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
          Opération N.I.R.D.
        </p>
      </div>
    </div>
    <button
      onClick={onInfoClick}
      className="p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition border border-blue-500/30 text-blue-400 hover:text-blue-300"
    >
      <Info size={20} />
    </button>
  </header>
);

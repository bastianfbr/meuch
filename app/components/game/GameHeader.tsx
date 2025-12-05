import React from "react";
import { ShieldCheck, Info } from "lucide-react";

interface GameHeaderProps {
  onInfoClick: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ onInfoClick }) => (
  <header className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center invert saturate-0">
        <img src="/meuch.svg" alt="Meuch" className="w-full h-full" />
      </div>
      <div>
        <h1 className="text-2xl font-black text-white tracking-wide uppercase">
          Opération{" "}
          <span className="text-transparent uppercase bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
            N.I.R.D.
          </span>
        </h1>
        <p className="text-xs text-gray-300 font-bold  tracking-widest pl-0.5">
          Défends ton village, choisis un numérique responsable !
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

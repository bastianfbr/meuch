import React, { useState, useRef } from "react";
import { Info } from "lucide-react";

interface GameHeaderProps {}

export const GameHeader: React.FC<GameHeaderProps> = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNIRDClick = () => {
    window.open(
      "https://nird.forge.apps.education.fr/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  return (
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
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={handleNIRDClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition border border-blue-500/30 text-blue-400 hover:text-blue-300 cursor-pointer"
            aria-label="En savoir plus sur NIRD"
          >
            <Info size={20} />
          </button>
          {showTooltip && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute right-0 top-full mt-2 w-72 p-4 bg-slate-800 border border-blue-500/30 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <h3 className="font-bold text-blue-400 mb-2 text-sm">
                📚 Découvrir la démarche NIRD
              </h3>
              <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                Numérique Inclusif, Responsable et Durable : une approche pour
                libérer l&apos;école de la dépendance aux Big Tech.
              </p>
              <a
                href="https://nird.forge.apps.education.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 font-medium hover:text-blue-200 underline transition"
              >
                👉 Cliquez ici pour en savoir plus
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

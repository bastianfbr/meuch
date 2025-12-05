import React, { useState } from "react";
import { Users, Leaf, ShieldCheck, School, Info, X } from "lucide-react";
import { Card } from "../ui/Card";

interface GameInfoModalProps {
  onClose: () => void;
}

export const GameInfoModal: React.FC<GameInfoModalProps> = ({ onClose }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleNIRDClick = () => {
    window.open(
      "https://nird.forge.apps.education.fr/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-in fade-in">
      <Card className="max-w-2xl w-full border-orange-500/30 bg-slate-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
            La Démarche NIRD
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={handleNIRDClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition border border-blue-500/30 text-blue-400 hover:text-blue-300"
                aria-label="En savoir plus sur NIRD"
              >
                <Info size={20} />
              </button>
              {showTooltip && (
                <div className="absolute right-0 top-full mt-2 w-72 p-4 bg-slate-800 border border-blue-500/30 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <h3 className="font-bold text-blue-400 mb-2 text-sm">
                    📚 Découvrir la démarche NIRD
                  </h3>
                  <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                    Numérique Inclusif, Responsable et Durable : une approche
                    pour libérer l&apos;école de la dépendance aux Big Tech.
                  </p>
                  <div className="text-xs text-blue-300 font-medium">
                    👉 Cliquez pour en savoir plus
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition"
              aria-label="Fermer"
            >
              <X size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
        <p className="text-gray-300 mb-6">
          NIRD signifie{" "}
          <strong>Numérique Inclusif, Responsable et Durable</strong>.
          C&apos;est une démarche pour libérer l&apos;école de la dépendance aux
          Big Tech.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Users size={18} /> Inclusif
            </h3>
            <p className="text-sm text-gray-400">
              Ne laisser personne de côté, réduire la fracture numérique.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <Leaf size={18} /> Durable
            </h3>
            <p className="text-sm text-gray-400">
              Combattre l&apos;obsolescence programmée, favoriser le réemploi et
              Linux.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <h3 className="font-bold text-orange-400 mb-2 flex items-center gap-2">
              <ShieldCheck size={18} /> Responsable
            </h3>
            <p className="text-sm text-gray-400">
              Protéger les données souveraines, utiliser des logiciels libres.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <School size={18} /> Le Village
            </h3>
            <p className="text-sm text-gray-400">
              Une communauté qui résiste, partage et apprend ensemble.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-linear-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white"
        >
          Compris, on résiste ! ✊
        </button>
      </Card>
    </div>
  );
};

import React from "react";
import { Users, Leaf, ShieldCheck, School, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";

interface GameInfoModalProps {
  onClose: () => void;
}

export const GameInfoModal: React.FC<GameInfoModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-in fade-in">
    <Card className="max-w-2xl w-full border-orange-500/30 bg-slate-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
          La Démarche NIRD
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <AlertTriangle className="rotate-45" />
        </button>
      </div>
      <p className="text-gray-300 mb-6">
        NIRD signifie{" "}
        <strong>Numérique Inclusif, Responsable et Durable</strong>. C&apos;est
        une démarche pour libérer l&apos;école de la dépendance aux Big Tech.
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

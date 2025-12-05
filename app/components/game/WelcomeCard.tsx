import React from "react";
import {
  PlayCircle,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Recycle,
} from "lucide-react";
import { Card } from "../ui/Card";

interface WelcomeCardProps {
  onStart: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => (
  <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t-4 border-t-orange-500">
    <div className="text-center mb-6">
      <h2 className="text-3xl font-black text-white mb-2">
        Bienvenue dans l'Opération <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
          N.I.R.D.
        </span>
      </h2>
      <p className="text-gray-400 text-sm">
        Numérique Innovant, Responsable et Durable
      </p>
    </div>

    <div className="space-y-4 mb-8">
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/30">
          <Target size={20} className="text-orange-400" />
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Votre Mission</h3>
          <p className="text-sm text-gray-400">
            Prenez des décisions stratégiques pour protéger votre village des
            dérives numériques et construire un futur responsable.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/30">
          <Recycle size={20} className="text-green-400" />
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Gérez 3 Piliers RSE</h3>
          <p className="text-sm text-gray-400">
            Équilibrez la{" "}
            <span className="text-green-400 font-semibold">Société</span>, l'
            <span className="text-blue-400 font-semibold">
              Environnement
            </span>{" "}
            et l'<span className="text-purple-400 font-semibold">Économie</span>
            . Si l'un tombe à zéro, c'est la fin !
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
          <Globe size={20} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Observez la Planète</h3>
          <p className="text-sm text-gray-400">
            Regardez la planète évoluer en temps réel selon vos choix ! Elle
            reflète l'état de votre village.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-6">
      <p className="text-xs text-gray-400 text-center">
        💡 <span className="font-semibold text-orange-400">Conseil :</span>{" "}
        Chaque choix a des conséquences. Pensez à long terme et privilégiez les
        solutions durables pour réussir votre mission !
      </p>
    </div>

    <button
      onClick={onStart}
      className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-5 font-bold text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
      <div className="relative flex items-center justify-center gap-3">
        <PlayCircle size={24} />
        <span className="text-lg">Commencer la Mission</span>
      </div>
    </button>
  </Card>
);

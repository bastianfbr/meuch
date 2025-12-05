import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Retour au jeu
        </Link>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/20">
              <Scale size={32} className="text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-black text-white mb-2">
                Mentions Légales
              </h1>
              <p className="text-gray-400">
                Informations juridiques et propriété intellectuelle
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-slate-400">📝</span> Propriété
                intellectuelle
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                L'ensemble des ressources de ce projet, incluant le code source,
                les contenus textuels, les graphiques, les modèles 3D, les
                scénarios de jeu et tout autre élément constitutif de cette
                application, ont été développés à 100% par nos soins.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Tous les droits de propriété intellectuelle relatifs à ces
                ressources sont la propriété exclusive de leurs auteurs.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-slate-400">💻</span> Développement
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Ce projet a été entièrement conçu et développé en interne, sans
                utilisation de ressources tierces protégées par des droits
                d'auteur, à l'exception des bibliothèques open-source
                mentionnées dans les dépendances du projet.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-slate-400">🛠️</span> Technologies
                utilisées
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ce projet utilise des technologies et bibliothèques open-source
                sous licences appropriées, notamment :
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>React & Next.js</li>
                <li>Three.js pour la visualisation 3D</li>
                <li>Tailwind CSS pour le style</li>
                <li>TypeScript</li>
                <li>Lucide React pour les icônes</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                💡 À propos de ce projet
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Cette application pédagogique a été créée lors de la Nuit de
                l'Info édition 2025 dans le cadre de la démarche NIRD (Numérique
                Inclusif, Responsable et Durable) pour sensibiliser aux enjeux
                du numérique responsable et encourager une utilisation réfléchie
                des technologies.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : Décembre 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

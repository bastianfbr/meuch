import React from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export default function FemmesInformatique() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Retour au jeu
        </Link>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Users size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Femmes et Informatique
              </h1>
              <p className="text-gray-400">
                Découvrez les pionnières et actrices du numérique
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-pink-400">📹</span> Vidéo
                </h2>
                <video
                  controls
                  className="w-full rounded-lg shadow-lg"
                  poster="/poster_femmes_informatique.png"
                >
                  <source
                    src="/video_femmes_informatique.mov"
                    type="video/quicktime"
                  />
                  <source
                    src="/video_femmes_informatique.mov"
                    type="video/mp4"
                  />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <p className="text-sm text-gray-400 mt-4">
                  Découvrez l'histoire inspirante des femmes qui ont façonné
                  l'informatique moderne.
                </p>
              </div>

              <div className=" border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  💡 Pourquoi c'est important ?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Les femmes ont joué un rôle crucial dans le développement de
                  l'informatique, de la programmation des premiers ordinateurs
                  aux innovations actuelles. Il est essentiel de reconnaître
                  leurs contributions et d'encourager la diversité dans les
                  métiers du numérique pour construire un futur technologique
                  plus inclusif et responsable.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-pink-400">📄</span> Flyer Informatif
              </h2>
              <a
                href="/flyer_femmes_informatique.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="/flyer_femmes_informatique.png"
                  alt="Flyer Femmes en Informatique"
                  className="w-full rounded-lg shadow-lg hover:scale-101 transition-transform cursor-pointer border border-pink-500/30"
                />
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Cliquez sur l'image pour l'agrandir et en savoir plus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

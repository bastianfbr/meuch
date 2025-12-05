import React from "react";
import Link from "next/link";
import { Info, Scale, Users } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

interface GameHeaderProps {}

export const GameHeader: React.FC<GameHeaderProps> = () => {
  const handleNIRDClick = () => {
    window.open(
      "https://nird.forge.apps.education.fr/",
      "_blank",
      "noopener,noreferrer"
    );
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
        <Tooltip
          title="📋 Mentions Légales"
          content={
            <p>
              L'ensemble des ressources présentes sur cette application ont été
              créées à 100% par nos soins.
            </p>
          }
        >
          <button
            className="p-2 bg-slate-500/10 hover:bg-slate-500/20 rounded-full transition border border-slate-500/30 text-slate-400 hover:text-slate-300 cursor-pointer"
            aria-label="Mentions légales"
          >
            <Scale size={20} />
          </button>
        </Tooltip>

        <Tooltip
          title="📚 Découvrir la démarche NIRD"
          content={
            <>
              <p className="mb-3">
                Numérique Inclusif, Responsable et Durable : une approche pour
                libérer l&apos;école de la dépendance aux Big Tech.
              </p>
              <a
                href="https://nird.forge.apps.education.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 font-medium hover:text-blue-200 underline transition cursor-pointer"
              >
                👉 Cliquez ici pour en savoir plus
              </a>
            </>
          }
        >
          <button
            onClick={handleNIRDClick}
            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition border border-blue-500/30 text-blue-400 hover:text-blue-300 cursor-pointer"
            aria-label="En savoir plus sur NIRD"
          >
            <Info size={20} />
          </button>
        </Tooltip>

        <Link
          href="/femmes-informatique"
          className="p-2 bg-pink-500/10 hover:bg-pink-500/20 rounded-full transition border border-pink-500/30 text-pink-400 hover:text-pink-300 cursor-pointer inline-block"
          aria-label="Femmes en Informatique"
        >
          <Users size={20} />
        </Link>
      </div>
    </header>
  );
};

"use client";

import React, { useState, useCallback } from "react";
import {
  Users,
  Leaf,
  ShieldCheck,
  Wallet,
  Info,
  ArrowRight,
  RefreshCcw,
  Trophy,
  AlertTriangle,
  Zap,
  Server,
  School,
  TrendingUp,
  Activity,
} from "lucide-react";

// --- CONFIGURATION DU JEU (MODE NIRD) ---

// Les piliers NIRD tels que définis dans le sujet + Budget
const INITIAL_METRICS = {
  Inclusion: 50, // Pour tous, sans fracture numérique
  Durabilité: 50, // Matériel, écologie, anti-obsolescence
  Responsabilité: 50, // Souveraineté, données, éthique
  Budget: 1000, // Le nerf de la guerre
};

const MIN_SCORE = 15;
const MIN_BUDGET = -100;

// --- SCÉNARIOS : LE VILLAGE RÉSISTANT ---

const SCENARIOS = [
  {
    phase: "Défi 1 : L'Ultimatum de l'Empire 🖥️",
    context:
      "Le support de Windows 10 s'arrête. Tes 200 PC fonctionnent encore physiquement, mais Big Tech te dit : 'Ils sont obsolètes, achetez les nouveaux !'. Que fait le village ?",
    options: [
      {
        text: "Obéir à Goliath : On jette tout et on rachète du neuf.",
        impact: {
          Budget: -800,
          Durabilité: -40,
          Inclusion: 0,
          Responsabilité: -10,
        },
        feedback:
          "Désastre écologique ! Des machines fonctionnelles partent à la benne. Le budget explose.",
        userReaction: "💸 'C'est nos impôts qui paient ce gaspillage ?!'",
      },
      {
        text: "La Résistance Linux : On installe un OS libre et léger.",
        impact: {
          Budget: -100,
          Durabilité: 40,
          Inclusion: 10,
          Responsabilité: 30,
        },
        feedback:
          "Esprit NIRD ! Tu prolonges la vie du matériel et tu te libères des licences coûteuses.",
        userReaction: "🐧 'Les vieux PC sont devenus super rapides !'",
      },
      {
        text: "Ignorer l'alerte : On garde Windows sans mises à jour.",
        impact: {
          Budget: 0,
          Durabilité: 10,
          Inclusion: 0,
          Responsabilité: -50,
        },
        feedback:
          "Dangereux ! Tu exposes les données des élèves aux failles de sécurité.",
        userReaction: "😱 'On s'est fait hacker le réseau du lycée !'",
      },
    ],
  },
  {
    phase: "Défi 2 : La Souveraineté des Données ☁️",
    context:
      "Il faut stocker les notes et projets des élèves. Un géant américain propose une offre 'Gratuite' pour l'éducation.",
    options: [
      {
        text: "Accepter l'offre GAFAM (C'est gratuit et facile).",
        impact: {
          Budget: 50,
          Durabilité: -5,
          Inclusion: 10,
          Responsabilité: -40,
        },
        feedback:
          "Si c'est gratuit, c'est que l'élève est le produit. Tes données partent hors UE.",
        userReaction:
          "🕵️ 'Pourquoi je reçois des pubs ciblées après les cours ?'",
      },
      {
        text: "Utiliser 'La Forge' des communs numériques.",
        impact: {
          Budget: -50,
          Durabilité: 10,
          Inclusion: 20,
          Responsabilité: 40,
        },
        feedback:
          "Bravo ! Tu utilises des outils souverains, hébergés en France et open source.",
        userReaction:
          "🛡️ 'Nos travaux sont en sécurité et nous appartiennent.'",
      },
      {
        text: "Monter son propre serveur dans le placard du CDI.",
        impact: {
          Budget: -150,
          Durabilité: 5,
          Inclusion: -10,
          Responsabilité: 20,
        },
        feedback:
          "Bonne intention, mais difficile à maintenir si le prof de techno est malade.",
        userReaction: "📉 'Le serveur a encore planté...'",
      },
    ],
  },
  {
    phase: "Défi 3 : L'Inclusion Numérique 🤝",
    context:
      "Certains élèves n'ont pas d'ordinateur à la maison pour accéder aux ressources du village.",
    options: [
      {
        text: "Leur dire d'aller au cybercafé.",
        impact: {
          Budget: 0,
          Durabilité: 0,
          Inclusion: -40,
          Responsabilité: -10,
        },
        feedback:
          "Exclusion totale. L'école doit compenser les inégalités, pas les ignorer.",
        userReaction: "😢 'Je ne peux pas faire mes devoirs...'",
      },
      {
        text: "Créer un 'Club NIRD' de réemploi solidaire.",
        impact: {
          Budget: -20,
          Durabilité: 30,
          Inclusion: 40,
          Responsabilité: 20,
        },
        feedback:
          "Masterclass ! Les élèves réparent de vieux PC pour les donner aux camarades.",
        userReaction: "🔧 'J'ai appris à réparer un PC et j'ai aidé un ami !'",
      },
      {
        text: "Acheter des tablettes low-cost jetables.",
        impact: {
          Budget: -200,
          Durabilité: -20,
          Inclusion: 20,
          Responsabilité: -10,
        },
        feedback:
          "Solution court-termiste. Matériel fragile et difficilement réparable.",
        userReaction: "🚮 'L'écran est déjà cassé...'",
      },
    ],
  },
  {
    phase: "Défi 4 : La Culture du Libre 📚",
    context:
      "Les enseignants ont besoin de ressources pédagogiques. L'éditeur 'BigBook' propose un abonnement très cher.",
    options: [
      {
        text: "Payer la licence BigBook (Verrouillé par DRM).",
        impact: {
          Budget: -300,
          Durabilité: 0,
          Inclusion: -5,
          Responsabilité: -20,
        },
        feedback: "Tu enfermes tes profs dans un écosystème fermé et coûteux.",
        userReaction:
          "🔒 'Je ne peux pas partager ce cours avec mes collègues.'",
      },
      {
        text: "Contribuer aux Ressources Éducatives Libres (REL).",
        impact: {
          Budget: -50,
          Durabilité: 10,
          Inclusion: 25,
          Responsabilité: 35,
        },
        feedback:
          "L'esprit du partage ! Tu crées un bien commun accessible à tous.",
        userReaction:
          "🌍 'Des profs de toute la France améliorent mon cours !'",
      },
      {
        text: "Photocopier illégalement les manuels.",
        impact: {
          Budget: -20,
          Durabilité: -10,
          Inclusion: 0,
          Responsabilité: -30,
        },
        feedback:
          "Illégal et pas durable (papier). Pas un bon exemple pour les élèves.",
        userReaction: "⚖️ 'C'est pas du vol ça ?'",
      },
    ],
  },
  {
    phase: "Défi 5 : L'Avenir du Village 🌟",
    context:
      "Le projet arrive à terme. Comment pérenniser cette résistance numérique ?",
    options: [
      {
        text: "Tout déléguer à une entreprise externe.",
        impact: {
          Budget: -200,
          Durabilité: -5,
          Inclusion: -10,
          Responsabilité: -10,
        },
        feedback:
          "Tu perds la compétence interne. Si le contrat s'arrête, le savoir disparaît.",
        userReaction: "🤷 'On ne sait plus comment ça marche.'",
      },
      {
        text: "Former des éco-délégués et 'Ambassadeurs NIRD'.",
        impact: {
          Budget: -50,
          Durabilité: 20,
          Inclusion: 30,
          Responsabilité: 30,
        },
        feedback:
          "Transmission ! Les élèves d'aujourd'hui sont les citoyens numériques de demain.",
        userReaction: "🎓 'Je sais maintenant défendre mes droits numériques.'",
      },
      {
        text: "Ne rien faire, ça tiendra bien tout seul.",
        impact: {
          Budget: 0,
          Durabilité: -20,
          Inclusion: -10,
          Responsabilité: -20,
        },
        feedback:
          "L'entropie gagne toujours. Sans animation, le projet s'essouffle.",
        userReaction: "💤 'C'était bien au début, mais maintenant...'",
      },
    ],
  },
];

// Événements aléatoires "La Vie du Lycée"
const RANDOM_EVENTS = [
  {
    title: "Fin de support logiciel",
    description: "Une application critique ne tourne plus sur vos vieux OS.",
    condition: (metrics) => metrics.Durabilité > 60,
    impact: { Budget: -50, Durabilité: -10 },
    type: "bad",
  },
  {
    title: "Don de matériel d'une Mairie",
    description: "La ville vous offre 30 tours PC à reconditionner !",
    condition: (metrics) => metrics.Responsabilité > 50,
    impact: { Budget: 50, Durabilité: 25, Inclusion: 15 },
    type: "good",
  },
  {
    title: "Inspection Académique",
    description:
      "L'inspecteur est impressionné par votre souveraineté numérique.",
    condition: (metrics) => metrics.Responsabilité > 70,
    impact: { Budget: 100, Responsabilité: 10 },
    type: "good",
  },
  {
    title: "Panne Réseau",
    description:
      "Le bricolage a ses limites... Le réseau saute pendant un examen.",
    condition: (metrics) => metrics.Budget < 200,
    impact: { Inclusion: -15, Responsabilité: -5 },
    type: "bad",
  },
];

// --- COMPOSANTS UI ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl ${className}`}
  >
    {children}
  </div>
);

const MetricCard = ({ label, value, icon: Icon, color }) => {
  const colorClasses = {
    red: {
      text: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      bar: "bg-red-500",
    },
    green: {
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      bar: "bg-emerald-500",
    },
    orange: {
      text: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      bar: "bg-orange-500",
    },
    blue: {
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      bar: "bg-blue-500",
    },
  };
  const style = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} p-4 transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start mb-2">
        <Icon className={`${style.text}`} size={24} />
        <span className={`text-xl font-black ${style.text}`}>{value}%</span>
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${style.bar} transition-all duration-700 ease-out`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
};

const FeedbackToast = ({ userReaction, feedback }) => (
  <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
    <div className="mb-4 bg-slate-800/50 border-l-4 border-orange-500 p-4 rounded-r-xl">
      <h4 className="flex items-center gap-2 font-bold text-orange-200 mb-1">
        <Activity size={16} /> Impact NIRD
      </h4>
      <p className="text-sm text-gray-300 italic">{feedback}</p>
    </div>
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4">
      <div className="bg-gradient-to-br from-orange-500 to-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
        <Users size={20} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase">
          La Voix du Village
        </p>
        <p className="font-medium text-white">"{userReaction}"</p>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [currentStep, setCurrentStep] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [randomEvent, setRandomEvent] = useState(null);
  const [lastImpact, setLastImpact] = useState(null);
  const [lastSelection, setLastSelection] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const checkGameStatus = useCallback((newMetrics, step) => {
    if (newMetrics.Budget < MIN_BUDGET) {
      return {
        status: "gameover",
        type: "bankruptcy",
        message:
          "Faillite ! L'établissement est sous tutelle. Big Tech a gagné.",
      };
    }
    if (
      newMetrics.Inclusion < MIN_SCORE ||
      newMetrics.Durabilité < MIN_SCORE ||
      newMetrics.Responsabilité < MIN_SCORE
    ) {
      return {
        status: "gameover",
        type: "scandal",
        message: "Échec critique ! Le village a perdu ses valeurs NIRD.",
      };
    }
    if (step >= SCENARIOS.length) {
      const avg =
        (newMetrics.Inclusion +
          newMetrics.Durabilité +
          newMetrics.Responsabilité) /
        3;
      if (avg >= 75)
        return {
          status: "win",
          type: "master",
          message:
            "Victoire ! Votre village est un modèle de résistance numérique !",
        };
      return {
        status: "win",
        type: "average",
        message:
          "Le village survit, mais la dépendance aux Big Tech reste présente.",
      };
    }
    return { status: "playing" };
  }, []);

  const handleChoice = (option) => {
    let newMetrics = { ...metrics };
    const impact = option.impact;

    Object.keys(impact).forEach((key) => {
      if (key === "Budget") newMetrics[key] += impact[key];
      else
        newMetrics[key] = Math.max(
          0,
          Math.min(100, newMetrics[key] + impact[key])
        );
    });

    setLastImpact(impact);
    setLastSelection({
      feedback: option.feedback,
      reaction: option.userReaction,
    });

    let statusCheck = checkGameStatus(newMetrics, currentStep);

    if (statusCheck.status !== "playing") {
      setMetrics(newMetrics);
      setGameState(statusCheck.status);
      setLastSelection((prev) => ({
        ...prev,
        endTitle: statusCheck.type === "win" ? "Mission Terminée" : "Game Over",
        endMsg: statusCheck.message,
      }));
      return;
    }

    let event = null;
    if (Math.random() < 0.3) {
      const possibleEvents = RANDOM_EVENTS.filter((e) =>
        e.condition(newMetrics)
      );
      if (possibleEvents.length > 0) {
        event =
          possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
        Object.keys(event.impact).forEach((key) => {
          if (key === "Budget") newMetrics[key] += event.impact[key];
          else
            newMetrics[key] = Math.max(
              0,
              Math.min(100, newMetrics[key] + event.impact[key])
            );
        });
        setRandomEvent(event);

        statusCheck = checkGameStatus(newMetrics, currentStep);
        if (statusCheck.status !== "playing") {
          setGameState(statusCheck.status);
          setLastSelection((prev) => ({
            ...prev,
            endTitle:
              statusCheck.type === "win" ? "Mission Terminée" : "Game Over",
            endMsg: statusCheck.message,
          }));
        }
      }
    }

    setMetrics(newMetrics);
    setGameState("paused");
  };

  const nextPhase = () => {
    setRandomEvent(null);
    setLastImpact(null);
    setLastSelection(null);
    setCurrentStep((p) => p + 1);
    setGameState("playing");
  };

  const resetGame = () => {
    setMetrics(INITIAL_METRICS);
    setCurrentStep(0);
    setGameState("playing");
    setRandomEvent(null);
    setLastImpact(null);
    setLastSelection(null);
  };

  // --- RENDERERS ---

  if (showInfo)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-in fade-in">
        <Card className="max-w-2xl w-full border-orange-500/30 bg-slate-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              La Démarche NIRD
            </h2>
            <button
              onClick={() => setShowInfo(false)}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <AlertTriangle className="rotate-45" />
            </button>
          </div>
          <p className="text-gray-300 mb-6">
            NIRD signifie{" "}
            <strong>Numérique Inclusif, Responsable et Durable</strong>. C'est
            une démarche pour libérer l'école de la dépendance aux Big Tech.
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
                Combattre l'obsolescence programmée, favoriser le réemploi et
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
            onClick={() => setShowInfo(false)}
            className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white"
          >
            Compris, on résiste ! ✊
          </button>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] opacity-60"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                VILLAGE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  RÉSISTANT
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Opération N.I.R.D.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition border border-white/10 text-orange-400"
          >
            <Info size={20} />
          </button>
        </header>

        {/* Dashboard Métriques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <MetricCard
            label="Inclusion"
            value={metrics.Inclusion}
            icon={Users}
            color="blue"
          />
          <MetricCard
            label="Durabilité"
            value={metrics.Durabilité}
            icon={Leaf}
            color="green"
          />
          <MetricCard
            label="Responsabilité"
            value={metrics.Responsabilité}
            icon={ShieldCheck}
            color="orange"
          />

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Wallet size={60} />
            </div>
            <span
              className={`text-2xl font-black ${
                metrics.Budget < 0 ? "text-red-500" : "text-gray-200"
              }`}
            >
              {metrics.Budget}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase">
              Budget (€)
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative min-h-[400px]">
          {gameState === "playing" ? (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t-4 border-t-orange-500">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-orange-400 border border-slate-700 flex items-center gap-2">
                  <Server size={14} /> {SCENARIOS[currentStep].phase}
                </span>
                <span className="text-xs font-mono text-gray-600">
                  MISSION {currentStep + 1}/{SCENARIOS.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                {SCENARIOS[currentStep].context}
              </h2>

              <div className="space-y-3 mt-8">
                {SCENARIOS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt)}
                    className="w-full group text-left p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-gray-400 flex items-center justify-center font-bold text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="flex-1 font-medium text-gray-200 group-hover:text-white">
                        {opt.text}
                      </span>
                      <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="border-orange-500/30 text-center py-10">
              {gameState === "gameover" || gameState === "win" ? (
                <div className="animate-in zoom-in duration-300">
                  <div
                    className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl ${
                      gameState === "win"
                        ? "bg-gradient-to-br from-orange-400 to-red-600"
                        : "bg-slate-800"
                    }`}
                  >
                    <Trophy size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2">
                    {lastSelection?.endTitle}
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                    {lastSelection?.endMsg}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8 text-center max-w-sm mx-auto">
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-blue-400">
                        {metrics.Inclusion}%
                      </div>
                      <div className="text-[10px] uppercase text-gray-500">
                        Inclusion
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">
                        {metrics.Durabilité}%
                      </div>
                      <div className="text-[10px] uppercase text-gray-500">
                        Durabilité
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-orange-400">
                        {metrics.Responsabilité}%
                      </div>
                      <div className="text-[10px] uppercase text-gray-500">
                        Responsabilité
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition flex items-center gap-2 mx-auto"
                  >
                    <RefreshCcw size={20} /> Recommencer la résistance
                  </button>
                </div>
              ) : (
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="text-orange-500" /> Impact sur le
                    Village
                  </h3>

                  <FeedbackToast
                    feedback={lastSelection?.feedback}
                    userReaction={lastSelection?.reaction}
                  />

                  <div className="grid grid-cols-2 gap-3 my-6">
                    {lastImpact &&
                      Object.entries(lastImpact).map(([k, v]) => (
                        <div
                          key={k}
                          className={`flex justify-between items-center p-3 rounded-lg border ${
                            v > 0
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : v < 0
                              ? "bg-red-500/10 border-red-500/20 text-red-400"
                              : "bg-slate-800 border-slate-700 text-gray-500"
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">
                            {k}
                          </span>
                          <span className="font-bold font-mono">
                            {v > 0 ? "+" : ""}
                            {v}
                          </span>
                        </div>
                      ))}
                  </div>

                  {randomEvent && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-start gap-4 animate-pulse">
                      <Zap className="text-purple-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-purple-200 text-sm mb-1">
                          {randomEvent.title}
                        </h4>
                        <p className="text-xs text-purple-200/70">
                          {randomEvent.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={nextPhase}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-bold text-white shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    Mission Suivante <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

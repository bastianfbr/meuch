import type { Metrics, Scenario, RandomEvent } from "../types/game";

export const INITIAL_METRICS: Metrics = {
  Société: 50,
  Environnement: 50,
  Economie: 50,
};

export const MIN_SCORE = 15;

export const SCENARIOS: Scenario[] = [
  {
    phase: "Défi 1 : L'Ultimatum de l'Empire 🖥️",
    context:
      "Le support de Windows 10 s'arrête. Tes 200 PC fonctionnent encore physiquement, mais Big Tech te dit : 'Ils sont obsolètes, achetez les nouveaux !'. Que fait le village ?",
    options: [
      {
        text: "Obéir à Goliath : On jette tout et on rachète du neuf.",
        impact: {
          Environnement: -40,
          Société: 0,
          Economie: -10,
        },
        feedback:
          "Désastre écologique ! Des machines fonctionnelles partent à la benne. Le budget explose.",
        userReaction: "💸 'C'est nos impôts qui paient ce gaspillage ?!'",
      },
      {
        text: "La Résistance Linux : On installe un OS libre et léger.",
        impact: {
          Environnement: 40,
          Société: 10,
          Economie: 30,
        },
        feedback:
          "Esprit NIRD ! Tu prolonges la vie du matériel et tu te libères des licences coûteuses.",
        userReaction: "🐧 'Les vieux PC sont devenus super rapides !'",
      },
      {
        text: "Ignorer l'alerte : On garde Windows sans mises à jour.",
        impact: {
          Environnement: 10,
          Société: 0,
          Economie: -50,
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
          Environnement: -5,
          Société: 10,
          Economie: -40,
        },
        feedback:
          "Si c'est gratuit, c'est que l'élève est le produit. Tes données partent hors UE.",
        userReaction:
          "🕵️ 'Pourquoi je reçois des pubs ciblées après les cours ?'",
      },
      {
        text: "Utiliser 'La Forge' des communs numériques.",
        impact: {
          Environnement: 10,
          Société: 20,
          Economie: 40,
        },
        feedback:
          "Bravo ! Tu utilises des outils souverains, hébergés en France et open source.",
        userReaction:
          "🛡️ 'Nos travaux sont en sécurité et nous appartiennent.'",
      },
      {
        text: "Monter son propre serveur dans le placard du CDI.",
        impact: {
          Environnement: 5,
          Société: -10,
          Economie: 20,
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
          Environnement: 0,
          Société: -40,
          Economie: -10,
        },
        feedback:
          "Exclusion totale. L'école doit compenser les inégalités, pas les ignorer.",
        userReaction: "😢 'Je ne peux pas faire mes devoirs...'",
      },
      {
        text: "Créer un 'Club NIRD' de réemploi solidaire.",
        impact: {
          Environnement: 30,
          Société: 40,
          Economie: 20,
        },
        feedback:
          "Masterclass ! Les élèves réparent de vieux PC pour les donner aux camarades.",
        userReaction: "🔧 'J'ai appris à réparer un PC et j'ai aidé un ami !'",
      },
      {
        text: "Acheter des tablettes low-cost jetables.",
        impact: {
          Environnement: -20,
          Société: 20,
          Economie: -10,
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
          Environnement: 0,
          Société: -5,
          Economie: -20,
        },
        feedback: "Tu enfermes tes profs dans un écosystème fermé et coûteux.",
        userReaction:
          "🔒 'Je ne peux pas partager ce cours avec mes collègues.'",
      },
      {
        text: "Contribuer aux Ressources Éducatives Libres (REL).",
        impact: {
          Environnement: 10,
          Société: 25,
          Economie: 35,
        },
        feedback:
          "L'esprit du partage ! Tu crées un bien commun accessible à tous.",
        userReaction:
          "🌍 'Des profs de toute la France améliorent mon cours !'",
      },
      {
        text: "Photocopier illégalement les manuels.",
        impact: {
          Environnement: -10,
          Société: 0,
          Economie: -30,
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
          Environnement: -5,
          Société: -10,
          Economie: -10,
        },
        feedback:
          "Tu perds la compétence interne. Si le contrat s'arrête, le savoir disparaît.",
        userReaction: "🤷 'On ne sait plus comment ça marche.'",
      },
      {
        text: "Former des éco-délégués et 'Ambassadeurs NIRD'.",
        impact: {
          Environnement: 20,
          Société: 30,
          Economie: 30,
        },
        feedback:
          "Transmission ! Les élèves d'aujourd'hui sont les citoyens numériques de demain.",
        userReaction: "🎓 'Je sais maintenant défendre mes droits numériques.'",
      },
      {
        text: "Ne rien faire, ça tiendra bien tout seul.",
        impact: {
          Environnement: -20,
          Société: -10,
          Economie: -20,
        },
        feedback:
          "L'entropie gagne toujours. Sans animation, le projet s'essouffle.",
        userReaction: "💤 'C'était bien au début, mais maintenant...'",
      },
    ],
  },
];

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    title: "Fin de support logiciel",
    description: "Une application critique ne tourne plus sur vos vieux OS.",
    condition: (metrics: Metrics) => metrics.Environnement > 60,
    impact: { Environnement: -10 },
    type: "bad",
  },
  {
    title: "Don de matériel d'une Mairie",
    description: "La ville vous offre 30 tours PC à reconditionner !",
    condition: (metrics: Metrics) => metrics.Economie > 50,
    impact: { Environnement: 25, Société: 15 },
    type: "good",
  },
  {
    title: "Inspection Académique",
    description:
      "L'inspecteur est impressionné par votre souveraineté numérique.",
    condition: (metrics: Metrics) => metrics.Economie > 70,
    impact: { Economie: 10 },
    type: "good",
  },
  {
    title: "Panne Réseau",
    description:
      "Le bricolage a ses limites... Le réseau saute pendant un examen.",
    condition: (metrics: Metrics) => metrics.Economie < 30,
    impact: { Société: -15, Economie: -5 },
    type: "bad",
  },
];

import type { Metrics, Scenario, RandomEvent } from "../types/game";

export const INITIAL_METRICS: Metrics = {
  Inclusion: 50,
  Durabilité: 50,
  Responsabilité: 50,
  Budget: 1000,
};

export const MIN_SCORE = 15;
export const MIN_BUDGET = -100;

export const SCENARIOS: Scenario[] = [
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

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    title: "Fin de support logiciel",
    description: "Une application critique ne tourne plus sur vos vieux OS.",
    condition: (metrics: Metrics) => metrics.Durabilité > 60,
    impact: { Budget: -50, Durabilité: -10 },
    type: "bad",
  },
  {
    title: "Don de matériel d'une Mairie",
    description: "La ville vous offre 30 tours PC à reconditionner !",
    condition: (metrics: Metrics) => metrics.Responsabilité > 50,
    impact: { Budget: 50, Durabilité: 25, Inclusion: 15 },
    type: "good",
  },
  {
    title: "Inspection Académique",
    description:
      "L'inspecteur est impressionné par votre souveraineté numérique.",
    condition: (metrics: Metrics) => metrics.Responsabilité > 70,
    impact: { Budget: 100, Responsabilité: 10 },
    type: "good",
  },
  {
    title: "Panne Réseau",
    description:
      "Le bricolage a ses limites... Le réseau saute pendant un examen.",
    condition: (metrics: Metrics) => metrics.Budget < 200,
    impact: { Inclusion: -15, Responsabilité: -5 },
    type: "bad",
  },
];

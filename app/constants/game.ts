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
    phase: "Défi 5 : La Sobriété Numérique 📉",
    context:
      "Le serveur de l'école surchauffe. Il faut réduire l'empreinte numérique des données stockées.",
    options: [
      {
        text: "Tout garder 'au cas où' (Stockage illimité).",
        impact: {
          Environnement: -20,
          Société: 0,
          Economie: -10,
        },
        feedback:
          "Mauvaise idée. Le stockage inutile consomme de l'énergie et coûte cher.",
        userReaction: "💾 'Mon disque dur est plein, on en rachète un ?'",
      },
      {
        text: "Organiser un 'Cyber-CleanUp Day' avec les élèves.",
        impact: {
          Environnement: 20,
          Société: 20,
          Economie: 0,
        },
        feedback:
          "Excellent ! On nettoie les données inutiles et on sensibilise à l'impact du numérique.",
        userReaction: "🧹 'J'ai supprimé 10Go de vieux fichiers !'",
      },
      {
        text: "Acheter un deuxième serveur plus puissant.",
        impact: {
          Environnement: -30,
          Société: 0,
          Economie: -40,
        },
        feedback:
          "La fuite en avant technologique. Plus de matériel = plus d'impact carbone.",
        userReaction: "🔌 'La facture d'électricité va encore augmenter...'",
      },
    ],
  },
  {
    phase: "Défi 6 : L'Accessibilité Web 👁️",
    context:
      "Le site du village n'est pas accessible aux malvoyants. La loi impose une mise en conformité.",
    options: [
      {
        text: "Refaire le site en respectant le RGAA.",
        impact: {
          Environnement: 0,
          Société: 40,
          Economie: -10,
        },
        feedback:
          "Inclusif ! Tout le monde doit pouvoir accéder à l'information publique.",
        userReaction: "👓 'Enfin je peux lire le menu de la cantine !'",
      },
      {
        text: "Installer un widget 'Accessibilité' (Surcouche).",
        impact: {
          Environnement: 0,
          Société: -10,
          Economie: -10,
        },
        feedback:
          "Inefficace et souvent contre-productif. C'est du 'handi-washing'.",
        userReaction: "🚫 'Ça ne marche pas avec mon lecteur d'écran...'",
      },
      {
        text: "Ignorer, personne ne se plaindra.",
        impact: {
          Environnement: 0,
          Société: -30,
          Economie: 0,
        },
        feedback:
          "Illégal et discriminant. Vous excluez une partie de la population.",
        userReaction: "😠 'C'est honteux de ne pas penser à nous.'",
      },
    ],
  },
  {
    phase: "Défi 7 : Les Smartphones en Classe 📱",
    context:
      "Débat sur l'équipement : BYOD (Apportez votre appareil) ou équipement fourni par l'école ?",
    options: [
      {
        text: "BYOD : Chacun utilise son smartphone.",
        impact: {
          Environnement: -10,
          Société: -20,
          Economie: 10,
        },
        feedback:
          "Crée des inégalités (iPhone vs vieux Android) et pousse au renouvellement.",
        userReaction: "📱 'J'ai honte de mon vieux téléphone...'",
      },
      {
        text: "Équipement partagé : Classes mobiles reconditionnées.",
        impact: {
          Environnement: 30,
          Société: 30,
          Economie: -20,
        },
        feedback:
          "La meilleure solution ! Matériel durable, égalitaire et géré par l'école.",
        userReaction: "💻 'On a tous le même outil pour travailler.'",
      },
      {
        text: "1 tablette neuve par élève (One-to-One).",
        impact: {
          Environnement: -50,
          Société: 10,
          Economie: -50,
        },
        feedback:
          "Catastrophe écologique et financière. Matériel fragile et vite obsolète.",
        userReaction: "💥 'Oups, j'ai marché sur ma tablette...'",
      },
    ],
  },
  {
    phase: "Défi 8 : L'Intelligence Artificielle 🤖",
    context:
      "Les élèves utilisent ChatGPT pour faire leurs devoirs. Les profs sont perdus.",
    options: [
      {
        text: "Interdire et punir l'utilisation d'IA.",
        impact: {
          Environnement: 0,
          Société: -20,
          Economie: 0,
        },
        feedback:
          "L'interdiction ne marche pas. Il vaut mieux éduquer que punir.",
        userReaction: "🤫 'Je l'utilise en cachette de toute façon.'",
      },
      {
        text: "Ateliers 'Comprendre et critiquer l'IA'.",
        impact: {
          Environnement: 10,
          Société: 30,
          Economie: 0,
        },
        feedback:
          "Bravo ! Former l'esprit critique est essentiel face aux nouveaux outils.",
        userReaction: "🧠 'L'IA raconte parfois n'importe quoi !'",
      },
      {
        text: "Acheter une solution 'Détecteur d'IA'.",
        impact: {
          Environnement: 0,
          Société: -10,
          Economie: -30,
        },
        feedback:
          "Argent jeté par les fenêtres. Ces outils ne sont pas fiables.",
        userReaction: "🤖 'Le prof m'a accusé à tort !'",
      },
    ],
  },
  {
    phase: "Défi 9 : La Vidéoprotection 🎥",
    context:
      "Des vols de souris ont eu lieu. On propose d'installer des caméras connectées partout.",
    options: [
      {
        text: "Installer la reconnaissance faciale à l'entrée.",
        impact: {
          Environnement: -10,
          Société: -40,
          Economie: -40,
        },
        feedback:
          "Surveillance de masse illégale et disproportionnée. Libertés en danger.",
        userReaction: "👁️ 'Big Brother is watching you...'",
      },
      {
        text: "Mettre des caméras simples aux endroits stratégiques.",
        impact: {
          Environnement: 0,
          Société: -10,
          Economie: -20,
        },
        feedback:
          "Solution classique mais coûteuse. Est-ce vraiment efficace ?",
        userReaction: "📹 'On se sent surveillés en permanence.'",
      },
      {
        text: "Miser sur la confiance et la responsabilisation.",
        impact: {
          Environnement: 0,
          Société: 30,
          Economie: 0,
        },
        feedback:
          "Le pari de l'éducation. Plus durable que la répression.",
        userReaction: "🤝 'On fait attention au matériel commun.'",
      },
    ],
  },
  {
    phase: "Défi 10 : L'Avenir du Village 🌟",
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

# 🌍 MEUCH - Opération N.I.R.D. (Numérique Innovant, Responsable et Durable)

Un **Serious Game** immersif et pédagogique qui défie les conventions d'interface pour sensibiliser aux enjeux du numérique responsable.

---

## 🎯 Contexte & Objectifs

Ce projet s’inscrit dans la démarche **NIRD (Numérique Inclusif, Responsable et Durable)** pour les établissements scolaires.

L’objectif est de sensibiliser **élèves, enseignants, familles et collectivités** aux choix qui permettent de réduire les dépendances numériques et l'empreinte environnementale, via une expérience interactive engageante.

---

## 🧩 Le Concept

**MEUCH - Opération N.I.R.D.** est un jeu de stratégie narratif où vous incarnez le décideur numérique d'un village.  
Votre mission : équilibrer les **trois piliers RSE** à travers des choix cruciaux (gestion du parc informatique, stockage des données, inclusion...) :

- 🌳 **Environnement**
- 🏘 **Société (Social)**
- 🏭 **Économie**

L'objectif n'est pas seulement de gagner, mais de **voir et ressentir** concrètement l'impact de vos décisions sur un monde en évolution constante.

---

## 🧠 Le Parti Pris Ergonomique : *"L'Impact Tangible"*

Dans le cadre du défi **“Repenser l'ergonomie sans conventions”**, nous avons choisi de briser le standard du QCM classique pour proposer une expérience organique.

### 1. 🌱 Des territoires vivants (Interface Diégétique)

Les trois piliers RSE ne sont **pas** affichés sous forme de barres ou de chiffres abstraits.  
Chaque pilier est représenté par **un écosystème dynamique** sur la planète 3D :

- **Environnement** : Une forêt qui pousse ou dépérit.  
- **Société** : Un village avec des habitants plus ou moins nombreux.  
- **Économie** : Des infrastructures qui se développent ou tombent en ruine.

**Problème résolu :** les scores abstraits sont difficiles à interpréter émotionnellement.  
**Amélioration :** impact visuel immédiat → immersion & mémorisation accrue.

---

### 2. 🖱️ Interaction Drag & Drop (Le poids du choix)

Les choix ne se font pas via de simples clics, mais via un **glisser-déposer** d’éléments vers la planète.

Cela simule une **manipulation tangible**.

**Problème résolu :** le clic est une action passive, binaire, déconnectée.  
**Amélioration :** la friction volontaire renforce la réflexion → apprentissage actif.

---

### 3. 🔮 Feedback en temps réel (Anticipation)

Lorsqu’un élément est **survolé** ou **déplacé**, l'interface réagit **avant validation**.

**Problème résolu :** effets visibles trop tard → frustration.  
**Amélioration :** prévisualisation → décisions plus stratégiques & pédagogiques.

---

## 💡 Priorités & Compromis

**Priorités :**  
- Immersion  
- Pédagogie  
- Engagement émotionnel  

**Compromis :**  
La simplicité visuelle a été privilégiée pour maintenir lisibilité + fluidité.

**Inspirations :**  
- *Black & White* (interfaces divines)  
- Simulations écologiques vivantes  

---

## ⚡ Résultat Attendu

- Une interface **fluide, surprenante mais crédible**  
- Des utilisateurs capables de **comprendre, anticiper et ressentir** l’impact de leurs décisions  
- Une expérience mêlant **jeu**, **pédagogie** et **responsabilité numérique**

---

## 🛠️ Stack Technique

- **Framework :** Next.js 15 (App Router)  
- **Langage :** TypeScript  
- **3D / WebGL :** Three.js via React Three Fiber  
- **Style :** Tailwind CSS v4  
- **Icônes :** Lucide React  

---

## 🚀 Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/bastianfbr/meuch.git
cd meuch
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```

Ensuite, ouvrez votre navigateur à l’adresse :
👉 http://localhost:3000

## 📱 Responsive Design

L’interface a été pensée **Mobile First**, tout en offrant une expérience riche sur Desktop :

- **Desktop :** planète 3D à gauche, scénario à droite  
- **Mobile :** disposition verticale fluide, planète toujours visible & interactive

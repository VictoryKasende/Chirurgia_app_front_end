# ChirurgIA Frontend

<div align="center">
  <h3>Interface Web Professionnelle pour l'API de Prédiction de Mortalité Chirurgicale</h3>
  
  ![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
</div>

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Structure du Projet](#structure-du-projet)
- [Composants](#composants)
- [Types de Données](#types-de-données)
- [Développement](#développement)
- [Build et Déploiement](#build-et-déploiement)

## 🏥 Vue d'ensemble

ChirurgIA Frontend est une application React TypeScript moderne conçue pour interfacer avec l'API ChirurgIA de prédiction de mortalité en chirurgie. L'application offre une interface utilisateur intuitive et professionnelle pour les professionnels de santé, permettant d'analyser les risques chirurgicaux à partir de biomarqueurs et de données cliniques.

### Objectifs

- **Prédiction de Mortalité** : Analyse des risques de mortalité post-opératoire
- **Analyse Complète** : Évaluation globale incluant causes de décès et recommandations
- **Clustering des Survivants** : Analyse des profils de patients survivants
- **Interface Intuitive** : Design médical professionnel et responsive

## ✨ Fonctionnalités

### 🎯 Modules Principaux

- **Dashboard** : Vue d'ensemble avec navigation rapide
- **Prédiction de Mortalité** : Analyse de risque simple et détaillée
- **Analyse Complète** : Évaluation holistique avec visualisations
- **Clustering Analysis** : Analyse des profils de survivants
- **Formulaires Intelligents** : Pré-remplissage avec données de test

### 🎨 Interface Utilisateur

- **Design Responsive** : Compatible desktop, tablet, mobile
- **Thème Médical** : Palette de couleurs professionnelle (bleus, verts)
- **Typographie Moderne** : Police Inter pour une lisibilité optimale
- **Icônes Professionnelles** : Lucide React icons
- **Graphiques Interactifs** : Recharts pour visualisations de données

### 🔧 Fonctionnalités Techniques

- **Validation Robuste** : TypeScript strict avec validation des entrées
- **Gestion d'Erreurs** : Messages informatifs et récupération gracieuse
- **Performance Optimisée** : Lazy loading et memoization
- **API Integration** : Axios avec gestion des réponses multilingues

### Analyses Disponibles
- **Prédiction de Mortalité Complète** : Analyse avec biomarqueurs + données textuelles
- **Prédiction de Mortalité Simple** : Analyse rapide avec biomarqueurs uniquement  
- **Clustering des Survivants** : Classification pour optimiser la surveillance
- **Analyse Complète Intégrée** : Toutes les analyses combinées

## 🚀 Technologies

### Core Stack
- **React 18** - Framework UI avec hooks
- **TypeScript** - Typage statique strict
- **Vite** - Build tool moderne et rapide
- **Tailwind CSS** - Framework CSS utility-first

### Bibliothèques
- **Axios** - Client HTTP pour API calls
- **Lucide React** - Icônes SVG modernes
- **Recharts** - Graphiques et visualisations
- **React Hooks** - Gestion d'état moderne

### Outils de Développement
- **ESLint** - Linting et qualité de code
- **PostCSS** - Processing CSS
- **TypeScript Compiler** - Vérification de types

## � Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- API ChirurgIA en cours d'exécution sur `http://localhost:8000`

### Étapes d'Installation

```bash
# Cloner le repository
git clone https://github.com/VictoryKasende/Chirurgia_app_front_end.git
cd Chirurgia_app_front_end

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🎮 Utilisation

### Démarrage Rapide

1. **Lancer l'application** : `npm run dev`
2. **Accéder au Dashboard** : Interface principale avec navigation
3. **Choisir un module** : Prédiction, Analyse Complète, ou Clustering
4. **Utiliser les données de test** : Boutons de pré-remplissage disponibles
5. **Analyser les résultats** : Visualisations et recommandations

### Données de Test

L'application inclut des profils de patients préconfigurés :

- **High Risk Patient** : Profil à haut risque
- **Low Risk Patient** : Profil à faible risque  
- **Survivor Patient** : Profil de survivant
- **Mixed Profile Patient** : Profil mixte

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints Disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/predict/mortality` | POST | Prédiction complète de mortalité |
| `/predict/mortality-simple` | POST | Prédiction simple de mortalité |
| `/predict/death-cause` | POST | Analyse des causes de décès |
| `/analyze/clustering` | POST | Clustering des survivants |
| `/analyze/complete` | POST | Analyse complète |

### Format des Données

```typescript
// Biomarqueurs (17 paramètres)
interface Biomarkers {
  temperature: number;
  ph: number;
  pco2: number;
  po2: number;
  // ... 13 autres biomarqueurs
}

// Données cliniques textuelles
interface ClinicalTexts {
  diagnosis: string;
  surgery: string;
  problems: string;
  // ... autres champs cliniques
}
```

## � Structure du Projet

```
src/
├── components/           # Composants React
│   ├── layout/          # Composants de mise en page
│   │   └── Header.tsx   # En-tête de navigation
│   ├── BiomarkersForm.tsx      # Formulaire biomarqueurs
│   ├── ClinicalTextsForm.tsx   # Formulaire données cliniques
│   ├── Dashboard.tsx           # Tableau de bord principal
│   ├── MortalityPrediction.tsx # Module prédiction
│   ├── CompleteAnalysis.tsx    # Module analyse complète
│   └── ClusteringAnalysis.tsx  # Module clustering
├── services/            # Services et API
│   └── api.ts          # Configuration Axios et endpoints
├── types/              # Définitions TypeScript
│   └── api.ts         # Types pour API responses
├── data/              # Données statiques
│   └── testData.ts    # Données de test préconfigurées
├── assets/            # Ressources statiques
├── App.tsx           # Composant principal
├── main.tsx         # Point d'entrée
└── index.css       # Styles globaux
```

## 🛠️ Développement

### Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec HMR

# Build
npm run build        # Build de production
npm run preview      # Prévisualisation du build

# Qualité de Code
npm run lint         # Linting ESLint
npx tsc --noEmit     # Vérification TypeScript
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Victory Kasende**
- GitHub: [@VictoryKasende](https://github.com/VictoryKasende)
- Project: [ChirurgIA Frontend](https://github.com/VictoryKasende/Chirurgia_app_front_end)

---

<div align="center">
  <p>Développé avec ❤️ pour améliorer les soins chirurgicaux</p>
  <p><strong>ChirurgIA Frontend v1.0.0</strong></p>
</div>

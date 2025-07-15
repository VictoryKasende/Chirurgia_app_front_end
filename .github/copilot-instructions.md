# Copilot Instructions pour ChirurgIA Frontend

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du Projet

Cette application React TypeScript est le frontend pour l'API ChirurgIA - un système de prédiction de mortalité en chirurgie.

## Directives de Développement

### Architecture
- Utiliser React avec TypeScript strict
- Composants fonctionnels avec hooks
- Architecture modulaire avec séparation des responsabilités
- État global avec Context API ou React Query

### API Integration
- Base URL: `http://localhost:8000`
- Endpoints principaux:
  - `POST /predict/mortality` - Prédiction complète
  - `POST /predict/mortality-simple` - Prédiction simple
  - `POST /predict/death-cause` - Analyse des causes
  - `POST /analyze/clustering` - Clustering des survivants
  - `POST /analyze/complete` - Analyse complète

### Types de Données
- 17 biomarqueurs (temperature, ph, pco2, po2, etc.)
- Données cliniques textuelles (diagnosis, surgery, problems, etc.)
- Résultats de prédiction avec probabilités et recommandations

### UI/UX Guidelines
- Design médical professionnel
- Palette de couleurs sûres (bleus, verts)
- Indicateurs visuels clairs pour les niveaux de risque
- Formulaires de saisie structurés
- Graphiques et visualisations des données

### Sécurité et Validation
- Validation stricte des entrées utilisateur
- Gestion d'erreurs robuste
- Messages d'erreur informatifs
- Validation des types TypeScript

### Performance
- Lazy loading des composants
- Memoization appropriée
- Gestion optimisée des requêtes API
- Bundle splitting

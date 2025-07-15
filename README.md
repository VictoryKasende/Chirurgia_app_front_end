# ChirurgIA Frontend

Application React professionnelle pour l'API ChirurgIA - Système de prédiction de mortalité en chirurgie.

## 🏥 Fonctionnalités

### Analyses Disponibles
- **Prédiction de Mortalité Complète** : Analyse avec biomarqueurs + données textuelles
- **Prédiction de Mortalité Simple** : Analyse rapide avec biomarqueurs uniquement  
- **Analyse des Causes de Décès** : Prédiction des causes probables de décès
- **Clustering des Survivants** : Classification pour optimiser la surveillance
- **Analyse Complète Intégrée** : Toutes les analyses combinées

### Biomarqueurs Supportés (17 paramètres)
- Température, pH, PCO2, PO2, HCO3, Base Excess
- Lactate, Sodium, Potassium, Chlorure
- Urée, Créatinine, Glucose
- Leucocytes, Hémoglobine, Plaquettes, INR

### Interface Utilisateur
- Design médical professionnel avec Tailwind CSS
- Indicateurs visuels pour les niveaux de risque
- Formulaires de saisie structurés
- Visualisations des résultats en temps réel
- Navigation intuitive entre les différentes analyses

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v20.19.0 ou supérieur recommandé)
- npm ou yarn
- API ChirurgIA fonctionnelle sur `http://localhost:8000`

### Installation des dépendances
```bash
npm install
```

### Démarrage en mode développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour la production
```bash
npm run build
```

### Prévisualisation du build
```bash
npm run preview
```

## 🛠️ Technologies Utilisées

- **React 18** avec hooks et TypeScript
- **Vite** pour le build rapide et HMR
- **Tailwind CSS** pour le styling
- **Axios** pour les appels API
- **Lucide React** pour les icônes
- **TypeScript** pour la sécurité des types

## 📊 Architecture

```
src/
├── components/           # Composants React
│   ├── layout/          # Composants de mise en page
│   ├── Dashboard.tsx    # Tableau de bord principal
│   ├── MortalityPrediction.tsx    # Prédiction de mortalité
│   ├── CompleteAnalysis.tsx       # Analyse complète
│   └── ClusteringAnalysis.tsx     # Analyse de clustering
├── services/            # Services API
│   └── api.ts          # Client API ChirurgIA
├── types/              # Types TypeScript
│   └── api.ts         # Types pour l'API
└── App.tsx            # Composant principal
```

## 🔧 Configuration

### API ChirurgIA
L'application communique avec l'API ChirurgIA via les endpoints suivants :

- `POST /predict/mortality` - Prédiction complète
- `POST /predict/mortality-simple` - Prédiction simple  
- `POST /predict/death-cause` - Analyse des causes
- `POST /analyze/clustering` - Clustering des survivants
- `POST /analyze/complete` - Analyse complète

### Variables d'environnement
Créez un fichier `.env` pour personnaliser l'URL de l'API :

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🎨 Thème et Styles

L'application utilise une palette de couleurs médicales professionnelles :
- **Bleu médical** : Couleur principale de l'interface
- **Indicateurs de risque** : Vert (faible), Jaune (moyen), Rouge (élevé/critique)
- **Design responsive** : Optimisé pour desktop, tablette et mobile

## 📝 Utilisation

1. **Démarrer l'API ChirurgIA** sur le port 8000
2. **Lancer l'application** avec `npm run dev`
3. **Naviguer** entre les différents types d'analyses
4. **Saisir les données patient** (biomarqueurs + données cliniques)
5. **Analyser les résultats** avec visualisations en temps réel

## 🔍 Exemples de Données

### Biomarqueurs Standards
```typescript
{
  temperature: 37.0,
  ph: 7.4,
  pco2: 40.0,
  po2: 95.0,
  // ... autres paramètres
}
```

### Données Cliniques
```typescript
{
  diagnosis: "Acute appendicitis with complications",
  surgery: "Laparoscopic appendectomy",
  problems: "Post-operative infection",
  // ... autres champs
}
```

## 🚨 Gestion d'Erreurs

L'application inclut une gestion robuste des erreurs :
- Messages d'erreur informatifs
- Validation des entrées utilisateur
- Gestion des timeouts API
- Indicateurs de statut de connexion

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**ChirurgIA Frontend** - Interface moderne pour l'analyse prédictive en chirurgie 🏥

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

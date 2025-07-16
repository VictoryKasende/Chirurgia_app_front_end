// Données de test basées sur le script Python API
export const testPatients = {
  // Patient critique avec complications sévères
  criticalPatient: {
    biomarkers: {
      temperature: 38.5,
      ph: 7.25,
      pco2: 45.0,
      po2: 85.0,
      hco3: 18.0,
      be: -6.0,
      lactate: 5.2,
      na: 142.0,
      k: 4.1,
      cl: 105.0,
      urea: 8.5,
      creatinine: 2.1,
      hgt: 180.0,
      wcc: 18.5,
      hgb: 95.0,
      plt: 125.0,
      inr: 1.8
    },
    clinical_texts: {
      diagnosis: "Acute appendicitis with severe complications and sepsis",
      surgery: "Emergency laparoscopic appendectomy with drainage",
      problems: "Post-operative infection, bleeding, sepsis development",
      investigations: "CT scan showing perforation, blood cultures positive",
      clinical_course: "Patient admitted in emergency, ICU transfer required"
    }
  },

  // Patient stable avec valeurs normales
  stablePatient: {
    biomarkers: {
      temperature: 37.2,
      ph: 7.38,
      pco2: 42.0,
      po2: 95.0,
      hco3: 24.0,
      be: 1.0,
      lactate: 1.8,
      na: 140.0,
      k: 4.0,
      cl: 102.0,
      urea: 5.2,
      creatinine: 0.9,
      hgt: 110.0,
      wcc: 7.5,
      hgb: 135.0,
      plt: 280.0,
      inr: 1.1
    },
    clinical_texts: {
      diagnosis: "Routine cholecystectomy, no complications expected",
      surgery: "Elective laparoscopic cholecystectomy",
      problems: "No significant pre-operative problems",
      investigations: "Standard pre-operative workup, all within normal limits",
      clinical_course: "Scheduled surgery, routine recovery expected"
    }
  },

  // Patient choc septique
  septicShockPatient: {
    biomarkers: {
      temperature: 39.1,
      ph: 7.15,
      pco2: 50.0,
      po2: 65.0,
      hco3: 15.0,
      be: -10.0,
      lactate: 8.5,
      na: 148.0,
      k: 5.2,
      cl: 108.0,
      urea: 15.0,
      creatinine: 3.5,
      hgt: 220.0,
      wcc: 25.0,
      hgb: 75.0,
      plt: 85.0,
      inr: 2.8
    },
    clinical_texts: {
      diagnosis: "Septic shock secondary to pneumonia with multiple organ failure",
      surgery: "Emergency exploratory surgery",
      problems: "Severe sepsis, respiratory failure, renal dysfunction, bleeding",
      investigations: "Chest X-ray pneumonia, lactate elevated, blood cultures positive",
      clinical_course: "Rapid deterioration, ICU admission, mechanical ventilation"
    }
  },

  // Patient survie clustering
  survivorPatient: {
    biomarkers: {
      temperature: 37.8,
      ph: 7.35,
      pco2: 44.0,
      po2: 88.0,
      hco3: 22.0,
      be: -2.0,
      lactate: 3.1,
      na: 141.0,
      k: 4.2,
      cl: 103.0,
      urea: 6.8,
      creatinine: 1.4,
      hgt: 140.0,
      wcc: 12.0,
      hgb: 105.0,
      plt: 180.0,
      inr: 1.4
    },
    clinical_texts: {
      diagnosis: "Cholecystitis with mild complications",
      surgery: "Elective laparoscopic cholecystectomy",
      problems: "Minor post-operative pain, no major complications",
      investigations: "Ultrasound confirming gallstones, routine blood work",
      clinical_course: "Stable recovery, good pain control"
    }
  },

  // Patient analyse complète
  mixedProfilePatient: {
    biomarkers: {
      temperature: 38.2,
      ph: 7.32,
      pco2: 46.0,
      po2: 82.0,
      hco3: 20.0,
      be: -3.0,
      lactate: 3.8,
      na: 143.0,
      k: 4.3,
      cl: 106.0,
      urea: 7.2,
      creatinine: 1.6,
      hgt: 165.0,
      wcc: 14.5,
      hgb: 110.0,
      plt: 200.0,
      inr: 1.5
    },
    clinical_texts: {
      diagnosis: "Perforated diverticulitis with peritonitis",
      surgery: "Emergency sigmoid resection with primary anastomosis",
      problems: "Localized infection, moderate inflammatory response",
      investigations: "CT scan showing perforation and fluid collection",
      clinical_course: "Challenging surgery, post-op monitoring required"
    }
  }
};

// Labels pour les biomarqueurs
export const biomarkerLabels = {
  temperature: "Température (°C)",
  ph: "pH",
  pco2: "PCO2 (mmHg)",
  po2: "PO2 (mmHg)",
  hco3: "HCO3 (mEq/L)",
  be: "Base Excess",
  lactate: "Lactate (mmol/L)",
  na: "Sodium (mEq/L)",
  k: "Potassium (mEq/L)",
  cl: "Chloride (mEq/L)",
  urea: "Urée (mmol/L)",
  creatinine: "Créatinine (mg/dL)",
  hgt: "Glucose (mg/dL)",
  wcc: "GB (10³/µL)",
  hgb: "Hémoglobine (g/L)",
  plt: "Plaquettes (10³/µL)",
  inr: "INR"
};

// Ordre d'affichage des biomarqueurs (6 par ligne)
export const biomarkerOrder = [
  ['temperature', 'ph', 'pco2', 'po2', 'hco3', 'be'],
  ['lactate', 'na', 'k', 'cl', 'urea', 'creatinine'],
  ['hgt', 'wcc', 'hgb', 'plt', 'inr']
];

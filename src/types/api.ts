// Types pour l'API ChirurgIA

export interface Biomarkers {
  temperature: number;
  ph: number;
  pco2: number;
  po2: number;
  hco3: number;
  be: number;
  lactate: number;
  na: number;
  k: number;
  cl: number;
  urea: number;
  creatinine: number;
  hgt: number;
  wcc: number;
  hgb: number;
  plt: number;
  inr: number;
}

export interface ClinicalTexts {
  diagnosis: string;
  surgery: string;
  problems: string;
  investigations: string;
  clinical_course: string;
}

export interface PatientData {
  biomarkers: Biomarkers;
  clinical_texts?: ClinicalTexts;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'CRITIQUE';
export type Prediction = 'DEATH' | 'SURVIVAL' | 'Died' | 'Survived';

export interface MortalityPredictionResponse {
  prediction: Prediction;
  probability_death: number;
  probability_survival: number;
  risk_level: RiskLevel;
  risk_factors: string[];
  recommendations: string[];
  patient_id: string;
  confidence?: number;
  timestamp?: string;
  processing_time?: number;
}

export interface MortalitySimpleResponse {
  prediction: Prediction;
  probability_survival: number;
  probability_death: number;
  risk_level: RiskLevel;
  patient_id: string;
  processing_time: number;
}

export interface DeathCause {
  cause: string;
  probability: number;
}

export interface DeathCauseResponse {
  predicted_cause: string;
  confidence: number;
  top_3_causes: DeathCause[];
  clinical_interpretation: string;
  patient_id: string;
  processing_time: number;
}

export interface ClusteringResponse {
  cluster: number;
  cluster_name: string;
  criticality_score: number;
  severity_level: string;
  monitoring_level: string;
  similar_patients_count: number;
  recommendations: string[];
  cluster_characteristics: string[];
  patient_id: string;
  processing_time: number;
}

export interface CompleteAnalysisResponse {
  patient_id: string;
  analysis_type: string;
  mortality_prediction?: MortalityPredictionResponse;
  death_cause_analysis?: DeathCauseResponse;
  clustering_analysis?: ClusteringResponse;
  processing_time: number;
}

export interface ApiError {
  detail: string;
  status_code: number;
}

// Types pour l'interface utilisateur
export interface FormData {
  biomarkers: Partial<Biomarkers>;
  clinical_texts: Partial<ClinicalTexts>;
}

export interface AnalysisResult {
  type: 'mortality' | 'mortality-simple' | 'death-cause' | 'clustering' | 'complete';
  data: MortalityPredictionResponse | MortalitySimpleResponse | DeathCauseResponse | ClusteringResponse | CompleteAnalysisResponse;
  timestamp: string;
}

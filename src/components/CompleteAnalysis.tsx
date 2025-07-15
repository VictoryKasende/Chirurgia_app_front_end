import { useState } from 'react';
import { Activity, Heart, Users, Clock, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, CompleteAnalysisResponse } from '../types/api';

const CompleteAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompleteAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [biomarkers, setBiomarkers] = useState<Partial<Biomarkers>>({
    temperature: 37.0,
    ph: 7.4,
    pco2: 40.0,
    po2: 95.0,
    hco3: 24.0,
    be: 0.0,
    lactate: 1.0,
    na: 140.0,
    k: 4.0,
    cl: 100.0,
    urea: 5.0,
    creatinine: 1.0,
    hgt: 120.0,
    wcc: 8.0,
    hgb: 140.0,
    plt: 250.0,
    inr: 1.0,
  });

  const [clinicalTexts, setClinicalTexts] = useState<Partial<ClinicalTexts>>({
    diagnosis: '',
    surgery: '',
    problems: '',
    investigations: '',
    clinical_course: '',
  });

  const handleBiomarkerChange = (field: keyof Biomarkers, value: string) => {
    setBiomarkers(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleClinicalTextChange = (field: keyof ClinicalTexts, value: string) => {
    setClinicalTexts(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await chirurgiaApi.analyzeComplete({
        biomarkers: biomarkers as Biomarkers,
        clinical_texts: clinicalTexts as ClinicalTexts
      });
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'analyse complète');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'CRITICAL': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const biomarkerFields = [
    { key: 'temperature', label: 'Température (°C)', unit: '°C' },
    { key: 'ph', label: 'pH', unit: '' },
    { key: 'pco2', label: 'PCO2', unit: 'mmHg' },
    { key: 'po2', label: 'PO2', unit: 'mmHg' },
    { key: 'hco3', label: 'HCO3', unit: 'mmol/L' },
    { key: 'be', label: 'Base Excess', unit: 'mmol/L' },
    { key: 'lactate', label: 'Lactate', unit: 'mmol/L' },
    { key: 'na', label: 'Sodium', unit: 'mmol/L' },
    { key: 'k', label: 'Potassium', unit: 'mmol/L' },
    { key: 'cl', label: 'Chlorure', unit: 'mmol/L' },
    { key: 'urea', label: 'Urée', unit: 'mmol/L' },
    { key: 'creatinine', label: 'Créatinine', unit: 'mg/dL' },
    { key: 'hgt', label: 'Glucose', unit: 'mg/dL' },
    { key: 'wcc', label: 'Leucocytes', unit: '10³/µL' },
    { key: 'hgb', label: 'Hémoglobine', unit: 'g/L' },
    { key: 'plt', label: 'Plaquettes', unit: '10³/µL' },
    { key: 'inr', label: 'INR', unit: '' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analyse Complète Intégrée</h1>
        <p className="text-gray-600">
          Analyse combinée : prédiction de mortalité, causes de décès et clustering
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Biomarkers */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Biomarqueurs (17 paramètres)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {biomarkerFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.unit && `(${field.unit})`}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={biomarkers[field.key as keyof Biomarkers] || ''}
                      onChange={(e) => handleBiomarkerChange(field.key as keyof Biomarkers, e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Texts */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Données Cliniques Textuelles
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnostic
                  </label>
                  <textarea
                    value={clinicalTexts.diagnosis || ''}
                    onChange={(e) => handleClinicalTextChange('diagnosis', e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="Description du diagnostic principal..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chirurgie
                  </label>
                  <textarea
                    value={clinicalTexts.surgery || ''}
                    onChange={(e) => handleClinicalTextChange('surgery', e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="Description de l'intervention chirurgicale..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Problèmes
                  </label>
                  <textarea
                    value={clinicalTexts.problems || ''}
                    onChange={(e) => handleClinicalTextChange('problems', e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="Complications et problèmes identifiés..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investigations
                  </label>
                  <textarea
                    value={clinicalTexts.investigations || ''}
                    onChange={(e) => handleClinicalTextChange('investigations', e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="Examens et tests effectués..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Évolution Clinique
                  </label>
                  <textarea
                    value={clinicalTexts.clinical_course || ''}
                    onChange={(e) => handleClinicalTextChange('clinical_course', e.target.value)}
                    className="input-field"
                    rows={2}
                    placeholder="Évolution du patient depuis l'admission..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Clock className="animate-spin h-4 w-4 mr-2" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Lancer l'Analyse Complète
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-1 space-y-6">
          {error && (
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Informations Patient
                </h3>
                <div className="text-sm text-gray-600">
                  <p>ID Patient: {result.patient_id}</p>
                  <p>Type d'analyse: {result.analysis_type}</p>
                  <p>Temps total: {result.processing_time.toFixed(2)}s</p>
                </div>
              </div>

              {/* Mortality Prediction */}
              {result.mortality_prediction && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Prédiction de Mortalité
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Prédiction</span>
                      <div className="flex items-center">
                        {result.mortality_prediction.prediction === 'SURVIVAL' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          result.mortality_prediction.prediction === 'SURVIVAL' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {result.mortality_prediction.prediction === 'SURVIVAL' ? 'Survie' : 'Décès'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Survie</span>
                        <span className="text-xs font-medium text-green-600">
                          {(result.mortality_prediction.probability_survival * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Décès</span>
                        <span className="text-xs font-medium text-red-600">
                          {(result.mortality_prediction.probability_death * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Niveau de risque</span>
                      <span className={`risk-indicator ${getRiskColor(result.mortality_prediction.risk_level)}`}>
                        {result.mortality_prediction.risk_level}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Death Cause Analysis */}
              {result.death_cause_analysis && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    Analyse des Causes
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Cause prédite</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {result.death_cause_analysis.predicted_cause}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Confiance</span>
                      <span className="text-sm font-medium">
                        {(result.death_cause_analysis.confidence * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-700">Top 3 causes</span>
                      <ul className="mt-1 space-y-1">
                        {result.death_cause_analysis.top_3_causes.map((cause, index) => (
                          <li key={index} className="flex justify-between text-xs">
                            <span className="text-gray-600">{cause.cause}</span>
                            <span className="font-medium">{(cause.probability * 100).toFixed(1)}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Clustering Analysis */}
              {result.clustering_analysis && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Clustering
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Cluster</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {result.clustering_analysis.cluster_name}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Score de criticité</span>
                      <span className="text-sm font-medium">
                        {result.clustering_analysis.criticality_score.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sévérité</span>
                      <span className={`text-xs px-2 py-1 rounded ${getRiskColor(result.clustering_analysis.severity_level)}`}>
                        {result.clustering_analysis.severity_level}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Patients similaires</span>
                      <span className="text-sm font-medium">
                        {result.clustering_analysis.similar_patients_count}
                      </span>
                    </div>

                    {result.clustering_analysis.recommendations && result.clustering_analysis.recommendations.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Recommandations</span>
                        <ul className="mt-1 space-y-1">
                          {result.clustering_analysis.recommendations.slice(0, 3).map((rec, index) => (
                            <li key={index} className="text-xs text-gray-600">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteAnalysis;

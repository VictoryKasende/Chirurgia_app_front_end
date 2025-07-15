import { useState } from 'react';
import { Heart, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, MortalityPredictionResponse, MortalitySimpleResponse } from '../types/api';

const MortalityPrediction = () => {
  const [analysisType, setAnalysisType] = useState<'simple' | 'complete'>('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MortalityPredictionResponse | MortalitySimpleResponse | null>(null);
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
      if (analysisType === 'simple') {
        const response = await chirurgiaApi.predictMortalitySimple(biomarkers as Biomarkers);
        setResult(response);
      } else {
        const response = await chirurgiaApi.predictMortality({
          biomarkers: biomarkers as Biomarkers,
          clinical_texts: clinicalTexts as ClinicalTexts
        });
        setResult(response);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la prédiction');
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
        <h1 className="text-2xl font-bold text-gray-900">Prédiction de Mortalité</h1>
        <p className="text-gray-600">
          Analyse des risques de mortalité basée sur les biomarqueurs et données cliniques
        </p>
      </div>

      {/* Analysis Type Selection */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Type d'Analyse</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setAnalysisType('simple')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              analysisType === 'simple'
                ? 'bg-medical-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Analyse Simple
          </button>
          <button
            onClick={() => setAnalysisType('complete')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              analysisType === 'complete'
                ? 'bg-medical-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Analyse Complète
          </button>
        </div>
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

            {/* Clinical Texts - Only for complete analysis */}
            {analysisType === 'complete' && (
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
            )}

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
                  <Heart className="h-4 w-4 mr-2" />
                  Lancer la Prédiction
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          {error && (
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Résultats de la Prédiction
              </h3>
              
              <div className="space-y-4">
                {/* Prediction */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Prédiction</span>
                  <div className="flex items-center">
                    {result.prediction === 'SURVIVAL' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className={`font-medium ${
                      result.prediction === 'SURVIVAL' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.prediction === 'SURVIVAL' ? 'Survie' : 'Décès'}
                    </span>
                  </div>
                </div>

                {/* Probabilities */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Probabilité de survie</span>
                    <span className="text-sm font-medium text-green-600">
                      {(result.probability_survival * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Probabilité de décès</span>
                    <span className="text-sm font-medium text-red-600">
                      {(result.probability_death * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Niveau de risque</span>
                  <span className={`risk-indicator ${getRiskColor(result.risk_level)}`}>
                    {result.risk_level}
                  </span>
                </div>

                {/* Risk Factors - Only for complete analysis */}
                {'risk_factors' in result && result.risk_factors && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Facteurs de risque</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.risk_factors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations - Only for complete analysis */}
                {'recommendations' in result && result.recommendations && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommandations</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Processing time */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Temps de traitement</span>
                  <span className="text-xs text-gray-500">
                    {result.processing_time.toFixed(2)}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortalityPrediction;

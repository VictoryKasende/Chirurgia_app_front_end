import React, { useState } from 'react';
import { Users, Clock, AlertCircle, TrendingUp, Shield, Eye } from 'lucide-react';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, ClusteringResponse } from '../types/api';

const ClusteringAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClusteringResponse | null>(null);
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
      const response = await chirurgiaApi.analyzeClustering({
        biomarkers: biomarkers as Biomarkers,
        clinical_texts: clinicalTexts as ClinicalTexts
      });
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'analyse de clustering');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'CRITICAL': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMonitoringIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'standard': return Shield;
      case 'enhanced': return Eye;
      case 'intensive': return AlertCircle;
      default: return Shield;
    }
  };

  const getCriticalityColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
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
        <h1 className="text-2xl font-bold text-gray-900">Analyse de Clustering des Survivants</h1>
        <p className="text-gray-600">
          Classification des patients pour optimiser la surveillance et les soins
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
                  <Users className="h-4 w-4 mr-2" />
                  Analyser le Clustering
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
              {/* Cluster Information */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Classification
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Cluster assigné</span>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      Cluster {result.cluster}: {result.cluster_name}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Niveau de sévérité</span>
                    <span className={`risk-indicator ${getSeverityColor(result.severity_level)}`}>
                      {result.severity_level}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Score de criticité</span>
                    <span className={`text-lg font-bold ${getCriticalityColor(result.criticality_score)}`}>
                      {result.criticality_score.toFixed(1)}%
                    </span>
                  </div>

                  {/* Criticality progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        result.criticality_score >= 80 ? 'bg-red-500' :
                        result.criticality_score >= 60 ? 'bg-orange-500' :
                        result.criticality_score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.criticality_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Monitoring Level */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  {React.createElement(getMonitoringIcon(result.monitoring_level), { 
                    className: "h-5 w-5 mr-2 text-purple-500" 
                  })}
                  Surveillance
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Niveau requis</span>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {result.monitoring_level}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patients similaires</span>
                    <span className="text-sm font-medium text-gray-900">
                      {result.similar_patients_count} patients
                    </span>
                  </div>
                </div>
              </div>

              {/* Cluster Characteristics */}
              {result.cluster_characteristics && result.cluster_characteristics.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Caractéristiques
                  </h3>
                  
                  <ul className="space-y-2">
                    {result.cluster_characteristics.map((characteristic, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{characteristic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recommandations
                  </h3>
                  
                  <ul className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Processing Info */}
              <div className="card bg-gray-50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">ID Patient</span>
                  <span className="font-mono text-gray-900">{result.patient_id}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Temps de traitement</span>
                  <span className="text-gray-900">{result.processing_time.toFixed(2)}s</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClusteringAnalysis;

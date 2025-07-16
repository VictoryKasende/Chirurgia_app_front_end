import { useState, useEffect } from 'react';
import { Brain, Heart, Users, Clock, AlertCircle, Activity } from 'lucide-react';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, CompleteAnalysisResponse } from '../types/api';
import BiomarkersForm from './BiomarkersForm';
import ClinicalTextsForm from './ClinicalTextsForm';
import { testPatients } from '../data/testData';

const CompleteAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompleteAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [biomarkers, setBiomarkers] = useState<Biomarkers>(testPatients.mixedProfilePatient.biomarkers);
  const [clinicalTexts, setClinicalTexts] = useState<ClinicalTexts>(testPatients.mixedProfilePatient.clinical_texts);

  // Charger des données de test par défaut au chargement
  useEffect(() => {
    setBiomarkers(testPatients.mixedProfilePatient.biomarkers);
    setClinicalTexts(testPatients.mixedProfilePatient.clinical_texts);
  }, []);

  const handleBiomarkersChange = (newBiomarkers: Biomarkers) => {
    setBiomarkers(newBiomarkers);
  };

  const handleClinicalTextsChange = (newClinicalTexts: ClinicalTexts) => {
    setClinicalTexts(newClinicalTexts);
  };

  const loadPatientData = (patientType: keyof typeof testPatients) => {
    const patient = testPatients[patientType];
    setBiomarkers(patient.biomarkers);
    setClinicalTexts(patient.clinical_texts);
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
    const upperRisk = riskLevel?.toUpperCase() || '';
    switch (upperRisk) {
      case 'LOW':
      case 'FAIBLE': 
        return 'text-green-600 bg-green-100';
      case 'MEDIUM':
      case 'MOYEN': 
        return 'text-yellow-600 bg-yellow-100';
      case 'HIGH':
      case 'ÉLEVÉ':
      case 'ELEVE': 
        return 'text-red-600 bg-red-100';
      case 'CRITICAL':
      case 'CRITIQUE': 
        return 'text-red-800 bg-red-200';
      default: 
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-8 w-8 text-medical-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Analyse Complète Intégrée</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Analyse médicale complète combinant prédiction de mortalité, analyse des causes de décès et clustering des patients
        </p>
      </div>

      {/* Sélection des données de test */}
      <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
        <div className="flex items-center mb-4">
          <Activity className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-purple-900">Profils patients disponibles</h3>
        </div>
        <p className="text-sm text-purple-700 mb-4">
          Choisissez un profil de patient pour une démonstration complète de l'analyse médicale intégrée
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <button
            onClick={() => loadPatientData('criticalPatient')}
            className="px-4 py-4 bg-gradient-to-br from-red-100 to-red-200 text-red-800 rounded-xl font-medium hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">🚨</div>
            <div className="text-sm font-bold">Patient Critique</div>
            <div className="text-xs opacity-75">Haut risque</div>
          </button>
          <button
            onClick={() => loadPatientData('stablePatient')}
            className="px-4 py-4 bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-xl font-medium hover:from-green-200 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">✅</div>
            <div className="text-sm font-bold">Patient Stable</div>
            <div className="text-xs opacity-75">Faible risque</div>
          </button>
          <button
            onClick={() => loadPatientData('septicShockPatient')}
            className="px-4 py-4 bg-gradient-to-br from-red-100 to-red-200 text-red-800 rounded-xl font-medium hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm font-bold">Choc Septique</div>
            <div className="text-xs opacity-75">Critique</div>
          </button>
          <button
            onClick={() => loadPatientData('survivorPatient')}
            className="px-4 py-4 bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-xl font-medium hover:from-green-200 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-sm font-bold">Survivant</div>
            <div className="text-xs opacity-75">Rétablissement</div>
          </button>
          <button
            onClick={() => loadPatientData('mixedProfilePatient')}
            className="px-4 py-4 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 rounded-xl font-medium hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-2xl mb-1">🔄</div>
            <div className="text-sm font-bold">Profil Mixte</div>
            <div className="text-xs opacity-75">Modéré</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">
        {/* Form Section */}
        <div className="2xl:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Biomarkers Form */}
            <div className="card shadow-xl border-l-4 border-medical-500 bg-gradient-to-r from-white to-blue-50">
              <BiomarkersForm
                biomarkers={biomarkers}
                onChange={handleBiomarkersChange}
              />
            </div>

            {/* Clinical Texts Form */}
            <div className="card shadow-xl border-l-4 border-green-500 bg-gradient-to-r from-white to-green-50">
              <ClinicalTextsForm
                clinicalTexts={clinicalTexts}
                onChange={handleClinicalTextsChange}
              />
            </div>

            {/* Submit Controls */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin h-6 w-6 mr-3" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Brain className="h-6 w-6 mr-3" />
                    Lancer l'Analyse Complète
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="2xl:col-span-1">
          {error && (
            <div className="card bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <h4 className="font-bold text-red-800">Erreur d'Analyse</h4>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="card bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 text-center">
              <div className="py-8">
                <Brain className="h-20 w-20 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-indigo-900 mb-3">
                  Analyse Complète
                </h3>
                <p className="text-indigo-700 mb-6">
                  L'analyse complète combine trois modules d'intelligence artificielle pour une évaluation exhaustive du patient.
                </p>
                <div className="bg-indigo-100 rounded-xl p-4 text-sm text-indigo-800 space-y-3">
                  <div className="font-bold text-indigo-900 mb-3">🧠 Modules d'Analyse</div>
                  <div className="grid gap-2 text-left">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      <span>Prédiction de mortalité</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                      <span>Analyse des causes</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Classification patient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Patient Summary */}
              <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
                <div className="flex items-center mb-3">
                  <Activity className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-bold text-blue-900">Résumé Patient</h3>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">ID: {result.patient_id}</div>
                    <div className="text-sm text-gray-600 mt-1">Analyse complète générée</div>
                  </div>
                </div>
              </div>

              {/* Mortality Prediction */}
              {result.mortality_prediction && (
                <div className="card bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-200">
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 text-red-600 mr-2" />
                    <h4 className="font-bold text-red-900">Prédiction Mortalité</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Prédiction</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          (result.mortality_prediction.prediction === 'SURVIVAL' || result.mortality_prediction.prediction === 'Survived') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(result.mortality_prediction.prediction === 'SURVIVAL' || result.mortality_prediction.prediction === 'Survived') ? 'Survie' : 'Décès'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-600">Survie</div>
                          <div className="font-bold text-green-600">
                            {(result.mortality_prediction.probability_survival * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Décès</div>
                          <div className="font-bold text-red-600">
                            {(result.mortality_prediction.probability_death * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-700 mb-1">Niveau de risque</div>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${getRiskColor(result.mortality_prediction.risk_level)}`}>
                        {result.mortality_prediction.risk_level}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Death Cause Analysis */}
              {result.death_cause_analysis && (
                <div className="card bg-gradient-to-br from-orange-50 to-yellow-100 border-2 border-orange-200">
                  <div className="flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-bold text-orange-900">Analyse des Causes</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-medium text-gray-700 mb-1">Cause prédite</div>
                      <div className="font-bold text-orange-800 text-sm">
                        {result.death_cause_analysis.predicted_cause}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Confiance: {(result.death_cause_analysis.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    {result.death_cause_analysis.top_3_causes && (
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-sm font-medium text-gray-700 mb-2">Top 3 causes</div>
                        <div className="space-y-1">
                          {result.death_cause_analysis.top_3_causes.map((cause, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="text-gray-600">{cause.cause}</span>
                              <span className="font-medium">{(cause.probability * 100).toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Clustering Analysis */}
              {result.clustering_analysis && (
                <div className="card bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-bold text-green-900">Classification</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-lg font-bold text-green-600">
                        Cluster {result.clustering_analysis.cluster}
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {result.clustering_analysis.cluster_name}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Score de criticité</span>
                        <span className="text-sm font-medium">
                          {result.clustering_analysis.criticality_score != null ? result.clustering_analysis.criticality_score.toFixed(1) : '0'}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing Time */}
              <div className="card bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Temps total</span>
                  </div>
                  <span className="text-sm font-mono text-gray-600">
                    {(result as any).processing_time ? (result as any).processing_time.toFixed(2) + 's' : 'N/A'}
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

export default CompleteAnalysis;

import { useState, useEffect } from 'react';
import { Brain, Heart, Users, Clock, AlertCircle, Activity, AlertTriangle, CheckCircle2, Zap, Target, TrendingUp, Shield, Gauge, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar } from 'recharts';
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
          <Brain className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analyse Complète Intégrée</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            onClick={() => loadPatientData('criticalPatient')}
            className="px-3 py-3 bg-gradient-to-br from-red-100 to-red-200 text-red-800 rounded-xl font-medium hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="text-xs md:text-sm font-bold">Patient Critique</div>
            <div className="text-xs opacity-75">Haut risque</div>
          </button>
          <button
            onClick={() => loadPatientData('stablePatient')}
            className="px-3 py-3 bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-xl font-medium hover:from-green-200 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="text-xs md:text-sm font-bold">Patient Stable</div>
            <div className="text-xs opacity-75">Faible risque</div>
          </button>
          <button
            onClick={() => loadPatientData('septicShockPatient')}
            className="px-3 py-3 bg-gradient-to-br from-red-100 to-red-200 text-red-800 rounded-xl font-medium hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <Zap className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="text-xs md:text-sm font-bold">Choc Septique</div>
            <div className="text-xs opacity-75">Critique</div>
          </button>
          <button
            onClick={() => loadPatientData('survivorPatient')}
            className="px-3 py-3 bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-xl font-medium hover:from-green-200 hover:to-green-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <Target className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="text-xs md:text-sm font-bold">Survivant</div>
            <div className="text-xs opacity-75">Rétablissement</div>
          </button>
          <button
            onClick={() => loadPatientData('mixedProfilePatient')}
            className="px-3 py-3 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 rounded-xl font-medium hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="text-xl md:text-2xl mb-1">🔄</div>
            <div className="text-xs md:text-sm font-bold">Profil Mixte</div>
            <div className="text-xs opacity-75">Modéré</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Biomarkers Form */}
            <div className="card shadow-xl border-l-4 border-blue-500 bg-gradient-to-r from-white to-blue-50">
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
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center py-3 md:py-4 text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                    <span className="hidden sm:inline">Analyse en cours...</span>
                    <span className="sm:hidden">Analyse...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                    <span className="hidden sm:inline">Lancer l'Analyse Complète</span>
                    <span className="sm:hidden">Analyser</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-1">
          {error && (
            <div className="card bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-800 text-sm md:text-base">Erreur d'Analyse</h4>
                  <p className="text-red-700 text-xs md:text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="card bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 text-center">
              <div className="py-6 md:py-8">
                <Brain className="h-16 w-16 md:h-20 md:w-20 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-indigo-900 mb-3">
                  Analyse Complète
                </h3>
                <p className="text-indigo-700 mb-4 md:mb-6 text-sm md:text-base">
                  L'analyse complète combine trois modules d'intelligence artificielle pour une évaluation exhaustive du patient.
                </p>
                <div className="bg-indigo-100 rounded-xl p-3 md:p-4 text-xs md:text-sm text-indigo-800 space-y-3">
                  <div className="font-bold text-indigo-900 mb-3">🧠 Modules d'Analyse</div>
                  <div className="grid gap-2 text-left">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 md:h-4 md:w-4 mr-2 text-red-500 flex-shrink-0" />
                      <span>Prédiction de mortalité</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-2 text-orange-500 flex-shrink-0" />
                      <span>Analyse des causes</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 md:h-4 md:w-4 mr-2 text-blue-500 flex-shrink-0" />
                      <span>Classification patient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4 md:space-y-6">
              {/* Header avec informations principales */}
              <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-gray-900 flex items-center">
                      <Brain className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline">Analyse Complète - Patient {result.patient_id}</span>
                      <span className="sm:hidden">Patient {result.patient_id}</span>
                    </h3>
                    <p className="text-gray-600 mt-1 text-xs md:text-sm">Rapport médical intégré</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs md:text-sm text-gray-600">Analyse terminée</div>
                    <div className="text-xs text-gray-500">
                      {(result as any).processing_time ? (result as any).processing_time.toFixed(2) + 's' : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vue d'ensemble des métriques */}
              {result.mortality_prediction && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600">Survie</p>
                        <p className="text-lg md:text-2xl font-bold text-green-600">
                          {(result.mortality_prediction.probability_survival * 100).toFixed(1)}%
                        </p>
                      </div>
                      <Shield className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0" />
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600">Risque</p>
                        <p className="text-lg md:text-2xl font-bold text-red-600">
                          {(result.mortality_prediction.probability_death * 100).toFixed(1)}%
                        </p>
                      </div>
                      <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-red-500 flex-shrink-0" />
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600">Cluster</p>
                        <p className="text-lg md:text-2xl font-bold text-purple-600">
                          {result.clustering_analysis?.cluster || 'N/A'}
                        </p>
                      </div>
                      <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-500 flex-shrink-0" />
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600">Confiance</p>
                        <p className="text-lg md:text-2xl font-bold text-blue-600">
                          {result.death_cause_analysis ? (result.death_cause_analysis.confidence * 100).toFixed(1) + '%' : 'N/A'}
                        </p>
                      </div>
                      <Gauge className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              )}

              {/* Graphiques de visualisation - Version responsive */}
              <div className="space-y-4 md:space-y-6">
                {/* Graphique de mortalité */}
                {result.mortality_prediction && (
                  <div className="card">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2 flex-shrink-0" />
                      Prédiction de Mortalité
                    </h4>
                    <div className="space-y-4">
                      <div className="w-full h-48 md:h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Survie', value: result.mortality_prediction.probability_survival * 100, color: '#10b981' },
                                { name: 'Décès', value: result.mortality_prediction.probability_death * 100, color: '#ef4444' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={60}
                              dataKey="value"
                              label={({ value }) => `${value ? value.toFixed(1) : '0'}%`}
                            >
                              <Cell fill="#10b981" />
                              <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Probabilité']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                          (result.mortality_prediction.prediction === 'SURVIVAL' || result.mortality_prediction.prediction === 'Survived') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(result.mortality_prediction.prediction === 'SURVIVAL' || result.mortality_prediction.prediction === 'Survived') ? 'Survie Prédite' : 'Risque Élevé'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analyse des causes */}
                {result.death_cause_analysis && result.death_cause_analysis.top_3_causes && (
                  <div className="card">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-orange-600 mr-2 flex-shrink-0" />
                      Causes Potentielles
                    </h4>
                    <div className="w-full h-48 md:h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.death_cause_analysis.top_3_causes.map(cause => ({
                          name: cause.cause.length > 10 ? cause.cause.substring(0, 10) + '...' : cause.cause,
                          value: cause.probability * 100,
                          fullName: cause.cause
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                          <YAxis tick={{ fontSize: 9 }} />
                          <Tooltip 
                            formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Probabilité']}
                            labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                          />
                          <Bar dataKey="value" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-xs md:text-sm font-medium text-gray-700">Cause principale</div>
                      <div className="text-orange-800 font-semibold text-sm md:text-base">{result.death_cause_analysis.predicted_cause}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Informations détaillées - Version responsive */}
              <div className="space-y-4 md:space-y-6">
                {/* Classification du patient */}
                {result.clustering_analysis && (
                  <div className="card">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 flex-shrink-0" />
                      Classification Patient
                    </h4>
                    <div className="space-y-4">
                      <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">
                          Cluster {result.clustering_analysis.cluster}
                        </div>
                        <div className="text-base md:text-lg font-medium text-gray-800">
                          {result.clustering_analysis.cluster_name}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-full h-24 md:h-32 max-w-xs">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart 
                              cx="50%" 
                              cy="50%" 
                              innerRadius="30%" 
                              outerRadius="90%" 
                              data={[
                                { 
                                  name: 'Criticité', 
                                  value: result.clustering_analysis.criticality_score || 0,
                                  fill: (result.clustering_analysis.criticality_score || 0) > 70 ? '#ef4444' : 
                                        (result.clustering_analysis.criticality_score || 0) > 40 ? '#f59e0b' : '#10b981'
                                }
                              ]}
                            >
                              <RadialBar dataKey="value" cornerRadius={10} />
                              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Score de Criticité']} />
                            </RadialBarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="text-center text-xs md:text-sm text-gray-600">
                        Score de criticité: {result.clustering_analysis.criticality_score?.toFixed(1) || '0'}%
                      </div>
                    </div>
                  </div>
                )}

                {/* Résumé des risques */}
                {result.mortality_prediction && (
                  <div className="card">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-purple-600 mr-2 flex-shrink-0" />
                      Évaluation des Risques
                    </h4>
                    <div className="space-y-4">
                      <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-base md:text-lg font-bold text-purple-600">
                          Niveau de Risque
                        </div>
                        <div className={`text-xl md:text-2xl font-bold mt-2 ${getRiskColor(result.mortality_prediction.risk_level).replace('bg-', 'text-').replace('-100', '-600')}`}>
                          {result.mortality_prediction.risk_level}
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-xs md:text-sm text-gray-600">Probabilité de survie</span>
                          <span className="font-semibold text-green-600 text-sm md:text-base">
                            {(result.mortality_prediction.probability_survival * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-xs md:text-sm text-gray-600">Probabilité de décès</span>
                          <span className="font-semibold text-red-600 text-sm md:text-base">
                            {(result.mortality_prediction.probability_death * 100).toFixed(1)}%
                          </span>
                        </div>
                        {result.death_cause_analysis && (
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-xs md:text-sm text-gray-600">Confiance diagnostic</span>
                            <span className="font-semibold text-blue-600 text-sm md:text-base">
                              {(result.death_cause_analysis.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteAnalysis;

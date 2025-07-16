import { useState, useEffect } from 'react';
import { Heart, AlertCircle, CheckCircle, Clock, TrendingUp, Activity, Shield, Target, Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar } from 'recharts';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, MortalityPredictionResponse, MortalitySimpleResponse } from '../types/api';
import BiomarkersForm from './BiomarkersForm';
import ClinicalTextsForm from './ClinicalTextsForm';
import { testPatients } from '../data/testData';

const MortalityPrediction = () => {
  const [analysisType, setAnalysisType] = useState<'simple' | 'complete'>('simple');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MortalityPredictionResponse | MortalitySimpleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [biomarkers, setBiomarkers] = useState<Biomarkers>(testPatients.criticalPatient.biomarkers);
  const [clinicalTexts, setClinicalTexts] = useState<ClinicalTexts>(testPatients.criticalPatient.clinical_texts);

  // Charger des données de test par défaut au chargement
  useEffect(() => {
    setBiomarkers(testPatients.criticalPatient.biomarkers);
    setClinicalTexts(testPatients.criticalPatient.clinical_texts);
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

    console.log('🚀 Démarrage de la prédiction...');
    console.log('Type d\'analyse:', analysisType);
    console.log('Biomarqueurs:', biomarkers);
    if (analysisType === 'complete') {
      console.log('Données cliniques:', clinicalTexts);
    }

    try {
      let response;
      if (analysisType === 'simple') {
        console.log('📊 Appel API prédiction simple...');
        response = await chirurgiaApi.predictMortalitySimple(biomarkers as Biomarkers);
      } else {
        console.log('📊 Appel API prédiction complète...');
        response = await chirurgiaApi.predictMortality({
          biomarkers: biomarkers as Biomarkers,
          clinical_texts: clinicalTexts as ClinicalTexts
        });
      }
      
      console.log('✅ Réponse API reçue:', response);
      setResult(response);
    } catch (err: any) {
      console.error('❌ Erreur lors de la prédiction:', err);
      console.error('Détails de l\'erreur:', {
        message: err.message,
        stack: err.stack,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Gestion d'erreur plus spécifique
      let errorMessage = 'Erreur lors de la prédiction';
      if (err.response?.status === 404) {
        errorMessage = 'API non trouvée. Vérifiez que l\'API ChirurgIA est démarrée sur http://localhost:8000';
      } else if (err.response?.status === 500) {
        errorMessage = 'Erreur serveur. Vérifiez les logs de l\'API ChirurgIA';
      } else if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        errorMessage = 'Impossible de se connecter à l\'API. Vérifiez que l\'API ChirurgIA est démarrée';
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskTextColor = (riskLevel: string) => {
    const upperRisk = riskLevel?.toUpperCase() || '';
    switch (upperRisk) {
      case 'LOW':
      case 'FAIBLE': 
        return 'text-green-600';
      case 'MEDIUM':
      case 'MOYEN': 
        return 'text-yellow-600';
      case 'HIGH':
      case 'ÉLEVÉ':
      case 'ELEVE': 
        return 'text-red-600';
      case 'CRITICAL':
      case 'CRITIQUE': 
        return 'text-red-800';
      default: 
        return 'text-gray-600';
    }
  };

  const translateRiskLevel = (riskLevel: string) => {
    const upperRisk = riskLevel?.toUpperCase() || '';
    switch (upperRisk) {
      case 'LOW': return 'Faible';
      case 'MEDIUM': return 'Moyen';
      case 'HIGH': return 'Élevé';
      case 'CRITICAL': return 'Critique';
      default: return riskLevel;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mb-4">
          <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-600 mr-3" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Prédiction de Mortalité</h1>
        </div>
        <p className="text-sm md:text-base text-gray-600">
          Analyse des risques de mortalité basée sur les biomarqueurs et données cliniques
        </p>
      </div>

      {/* Analysis Type Selection */}
      <div className="card">
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Type d'Analyse</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setAnalysisType('simple')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors flex-1 sm:flex-none ${
              analysisType === 'simple'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="hidden sm:inline">Analyse Simple</span>
            <span className="sm:hidden">Simple</span>
          </button>
          <button
            onClick={() => setAnalysisType('complete')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors flex-1 sm:flex-none ${
              analysisType === 'complete'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="hidden sm:inline">Analyse Complète</span>
            <span className="sm:hidden">Complète</span>
          </button>
        </div>

        {/* Sélection des données de test */}
        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mt-4">
          <h3 className="text-xs md:text-sm font-medium text-blue-900 mb-3">Charger des données de test</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => loadPatientData('criticalPatient')}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Patient Critique
            </button>
            <button
              onClick={() => loadPatientData('stablePatient')}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Patient Stable
            </button>
            <button
              onClick={() => loadPatientData('septicShockPatient')}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Choc Septique
            </button>
            <button
              onClick={() => loadPatientData('survivorPatient')}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
            >
              Survivant
            </button>
            <button
              onClick={() => loadPatientData('mixedProfilePatient')}
              className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
            >
              Profil Mixte
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Biomarkers Form */}
            <div className="card">
              <BiomarkersForm
                biomarkers={biomarkers}
                onChange={handleBiomarkersChange}
              />
            </div>

            {/* Clinical Texts - Only for complete analysis */}
            {analysisType === 'complete' && (
              <div className="card">
                <ClinicalTextsForm
                  clinicalTexts={clinicalTexts}
                  onChange={handleClinicalTextsChange}
                />
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
            <div className="card bg-red-50 border-red-200 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="card bg-blue-50 border-blue-200">
              <div className="text-center">
                <Heart className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune prédiction
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Remplissez les biomarqueurs{analysisType === 'complete' ? ' et les données cliniques' : ''} puis lancez l'analyse pour voir les résultats.
                </p>
                <div className="text-xs text-gray-500">
                  💡 Assurez-vous que l'API ChirurgIA est démarrée sur http://localhost:8000
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Header avec statut principal */}
              <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <Heart className="h-6 w-6 text-blue-600 mr-2" />
                      Résultats de la Prédiction
                    </h3>
                    <p className="text-gray-600 mt-1">Analyse {analysisType === 'simple' ? 'simple' : 'complète'} terminée</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      (result.prediction === 'SURVIVAL' || result.prediction === 'Survived') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(result.prediction === 'SURVIVAL' || result.prediction === 'Survived') ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Survie Prédite
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Risque Élevé
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Métriques principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Probabilité de Survie</p>
                      <p className="text-2xl font-bold text-green-600">
                        {(result.probability_survival * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Probabilité de Décès</p>
                      <p className="text-2xl font-bold text-red-600">
                        {(result.probability_death * 100).toFixed(1)}%
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Niveau de Risque</p>
                      <p className={`text-2xl font-bold ${getRiskTextColor(result.risk_level)}`}>
                        {translateRiskLevel(result.risk_level)}
                      </p>
                    </div>
                    <Gauge className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Graphique principal */}
              <div className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Visualisation des Probabilités
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Graphique en secteurs */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Répartition des Probabilités</h5>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Survie', value: result.probability_survival * 100, color: '#10b981' },
                            { name: 'Décès', value: result.probability_death * 100, color: '#ef4444' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
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

                  {/* Graphique en barres radiales */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Indicateur de Risque</h5>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadialBarChart 
                        cx="50%" 
                        cy="50%" 
                        innerRadius="30%" 
                        outerRadius="90%" 
                        data={[
                          { 
                            name: 'Risque', 
                            value: result.probability_death * 100,
                            fill: result.probability_death > 0.5 ? '#ef4444' : result.probability_death > 0.3 ? '#f59e0b' : '#10b981'
                          }
                        ]}
                      >
                        <RadialBar dataKey="value" cornerRadius={10} />
                        <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Risque de Décès']} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {analysisType === 'complete' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Facteurs de risque */}
                  {'risk_factors' in result && result.risk_factors && (
                    <div className="card">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        Facteurs de Risque
                      </h4>
                      <div className="space-y-3">
                        {result.risk_factors.map((factor, index) => (
                          <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-red-800">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommandations */}
                  {'recommendations' in result && result.recommendations && (
                    <div className="card">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 text-blue-600 mr-2" />
                        Recommandations
                      </h4>
                      <div className="space-y-3">
                        {result.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-blue-800">{recommendation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Informations techniques */}
              <div className="card bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Temps de traitement: {(result as any).processing_time ? (result as any).processing_time.toFixed(2) + 's' : 'N/A'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="h-4 w-4 mr-1" />
                    Type: {analysisType === 'simple' ? 'Analyse Simple' : 'Analyse Complète'}
                  </div>
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

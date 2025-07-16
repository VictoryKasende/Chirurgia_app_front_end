import { useState, useEffect } from 'react';
import { Users, Clock, AlertCircle, TrendingUp, Shield, Eye, AlertTriangle, CheckCircle2, Zap, Target, RotateCcw } from 'lucide-react';
import { chirurgiaApi } from '../services/api';
import type { Biomarkers, ClinicalTexts, ClusteringResponse } from '../types/api';
import BiomarkersForm from './BiomarkersForm';
import ClinicalTextsForm from './ClinicalTextsForm';
import { testPatients } from '../data/testData';

const ClusteringAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClusteringResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [biomarkers, setBiomarkers] = useState<Biomarkers>(testPatients.survivorPatient.biomarkers);
  const [clinicalTexts, setClinicalTexts] = useState<ClinicalTexts>(testPatients.survivorPatient.clinical_texts);

  // Charger des données de test par défaut au chargement
  useEffect(() => {
    setBiomarkers(testPatients.survivorPatient.biomarkers);
    setClinicalTexts(testPatients.survivorPatient.clinical_texts);
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
    const upperSeverity = severity?.toUpperCase() || '';
    // Support both English and French risk levels
    switch (upperSeverity) {
      case 'LOW': 
      case 'FAIBLE': 
        return 'text-green-600 bg-green-100';
      case 'MEDIUM': 
      case 'MOYEN':
      case 'MOYENNE': 
        return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': 
      case 'ÉLEVÉ':
      case 'ELEVÉ':
      case 'HAUT': 
        return 'text-red-600 bg-red-100';
      case 'CRITICAL': 
      case 'CRITIQUE':
        return 'text-red-800 bg-red-200';
      default: 
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getMonitoringIcon = (level: string) => {
    const lowerLevel = level?.toLowerCase() || '';
    switch (lowerLevel) {
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

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-3" />
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Analyse de Clustering</h1>
        </div>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Classification intelligente des patients survivants pour optimiser la surveillance et personnaliser les soins
        </p>
      </div>

      {/* Sélection des données de test */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
          <h3 className="text-base md:text-lg font-semibold text-blue-900">Données de test disponibles</h3>
        </div>
        <p className="text-xs md:text-sm text-blue-700 mb-4">
          Sélectionnez un profil de patient pour pré-remplir les formulaires avec des données réalistes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
          <button
            onClick={() => loadPatientData('criticalPatient')}
            className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-lg font-medium hover:from-red-200 hover:to-red-300 transition-all duration-200 shadow-sm flex items-center justify-center space-x-1 md:space-x-2"
          >
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Patient Critique</span>
          </button>
          <button
            onClick={() => loadPatientData('stablePatient')}
            className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-lg font-medium hover:from-green-200 hover:to-green-300 transition-all duration-200 shadow-sm flex items-center justify-center space-x-1 md:space-x-2"
          >
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Patient Stable</span>
          </button>
          <button
            onClick={() => loadPatientData('septicShockPatient')}
            className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-lg font-medium hover:from-red-200 hover:to-red-300 transition-all duration-200 shadow-sm flex items-center justify-center space-x-1 md:space-x-2"
          >
            <Zap className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Choc Septique</span>
          </button>
          <button
            onClick={() => loadPatientData('survivorPatient')}
            className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-lg font-medium hover:from-green-200 hover:to-green-300 transition-all duration-200 shadow-sm flex items-center justify-center space-x-1 md:space-x-2"
          >
            <Target className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Survivant</span>
          </button>
          <button
            onClick={() => loadPatientData('mixedProfilePatient')}
            className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-lg font-medium hover:from-yellow-200 hover:to-yellow-300 transition-all duration-200 shadow-sm flex items-center justify-center space-x-1 md:space-x-2"
          >
            <RotateCcw className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Profil Mixte</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Form */}
        <div className="xl:col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Biomarkers Form */}
            <div className="card shadow-lg border-l-4 border-medical-500">
              <BiomarkersForm
                biomarkers={biomarkers}
                onChange={handleBiomarkersChange}
              />
            </div>

            {/* Clinical Texts Form */}
            <div className="card shadow-lg border-l-4 border-green-500">
              <ClinicalTextsForm
                clinicalTexts={clinicalTexts}
                onChange={handleClinicalTextsChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin h-5 w-5 mr-2" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5 mr-2" />
                    Analyser le Clustering
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="xl:col-span-1">
          {error && (
            <div className="card bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <h4 className="font-semibold text-red-800">Erreur</h4>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 text-center">
              <div className="py-8">
                <Users className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  En attente d'analyse
                </h3>
                <p className="text-blue-700 mb-4">
                  Remplissez les données patient et lancez l'analyse de clustering pour découvrir le groupe de patients similaires.
                </p>
                <div className="bg-blue-100 rounded-lg p-4 text-sm text-blue-800">
                  <div className="font-semibold mb-2">💡 Analyse de Clustering</div>
                  <div className="text-left space-y-1">
                    <div>• Classification automatique des patients</div>
                    <div>• Score de criticité personnalisé</div>
                    <div>• Recommandations de surveillance</div>
                    <div>• Comparaison avec patients similaires</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Cluster Information */}
              <div className="card bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-bold text-green-900">Classification Patient</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      Cluster {result.cluster}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {result.cluster_name}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      👥 {result.similar_patients_count} patients similaires
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm font-medium text-gray-700 mb-1">Score de criticité</div>
                      <div className={`text-2xl font-bold ${getCriticalityColor(result.criticality_score)}`}>
                        {result.criticality_score != null ? result.criticality_score.toFixed(1) : '0'}%
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                      <div className="text-sm font-medium text-gray-700 mb-1">Niveau de sévérité</div>
                      <div className={`text-lg font-bold px-2 py-1 rounded-md ${getSeverityColor(result.severity_level)}`}>
                        {result.severity_level}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitoring Level */}
              <div className="card bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-200">
                <div className="flex items-center mb-3">
                  {getMonitoringIcon(result.monitoring_level) && (
                    <div className="mr-2">
                      {(() => {
                        const IconComponent = getMonitoringIcon(result.monitoring_level);
                        return <IconComponent className="h-5 w-5 text-blue-600" />;
                      })()}
                    </div>
                  )}
                  <h4 className="font-semibold text-blue-900">Surveillance Recommandée</h4>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg font-bold text-blue-800 capitalize">
                    {result.monitoring_level}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Adaptation de la surveillance selon le profil patient
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="card bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200">
                  <div className="flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-purple-900">Recommandations</h4>
                  </div>
                  <div className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <div className="text-sm text-gray-700 flex-1">
                            {recommendation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Time */}
              <div className="card bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Temps de traitement</span>
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

export default ClusteringAnalysis;

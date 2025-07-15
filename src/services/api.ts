import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  PatientData,
  Biomarkers,
  MortalityPredictionResponse,
  MortalitySimpleResponse,
  DeathCauseResponse,
  ClusteringResponse,
  CompleteAnalysisResponse
} from '../types/api';

class ChirurgiaApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:8000';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour gérer les erreurs
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          throw new ApiError(error.response.data.detail || 'Erreur API', error.response.status);
        }
        throw new ApiError('Erreur de connexion à l\'API', 500);
      }
    );
  }

  /**
   * Prédiction de mortalité complète avec biomarqueurs + données textuelles
   */
  async predictMortality(patientData: PatientData): Promise<MortalityPredictionResponse> {
    try {
      const response: AxiosResponse<MortalityPredictionResponse> = await this.api.post(
        '/predict/mortality',
        patientData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la prédiction de mortalité:', error);
      throw error;
    }
  }

  /**
   * Prédiction de mortalité simple avec biomarqueurs uniquement
   */
  async predictMortalitySimple(biomarkers: Biomarkers): Promise<MortalitySimpleResponse> {
    try {
      const response: AxiosResponse<MortalitySimpleResponse> = await this.api.post(
        '/predict/mortality-simple',
        biomarkers
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la prédiction de mortalité simple:', error);
      throw error;
    }
  }

  /**
   * Analyse des causes de décès
   */
  async predictDeathCause(patientData: PatientData): Promise<DeathCauseResponse> {
    try {
      const response: AxiosResponse<DeathCauseResponse> = await this.api.post(
        '/predict/death-cause',
        patientData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'analyse des causes de décès:', error);
      throw error;
    }
  }

  /**
   * Clustering des survivants
   */
  async analyzeClustering(patientData: PatientData): Promise<ClusteringResponse> {
    try {
      const response: AxiosResponse<ClusteringResponse> = await this.api.post(
        '/analyze/clustering',
        patientData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors du clustering:', error);
      throw error;
    }
  }

  /**
   * Analyse complète intégrée
   */
  async analyzeComplete(patientData: PatientData): Promise<CompleteAnalysisResponse> {
    try {
      const response: AxiosResponse<CompleteAnalysisResponse> = await this.api.post(
        '/analyze/complete',
        patientData
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'analyse complète:', error);
      throw error;
    }
  }

  /**
   * Test de connexion à l'API
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.api.get('/health');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtenir les métriques de l'API
   */
  async getMetrics(): Promise<any> {
    try {
      const response = await this.api.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des métriques:', error);
      throw error;
    }
  }
}

// Erreur personnalisée pour l'API
class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Instance singleton
export const chirurgiaApi = new ChirurgiaApiService();
export { ApiError };
export default ChirurgiaApiService;

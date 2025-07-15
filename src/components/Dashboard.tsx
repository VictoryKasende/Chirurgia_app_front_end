import React, { useState, useEffect } from 'react';
import { Heart, Activity, Users, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardStats {
  totalPredictions: number;
  highRiskPatients: number;
  averageProcessingTime: number;
  successRate: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPredictions: 0,
    highRiskPatients: 0,
    averageProcessingTime: 0,
    successRate: 0,
  });

  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);

  useEffect(() => {
    // Simuler le chargement des statistiques
    setStats({
      totalPredictions: 1247,
      highRiskPatients: 89,
      averageProcessingTime: 1.2,
      successRate: 94.7,
    });

    // Simuler des analyses récentes
    setRecentAnalyses([
      {
        id: 1,
        type: 'Mortalité',
        risk: 'HIGH',
        time: '2 min',
        patient: 'Patient-001',
      },
      {
        id: 2,
        type: 'Clustering',
        risk: 'MEDIUM',
        time: '5 min',
        patient: 'Patient-002',
      },
      {
        id: 3,
        type: 'Analyse Complète',
        risk: 'LOW',
        time: '8 min',
        patient: 'Patient-003',
      },
    ]);
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="card">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'text-red-600 bg-red-100';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100';
      case 'LOW':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord ChirurgIA</h1>
        <p className="text-gray-600">
          Vue d'ensemble de l'activité de prédiction et d'analyse
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Prédictions"
          value={stats.totalPredictions.toLocaleString()}
          icon={Activity}
          color="bg-medical-600"
        />
        <StatCard
          title="Patients à Haut Risque"
          value={stats.highRiskPatients}
          icon={AlertTriangle}
          color="bg-red-600"
        />
        <StatCard
          title="Temps Moyen"
          value={`${stats.averageProcessingTime}s`}
          icon={Clock}
          color="bg-blue-600"
        />
        <StatCard
          title="Taux de Réussite"
          value={`${stats.successRate}%`}
          icon={TrendingUp}
          color="bg-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-600 hover:bg-medical-700 transition-colors">
                <Heart className="h-4 w-4 mr-2" />
                Nouvelle Prédiction
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Activity className="h-4 w-4 mr-2" />
                Analyse Complète
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Users className="h-4 w-4 mr-2" />
                Clustering
              </button>
            </div>
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Analyses Récentes
            </h3>
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {analysis.type}
                      </p>
                      <p className="text-sm text-gray-500">{analysis.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`risk-indicator ${getRiskColor(analysis.risk)}`}
                    >
                      {analysis.risk}
                    </span>
                    <span className="text-sm text-gray-500">{analysis.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          État du Système
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">API ChirurgIA</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Base de Données</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Modèles ML</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

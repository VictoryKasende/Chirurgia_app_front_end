import { useState } from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import MortalityPrediction from './components/MortalityPrediction';
import CompleteAnalysis from './components/CompleteAnalysis';
import ClusteringAnalysis from './components/ClusteringAnalysis';
import TestComponent from './components/TestComponent';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'mortality':
        return <MortalityPrediction />;
      case 'analysis':
        return <CompleteAnalysis />;
      case 'clustering':
        return <ClusteringAnalysis />;
      case 'test':
        return <TestComponent />;
      default:
        return <Dashboard />;
    }
  };

  // Test simple pour déboguer
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">ChirurgIA App - Test</h1>
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => setCurrentPage('test')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Component
          </button>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('mortality')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Mortalité
          </button>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

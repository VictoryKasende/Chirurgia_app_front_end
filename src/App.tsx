import { useState } from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import MortalityPrediction from './components/MortalityPrediction';
import CompleteAnalysis from './components/CompleteAnalysis';
import ClusteringAnalysis from './components/ClusteringAnalysis';

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

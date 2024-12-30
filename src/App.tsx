import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import TopNavigation from './components/navigation/TopNavigation';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 max-w-[425px] mx-auto">
          <header className="bg-emerald-400 p-3 text-white text-center">
            <h1 className="text-lg font-bold tracking-wide">
              IOT BASED HOUSE WATER FLOW RATE, TURBIDITY, TDS LEVEL AND PH LEVEL MONITORING SYSTEM
            </h1>
          </header>
          <TopNavigation />
          <main className="p-4">
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

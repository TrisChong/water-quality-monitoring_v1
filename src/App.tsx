import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <header className="bg-emerald-400 p-4 text-white text-center">
              <h1 className="text-xl font-bold tracking-wide">
                IOT BASED HOUSE WATER FLOW RATE, TURBIDITY, TDS LEVEL AND PH LEVEL MONITORING SYSTEM
              </h1>
            </header>
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
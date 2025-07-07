import React, { useState, useEffect } from 'react';
import { DollarSign, Github, ExternalLink, Sparkles, TrendingUp, Banknote, CreditCard, Building2, Calculator } from 'lucide-react';
import LoginPage from './components/LoginPage';
import LoanPredictor from './components/LoanPredictor';
import LoanHistory from './components/LoanHistory';
import StatsCard from './components/StatsCard';
import { LoanApplication } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'predictor' | 'history'>('predictor');

  // Check for existing authentication
  useEffect(() => {
    const authStatus = localStorage.getItem('loanai_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load applications from localStorage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedApplications = localStorage.getItem('loanApplications');
      if (savedApplications) {
        try {
          const parsedApplications = JSON.parse(savedApplications).map((app: any) => ({
            ...app,
            timestamp: new Date(app.timestamp)
          }));
          setApplications(parsedApplications);
        } catch (error) {
          console.error('Error parsing saved applications:', error);
        }
      }
    }
  }, [isAuthenticated]);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('loanApplications', JSON.stringify(applications));
    }
  }, [applications, isAuthenticated]);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In a real app, this would validate against a server
    setIsAuthenticated(true);
    localStorage.setItem('loanai_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('loanai_authenticated');
  };

  const handleApplicationComplete = (application: LoanApplication) => {
    setApplications(prev => [application, ...prev]);
  };

  const handleClearHistory = () => {
    setApplications([]);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      {/* Enhanced Background with Realistic Financial Images */}
      <div className="fixed inset-0 z-0">
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Realistic Cash Bills - Scattered Naturally */}
        <div className="absolute inset-0">
          {/* $100 Bills */}
          <div className="absolute top-20 left-16 w-32 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md border border-green-300 transform rotate-12 opacity-40">
            <div className="p-2 flex items-center justify-between">
              <div className="text-green-800 text-xs font-bold">$100</div>
              <div className="w-6 h-6 bg-green-600 rounded-full opacity-30"></div>
            </div>
            <div className="px-2 text-green-700 text-xs">FEDERAL RESERVE NOTE</div>
          </div>
          
          <div className="absolute top-40 right-32 w-28 h-14 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg shadow-md border border-emerald-300 transform -rotate-6 opacity-35">
            <div className="p-2 flex items-center justify-between">
              <div className="text-emerald-800 text-xs font-bold">$50</div>
              <div className="w-5 h-5 bg-emerald-600 rounded-full opacity-30"></div>
            </div>
            <div className="px-2 text-emerald-700 text-xs">FIFTY DOLLARS</div>
          </div>
          
          <div className="absolute bottom-32 left-24 w-26 h-13 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg shadow-md border border-teal-300 transform rotate-3 opacity-30">
            <div className="p-1 flex items-center justify-between">
              <div className="text-teal-800 text-xs font-bold">$20</div>
              <div className="w-4 h-4 bg-teal-600 rounded-full opacity-30"></div>
            </div>
            <div className="px-1 text-teal-700 text-xs">TWENTY</div>
          </div>

          <div className="absolute top-60 left-1/3 w-24 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md border border-green-300 transform -rotate-8 opacity-25">
            <div className="p-1 flex items-center justify-between">
              <div className="text-green-800 text-xs font-bold">$10</div>
              <div className="w-3 h-3 bg-green-600 rounded-full opacity-30"></div>
            </div>
            <div className="px-1 text-green-700 text-xs">TEN</div>
          </div>

          {/* Additional scattered bills */}
          <div className="absolute bottom-60 right-20 w-20 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-sm border border-blue-300 transform rotate-15 opacity-20">
            <div className="p-1 text-blue-800 text-xs font-bold">$5</div>
          </div>

          <div className="absolute top-1/3 right-1/3 w-18 h-9 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm border border-gray-300 transform -rotate-12 opacity-15">
            <div className="p-1 text-gray-800 text-xs font-bold">$1</div>
          </div>
        </div>

        {/* Realistic Coins */}
        <div className="absolute inset-0">
          {/* Quarter stacks */}
          <div className="absolute top-1/4 left-1/4 opacity-25">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full shadow-sm border border-yellow-500"
                style={{
                  bottom: `${i * 2}px`,
                  left: `${i * 0.5}px`,
                  transform: `rotate(${i * 2}deg)`
                }}
              ></div>
            ))}
          </div>

          {/* Penny stacks */}
          <div className="absolute bottom-1/4 right-1/4 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"
                style={{
                  bottom: `${i * 1.5}px`,
                  left: `${i * 0.3}px`,
                }}
              ></div>
            ))}
          </div>

          {/* Individual coins scattered */}
          <div className="absolute top-1/2 left-20 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full shadow-md border-2 border-yellow-500 opacity-30"></div>
          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-md border border-gray-500 opacity-25"></div>
          <div className="absolute top-2/3 right-1/3 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-md border-2 border-yellow-600 opacity-20"></div>
        </div>

        {/* Enhanced Currency Symbols */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-1/4 text-green-300 text-6xl font-light opacity-15 transform rotate-12">$</div>
          <div className="absolute bottom-40 right-1/4 text-emerald-300 text-5xl font-light opacity-12 transform -rotate-6">€</div>
          <div className="absolute top-1/2 right-20 text-teal-300 text-4xl font-light opacity-10 transform rotate-8">£</div>
          <div className="absolute bottom-1/4 left-1/3 text-blue-300 text-3xl font-light opacity-8 transform -rotate-15">¥</div>
        </div>

        {/* Realistic Bank Buildings with Details */}
        <div className="absolute bottom-0 left-0 w-full h-40 opacity-25">
          {/* Main bank building with classical architecture */}
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-gradient-to-t from-slate-500 to-slate-400 rounded-t-lg shadow-xl">
            {/* Bank columns */}
            <div className="absolute bottom-0 left-2 w-1 h-full bg-white opacity-60"></div>
            <div className="absolute bottom-0 left-6 w-1 h-full bg-white opacity-60"></div>
            <div className="absolute bottom-0 left-10 w-1 h-full bg-white opacity-60"></div>
            <div className="absolute bottom-0 right-10 w-1 h-full bg-white opacity-60"></div>
            <div className="absolute bottom-0 right-6 w-1 h-full bg-white opacity-60"></div>
            <div className="absolute bottom-0 right-2 w-1 h-full bg-white opacity-60"></div>
            
            {/* Bank sign */}
            <div className="absolute top-2 left-2 right-2 h-3 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">BANK</span>
            </div>
            
            {/* Windows */}
            <div className="absolute top-8 left-2 right-2 grid grid-cols-5 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-yellow-300 rounded-sm opacity-70"></div>
              ))}
            </div>
            
            {/* Entrance */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg">
              <div className="absolute top-1 left-1 right-1 h-1 bg-yellow-400 rounded"></div>
            </div>
          </div>
          
          {/* Modern office building */}
          <div className="absolute bottom-0 left-56 w-24 h-28 bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-lg shadow-lg">
            <div className="absolute top-3 left-1 right-1 grid grid-cols-4 gap-1">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1 h-2 bg-blue-300 rounded-sm opacity-60"></div>
              ))}
            </div>
            <div className="absolute top-1 left-2 right-2 h-1 bg-red-400 rounded"></div>
          </div>
          
          {/* Credit union building */}
          <div className="absolute bottom-0 right-20 w-20 h-24 bg-gradient-to-t from-slate-500 to-slate-400 rounded-t-lg shadow-md">
            <div className="absolute top-2 left-1 right-1 grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-2 bg-green-300 rounded-sm opacity-50"></div>
              ))}
            </div>
            <div className="absolute top-1 left-1 right-1 h-1 bg-green-500 rounded"></div>
          </div>

          {/* ATM machine */}
          <div className="absolute bottom-0 right-48 w-6 h-12 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t shadow-md">
            <div className="absolute top-1 left-1 right-1 h-2 bg-black rounded-sm opacity-80"></div>
            <div className="absolute top-4 left-1 right-1 h-1 bg-green-400 rounded"></div>
          </div>
        </div>

        {/* Floating Financial Icons with Realistic Styling */}
        <div className="absolute top-24 right-24 w-20 h-20 border-2 border-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '4s' }}>
          <div className="absolute inset-4 bg-green-100 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
        
        <div className="absolute bottom-24 left-32 w-16 h-16 bg-emerald-100 rounded-lg opacity-15 animate-pulse" style={{ animationDuration: '6s' }}>
          <div className="flex items-center justify-center h-full">
            <CreditCard className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="absolute top-1/3 right-1/4 w-18 h-18 border border-teal-200 rounded-full opacity-25 animate-pulse" style={{ animationDuration: '5s' }}>
          <div className="absolute inset-3 bg-teal-100 rounded-full flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal-600" />
          </div>
        </div>

        {/* Credit Cards Scattered */}
        <div className="absolute top-1/4 right-1/4 w-16 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md transform rotate-12 opacity-30">
          <div className="p-1">
            <div className="w-3 h-2 bg-yellow-400 rounded-sm"></div>
            <div className="mt-1 text-white text-xs font-bold">VISA</div>
          </div>
        </div>

        <div className="absolute bottom-1/3 left-1/4 w-16 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md transform -rotate-8 opacity-25">
          <div className="p-1">
            <div className="w-3 h-2 bg-yellow-400 rounded-sm"></div>
            <div className="mt-1 text-white text-xs font-bold">CARD</div>
          </div>
        </div>

        {/* Financial Documents */}
        <div className="absolute top-1/2 left-10 w-12 h-16 bg-white rounded shadow-sm border border-gray-200 transform rotate-6 opacity-20">
          <div className="p-1">
            <div className="w-full h-1 bg-gray-300 rounded mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-300 rounded mb-1"></div>
            <div className="w-1/2 h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Header with natural styling */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-md">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  LoanAI Pro
                </h1>
                <p className="text-sm text-gray-600 font-medium">Smart Loan Eligibility Assessment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">AI Active</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md font-medium"
              >
                Logout
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Natural navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('predictor')}
              className={`py-4 px-6 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === 'predictor'
                  ? 'border-green-500 text-green-700 bg-green-50'
                  : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <span>Loan Predictor</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === 'history'
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                  : 'border-transparent text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>History ({applications.length})</span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-8">
        {/* Stats */}
        <StatsCard applications={applications} />

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'predictor' ? (
            <LoanPredictor onApplicationComplete={handleApplicationComplete} />
          ) : (
            <LoanHistory applications={applications} onClearHistory={handleClearHistory} />
          )}
        </div>
      </main>

      {/* Natural footer */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-800">LoanAI Pro</span>
            </div>
            <p className="text-gray-600 mb-2">
              Built with React, TypeScript, and Machine Learning for intelligent loan assessment.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 LoanAI Pro. Empowering financial decisions with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
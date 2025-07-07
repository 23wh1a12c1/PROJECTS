import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Loader2, Calculator, CreditCard, User } from 'lucide-react';
import { predictLoanEligibility } from '../utils/loanPredictor';
import { LoanApplication } from '../types';

interface LoanPredictorProps {
  onApplicationComplete: (application: LoanApplication) => void;
}

export default function LoanPredictor({ onApplicationComplete }: LoanPredictorProps) {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    education: 'Graduate',
    employment: 'Salaried',
    creditScore: '',
    loanAmount: '',
    loanTerm: '',
    propertyArea: 'Urban',
    dependents: '0',
    married: 'Yes'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastResult, setLastResult] = useState<LoanApplication | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    // Validate required fields
    const requiredFields = ['age', 'income', 'creditScore', 'loanAmount', 'loanTerm'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const prediction = predictLoanEligibility(formData);
    
    const application: LoanApplication = {
      id: Date.now().toString(),
      ...formData,
      age: parseInt(formData.age),
      income: parseFloat(formData.income),
      creditScore: parseInt(formData.creditScore),
      loanAmount: parseFloat(formData.loanAmount),
      loanTerm: parseInt(formData.loanTerm),
      isApproved: prediction.isApproved,
      confidence: prediction.confidence,
      riskScore: prediction.riskScore,
      timestamp: new Date(),
      factors: prediction.factors
    };
    
    setLastResult(application);
    onApplicationComplete(application);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setFormData({
      age: '',
      income: '',
      education: 'Graduate',
      employment: 'Salaried',
      creditScore: '',
      loanAmount: '',
      loanTerm: '',
      propertyArea: 'Urban',
      dependents: '0',
      married: 'Yes'
    });
    setLastResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Loan Predictor</h2>
              <p className="text-green-100">Advanced machine learning for loan eligibility assessment</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <User className="w-5 h-5 text-green-600" />
              <span>Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter age"
                  min="18"
                  max="80"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Annual Income *
                </label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Annual income ($)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Credit Score *
                </label>
                <input
                  type="number"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Credit score"
                  min="300"
                  max="850"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Education</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="Graduate">Graduate</option>
                  <option value="Not Graduate">Not Graduate</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Employment</label>
                <select
                  name="employment"
                  value={formData.employment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <select
                  name="married"
                  value={formData.married}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="Yes">Married</option>
                  <option value="No">Single</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>Loan Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Loan Amount *
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Loan amount ($)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Loan Term *
                </label>
                <input
                  type="number"
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Term (months)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Property Area</label>
                <select
                  name="propertyArea"
                  value={formData.propertyArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="Urban">Urban</option>
                  <option value="Semiurban">Semi-urban</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Dependents</label>
                <select
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handlePredict}
              disabled={isAnalyzing}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-md"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Application...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span>Predict Loan Eligibility</span>
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Clear Form
            </button>
          </div>

          {/* Results */}
          {lastResult && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-lg ${
                  lastResult.isApproved 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {lastResult.isApproved ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <AlertTriangle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    lastResult.isApproved ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {lastResult.isApproved ? 'Loan Approved' : 'Loan Rejected'}
                  </h3>
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Calculator className="w-4 h-4" />
                    <span>Confidence: {lastResult.confidence}%</span>
                  </p>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>AI Confidence Level</span>
                  <span>{lastResult.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      lastResult.isApproved 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${lastResult.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Risk Score */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Risk Assessment</span>
                  <span>{lastResult.riskScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-1000"
                    style={{ width: `${lastResult.riskScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Key Factors */}
              {lastResult.factors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Decision Factors:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lastResult.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
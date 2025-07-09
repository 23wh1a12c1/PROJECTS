import React, { useState } from 'react';
import { Calculator, User, DollarSign, GraduationCap, CreditCard, Home, Users, CheckCircle, XCircle } from 'lucide-react';

interface FormData {
  age: string;
  income: string;
  education: string;
  creditScore: string;
  loanAmount: string;
  loanTerm: string;
  employmentType: string;
  dependents: string;
  propertyArea: string;
  existingLoan: string;
}

interface PredictionResult {
  approved: boolean;
  confidence: number;
  factors: string[];
}

const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    income: '',
    education: 'Graduate',
    creditScore: '',
    loanAmount: '',
    loanTerm: '',
    employmentType: 'Salaried',
    dependents: '0',
    propertyArea: 'Urban',
    existingLoan: 'No'
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrediction = (): PredictionResult => {
    const age = parseInt(formData.age);
    const income = parseFloat(formData.income);
    const creditScore = parseInt(formData.creditScore);
    const loanAmount = parseFloat(formData.loanAmount);
    const loanTerm = parseInt(formData.loanTerm);
    const dependents = parseInt(formData.dependents);

    let score = 0;
    const factors: string[] = [];

    // Age factor (25-60 is ideal)
    if (age >= 25 && age <= 60) {
      score += 15;
      factors.push('Optimal age range');
    } else if (age < 25) {
      score -= 10;
      factors.push('Young age may affect approval');
    } else {
      score -= 5;
      factors.push('Advanced age consideration');
    }

    // Income factor
    if (income >= 50000) {
      score += 25;
      factors.push('Strong income level');
    } else if (income >= 30000) {
      score += 15;
      factors.push('Moderate income level');
    } else {
      score -= 15;
      factors.push('Low income may affect approval');
    }

    // Credit score factor
    if (creditScore >= 750) {
      score += 30;
      factors.push('Excellent credit score');
    } else if (creditScore >= 650) {
      score += 20;
      factors.push('Good credit score');
    } else if (creditScore >= 550) {
      score += 5;
      factors.push('Fair credit score');
    } else {
      score -= 20;
      factors.push('Poor credit score');
    }

    // Loan to income ratio
    const loanToIncomeRatio = loanAmount / income;
    if (loanToIncomeRatio <= 3) {
      score += 15;
      factors.push('Favorable loan-to-income ratio');
    } else if (loanToIncomeRatio <= 5) {
      score += 5;
      factors.push('Moderate loan-to-income ratio');
    } else {
      score -= 15;
      factors.push('High loan-to-income ratio');
    }

    // Education factor
    if (formData.education === 'Graduate') {
      score += 10;
      factors.push('Graduate education');
    }

    // Employment type
    if (formData.employmentType === 'Salaried') {
      score += 10;
      factors.push('Stable salaried employment');
    } else {
      score += 5;
      factors.push('Self-employed status');
    }

    // Dependents factor
    if (dependents <= 2) {
      score += 5;
      factors.push('Manageable dependents');
    } else {
      score -= 5;
      factors.push('High number of dependents');
    }

    // Property area
    if (formData.propertyArea === 'Urban') {
      score += 5;
      factors.push('Urban property location');
    }

    // Existing loan
    if (formData.existingLoan === 'No') {
      score += 10;
      factors.push('No existing loans');
    } else {
      score -= 10;
      factors.push('Existing loan obligations');
    }

    const approved = score >= 50;
    const confidence = Math.min(Math.max((score / 100) * 100, 10), 95);

    return {
      approved,
      confidence: Math.round(confidence),
      factors: factors.slice(0, 5) // Top 5 factors
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = calculatePrediction();
    setPrediction(result);
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      age: '',
      income: '',
      education: 'Graduate',
      creditScore: '',
      loanAmount: '',
      loanTerm: '',
      employmentType: 'Salaried',
      dependents: '0',
      propertyArea: 'Urban',
      existingLoan: 'No'
    });
    setPrediction(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Loan Eligibility Predictor</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Get instant predictions on your loan approval chances using advanced ML algorithms
          </p>
        </div>

        <div className="p-8">
          {!prediction ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="18"
                      max="80"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Graduate">Graduate</option>
                      <option value="Not Graduate">Not Graduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Salaried">Salaried</option>
                      <option value="Self Employed">Self Employed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
                    <select
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </select>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Financial Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($)</label>
                    <input
                      type="number"
                      name="income"
                      value={formData.income}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter annual income"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
                    <input
                      type="number"
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      required
                      min="300"
                      max="850"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter credit score (300-850)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount ($)</label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      min="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter requested loan amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (months)</label>
                    <select
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select loan term</option>
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                      <option value="84">84 months</option>
                      <option value="120">120 months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Home className="w-4 h-4 text-purple-600" />
                    Property Area
                  </label>
                  <select
                    name="propertyArea"
                    value={formData.propertyArea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="Urban">Urban</option>
                    <option value="Semiurban">Semi-urban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-red-600" />
                    Existing Loan
                  </label>
                  <select
                    name="existingLoan"
                    value={formData.existingLoan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Predict Loan Eligibility
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-full text-xl font-semibold ${
                prediction.approved 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {prediction.approved ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
                {prediction.approved ? 'Loan Approved!' : 'Loan Not Approved'}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Prediction Confidence</h3>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ${
                        prediction.approved ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                  <span className="absolute right-0 top-6 text-sm font-medium text-gray-600">
                    {prediction.confidence}%
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Key Factors Considered
                </h3>
                <ul className="space-y-2">
                  {prediction.factors.map((factor, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={resetForm}
                className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Check Another Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
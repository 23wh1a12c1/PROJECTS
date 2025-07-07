import React, { useState, useEffect } from 'react';
import { DollarSign, Lock, User, Eye, EyeOff, Shield, RefreshCw, CheckCircle, AlertTriangle, Sparkles, Building2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Generate random captcha code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptchaInput(e.target.value);
    setCaptchaError('');
  };

  const validateCaptcha = () => {
    return captchaInput.toLowerCase() === captchaCode.toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateCaptcha()) {
      setCaptchaError('Invalid captcha code. Please try again.');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple validation (in real app, this would be server-side)
    if (formData.username === 'admin' && formData.password === 'password123') {
      onLogin({ username: formData.username, password: formData.password });
    } else {
      setError('Invalid username or password');
      generateCaptcha();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0">
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Financial elements */}
        <div className="absolute inset-0">
          {/* Floating money symbols */}
          <div className="absolute top-20 left-20 text-green-200 text-4xl font-light opacity-30 animate-pulse">$</div>
          <div className="absolute bottom-32 right-32 text-emerald-200 text-3xl font-light opacity-25 animate-pulse" style={{ animationDelay: '1s' }}>€</div>
          <div className="absolute top-1/2 right-20 text-teal-200 text-2xl font-light opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>£</div>
          
          {/* Bank building silhouettes */}
          <div className="absolute bottom-0 left-0 w-full h-32 opacity-15">
            <div className="absolute bottom-0 left-10 w-16 h-24 bg-gradient-to-t from-green-300 to-green-200 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-32 w-20 h-28 bg-gradient-to-t from-emerald-300 to-emerald-200 rounded-t-lg"></div>
            <div className="absolute bottom-0 right-32 w-18 h-26 bg-gradient-to-t from-teal-300 to-teal-200 rounded-t-lg"></div>
            <div className="absolute bottom-0 right-10 w-14 h-22 bg-gradient-to-t from-green-300 to-green-200 rounded-t-lg"></div>
          </div>

          {/* Floating icons */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-green-200 rounded-full opacity-20 animate-pulse flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-emerald-100 rounded-lg opacity-15 animate-pulse flex items-center justify-center">
            <Building2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">LoanAI Pro</h1>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Secure Banking Portal</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Sign in to access your loan management dashboard</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-semibold">Secure Login</h2>
                  <p className="text-green-100 text-sm">Protected by advanced security</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Captcha Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Security Verification</span>
                </label>
                
                {/* Captcha Display */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-lg p-4 font-mono text-xl font-bold text-center tracking-wider select-none relative overflow-hidden">
                    {/* Captcha background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm5 5v10h10V5H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}></div>
                    </div>
                    
                    {/* Captcha text with styling */}
                    <div className="relative">
                      {captchaCode.split('').map((char, index) => (
                        <span
                          key={index}
                          className="inline-block"
                          style={{
                            transform: `rotate(${(Math.random() - 0.5) * 20}deg) scale(${0.9 + Math.random() * 0.2})`,
                            color: `hsl(${Math.random() * 360}, 70%, 40%)`,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    
                    {/* Noise lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-gray-400 opacity-30"
                          style={{
                            width: '100%',
                            height: '1px',
                            top: `${20 + i * 20}%`,
                            transform: `rotate(${(Math.random() - 0.5) * 10}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors duration-200"
                    title="Refresh captcha"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Captcha Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={handleCaptchaChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                      captchaError 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    }`}
                    placeholder="Enter the code above"
                    required
                  />
                  {captchaInput && validateCaptcha() && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>

                {captchaError && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{captchaError}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !validateCaptcha()}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Sign In Securely</span>
                  </>
                )}
              </button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Username:</strong> admin</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Protected by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
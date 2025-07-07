import React, { useState } from 'react';
import { Mail, Shield, AlertTriangle, CheckCircle, Loader2, Sparkles, Zap, Lock, Eye, Cpu } from 'lucide-react';
import { analyzeEmail } from '../utils/spamDetector';
import { EmailAnalysis } from '../types';

interface EmailAnalyzerProps {
  onAnalysisComplete: (analysis: EmailAnalysis) => void;
}

export default function EmailAnalyzer({ onAnalysisComplete }: EmailAnalyzerProps) {
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastResult, setLastResult] = useState<EmailAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!subject.trim() || !sender.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const analysis = analyzeEmail(subject, sender, content);
    
    const emailAnalysis: EmailAnalysis = {
      id: Date.now().toString(),
      subject,
      sender,
      content,
      isSpam: analysis.isSpam,
      confidence: analysis.confidence,
      timestamp: new Date(),
      flaggedPatterns: analysis.flaggedPatterns,
      score: analysis.score
    };
    
    setLastResult(emailAnalysis);
    onAnalysisComplete(emailAnalysis);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setSubject('');
    setSender('');
    setContent('');
    setLastResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/30">
        {/* Animated cyber background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30"></div>
          {/* Circuit pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10V10zm5 5v70h70V15H15zm5 5h60v60H20V20zm5 5v50h50V25H25z' fill='%2300ffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-sm p-8 border-b border-cyan-400/30">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/50 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-black/30 p-4 rounded-full backdrop-blur-sm border border-cyan-400/50">
                  <Mail className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold text-white">AI Threat Analyzer</h2>
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-cyan-200 text-lg">Advanced cybersecurity intelligence & pattern recognition</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                <Cpu className="w-5 h-5 text-green-400 animate-pulse" />
                <span className="text-green-300 font-semibold">AI Engine Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-white font-semibold">Neural Network</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 space-y-8">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-cyan-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span>Subject Line</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-6 py-4 bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-300 text-white placeholder-gray-400 font-medium"
                  placeholder="Enter email subject..."
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-purple-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                <span>Sender Email</span>
                <Shield className="w-4 h-4 text-purple-400" />
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-6 py-4 bg-black/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-300 text-white placeholder-gray-400 font-medium"
                  placeholder="sender@example.com"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-pink-300 flex items-center space-x-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
              <span>Email Content</span>
              <Cpu className="w-4 h-4 text-pink-400" />
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-6 py-4 bg-black/50 backdrop-blur-sm border-2 border-pink-500/30 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-400 transition-all duration-300 resize-none text-white placeholder-gray-400 font-medium"
                placeholder="Paste your email content here for AI analysis..."
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-cyan-500/10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="group relative flex-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-cyan-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/50 via-purple-600/50 to-pink-600/50 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              {isAnalyzing ? (
                <>
                  <Loader2 className="relative w-6 h-6 animate-spin" />
                  <span className="relative">AI Analyzing Threats...</span>
                  <Cpu className="relative w-5 h-5 animate-pulse" />
                </>
              ) : (
                <>
                  <Shield className="relative w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative">Analyze with AI</span>
                  <Sparkles className="relative w-5 h-5 animate-pulse" />
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 bg-black/50 backdrop-blur-sm border-2 border-gray-500/30 text-gray-300 rounded-2xl font-bold text-lg hover:bg-black/70 hover:border-gray-400/50 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Clear All
            </button>
          </div>

          {/* Results */}
          {lastResult && (
            <div className="relative mt-8 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-gray-500/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 rounded-3xl"></div>
              
              <div className="relative flex items-center space-x-4 mb-6">
                <div className={`relative p-4 rounded-2xl ${
                  lastResult.isSpam 
                    ? 'bg-gradient-to-r from-red-600/80 to-pink-600/80 border border-red-400/50' 
                    : 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 border border-green-400/50'
                }`}>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg animate-pulse"></div>
                  {lastResult.isSpam ? (
                    <AlertTriangle className="relative w-8 h-8 text-white" />
                  ) : (
                    <CheckCircle className="relative w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    lastResult.isSpam ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {lastResult.isSpam ? '🚨 THREAT DETECTED' : '✅ EMAIL SECURE'}
                  </h3>
                  <p className="text-lg text-gray-300 font-semibold flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>AI Confidence: {lastResult.confidence}%</span>
                  </p>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>Neural Network Confidence</span>
                  </span>
                  <span>{lastResult.confidence}%</span>
                </div>
                <div className="relative w-full bg-gray-800/50 rounded-full h-4 overflow-hidden border border-gray-600/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full"></div>
                  <div
                    className={`relative h-4 rounded-full transition-all duration-1000 ease-out ${
                      lastResult.isSpam 
                        ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-600' 
                        : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600'
                    }`}
                    style={{ width: `${lastResult.confidence}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Flagged Patterns */}
              {lastResult.flaggedPatterns.length > 0 && (
                <div className="relative">
                  <h4 className="font-bold text-red-400 mb-4 flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    <span>AI Detected Threat Patterns:</span>
                    <Lock className="w-4 h-4 text-red-400" />
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lastResult.flaggedPatterns.map((pattern, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-900/30 backdrop-blur-sm rounded-xl border border-red-500/30">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-300">{pattern}</span>
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
import React from 'react';
import { Clock, Mail, Shield, AlertTriangle, CheckCircle, Trash2, Sparkles, Lock, Eye, Cpu } from 'lucide-react';
import { EmailAnalysis } from '../types';

interface EmailHistoryProps {
  emails: EmailAnalysis[];
  onClearHistory: () => void;
}

export default function EmailHistory({ emails, onClearHistory }: EmailHistoryProps) {
  if (emails.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>

          <div className="relative">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
              <Mail className="relative w-16 h-16 text-cyan-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Threat Analysis History</h3>
            <p className="text-gray-300 text-lg">Start analyzing emails to build your cybersecurity intelligence database!</p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-cyan-400">
              <Cpu className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold">AI Engine Ready</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30"></div>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-sm p-8 border-b border-cyan-400/30">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/50 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-black/30 p-3 rounded-full backdrop-blur-sm border border-cyan-400/50">
                  <Clock className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-white">Threat Analysis History</h3>
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-cyan-200">Your cybersecurity intelligence timeline & threat database</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                <Eye className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-green-300 text-sm font-semibold">{emails.length} Records</span>
              </div>
              <button
                onClick={onClearHistory}
                className="group flex items-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-400/30 hover:border-red-400/50"
              >
                <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold">Clear Database</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative divide-y divide-gray-600/30">
          {emails.map((email, index) => (
            <div key={email.id} className="relative p-8 hover:bg-black/30 transition-all duration-300 group border-l-4 border-l-transparent hover:border-l-cyan-400/50">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 relative">
                  <div className={`absolute inset-0 rounded-2xl blur-lg animate-pulse ${
                    email.isSpam ? 'bg-red-400/30' : 'bg-green-400/30'
                  }`}></div>
                  {email.isSpam ? (
                    <div className="relative w-16 h-16 bg-gradient-to-r from-red-600/80 to-pink-600/80 rounded-2xl flex items-center justify-center shadow-xl border border-red-400/50">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className="relative w-16 h-16 bg-gradient-to-r from-green-600/80 to-emerald-600/80 rounded-2xl flex items-center justify-center shadow-xl border border-green-400/50">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-white truncate pr-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {email.subject}
                    </h4>
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg border ${
                        email.isSpam 
                          ? 'bg-gradient-to-r from-red-600/80 to-pink-600/80 text-white border-red-400/50' 
                          : 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white border-green-400/50'
                      }`}>
                        {email.isSpam ? '🚨 THREAT' : '✅ SECURE'}
                      </span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-cyan-400 flex items-center space-x-1">
                          <Cpu className="w-4 h-4" />
                          <span>{email.confidence}%</span>
                        </div>
                        <div className="text-xs text-gray-400 font-medium">AI confidence</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4 font-medium">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                      <span>From: {email.sender}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      <span>{email.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>Analyzed</span>
                    </div>
                  </div>

                  <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-600/30">
                    <p className="text-gray-300 line-clamp-3 font-medium">
                      {email.content.substring(0, 200)}...
                    </p>
                  </div>

                  {email.flaggedPatterns.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {email.flaggedPatterns.slice(0, 4).map((pattern, patternIndex) => (
                        <span
                          key={patternIndex}
                          className="px-3 py-1 bg-gradient-to-r from-red-900/50 to-pink-900/50 text-red-300 rounded-lg text-xs font-semibold border border-red-500/30 flex items-center space-x-1"
                        >
                          <Lock className="w-3 h-3" />
                          <span>{pattern}</span>
                        </span>
                      ))}
                      {email.flaggedPatterns.length > 4 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 rounded-lg text-xs font-semibold border border-gray-600/30">
                          +{email.flaggedPatterns.length - 4} more threats
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
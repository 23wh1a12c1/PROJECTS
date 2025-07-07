import React from 'react';
import { Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Trash2, Calculator, CreditCard } from 'lucide-react';
import { LoanApplication } from '../types';

interface LoanHistoryProps {
  applications: LoanApplication[];
  onClearHistory: () => void;
}

export default function LoanHistory({ applications, onClearHistory }: LoanHistoryProps) {
  if (applications.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="mb-6">
            <DollarSign className="w-16 h-16 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Loan Applications Yet</h3>
          <p className="text-gray-600">Start predicting loan eligibility to build your assessment history!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Loan Application History</h3>
                <p className="text-emerald-100">Your financial assessment timeline</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">{applications.length} Applications</span>
              </div>
              <button
                onClick={onClearHistory}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {applications.map((application, index) => (
            <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {application.isApproved ? (
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Application #{application.id.slice(-6)}
                    </h4>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        application.isApproved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {application.isApproved ? 'Approved' : 'Rejected'}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                          <Calculator className="w-3 h-3" />
                          <span>{application.confidence}%</span>
                        </div>
                        <div className="text-xs text-gray-500">confidence</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Loan Amount</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">${application.loanAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Income</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">${application.income.toLocaleString()}</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <CreditCard className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Credit Score</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{application.creditScore}</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                        <span className="text-xs text-gray-500">Risk Score</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{application.riskScore}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <span>Age: {application.age}</span>
                    <span>{application.education}</span>
                    <span>{application.employment}</span>
                    <span>{application.timestamp.toLocaleDateString()}</span>
                  </div>

                  {application.factors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {application.factors.slice(0, 4).map((factor, factorIndex) => (
                        <span
                          key={factorIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                        >
                          {factor}
                        </span>
                      ))}
                      {application.factors.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          +{application.factors.length - 4} more
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
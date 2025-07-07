import React from 'react';
import { DollarSign, TrendingUp, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { LoanApplication } from '../types';

interface StatsCardProps {
  applications: LoanApplication[];
}

export default function StatsCard({ applications }: StatsCardProps) {
  const totalApplications = applications.length;
  const approvedCount = applications.filter(app => app.isApproved).length;
  const rejectedCount = totalApplications - approvedCount;
  const avgConfidence = totalApplications > 0 
    ? Math.round(applications.reduce((sum, app) => sum + app.confidence, 0) / totalApplications)
    : 0;

  const stats = [
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Approved Loans',
      value: approvedCount,
      icon: CheckCircle,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Rejected Loans',
      value: rejectedCount,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200'
    },
    {
      title: 'Avg Confidence',
      value: `${avgConfidence}%`,
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Activity className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Live data</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} rounded-lg p-3 border ${stat.borderColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
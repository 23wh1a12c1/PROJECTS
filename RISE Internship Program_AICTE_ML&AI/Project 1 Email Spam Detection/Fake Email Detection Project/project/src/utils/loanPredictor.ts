import { LoanPredictionResult } from '../types';

interface LoanFormData {
  age: string;
  income: string;
  education: string;
  employment: string;
  creditScore: string;
  loanAmount: string;
  loanTerm: string;
  propertyArea: string;
  dependents: string;
  married: string;
}

export function predictLoanEligibility(formData: LoanFormData): LoanPredictionResult {
  const age = parseInt(formData.age);
  const income = parseFloat(formData.income);
  const creditScore = parseInt(formData.creditScore);
  const loanAmount = parseFloat(formData.loanAmount);
  const loanTerm = parseInt(formData.loanTerm);
  
  let score = 0;
  const factors: string[] = [];
  
  // Age factor (18-65 optimal range)
  if (age >= 25 && age <= 55) {
    score += 15;
    factors.push('Optimal age range for loan approval');
  } else if (age < 25 || age > 55) {
    score -= 10;
    factors.push('Age outside optimal range');
  }
  
  // Income factor
  if (income >= 100000) {
    score += 25;
    factors.push('High annual income');
  } else if (income >= 50000) {
    score += 15;
    factors.push('Good annual income');
  } else if (income >= 30000) {
    score += 5;
    factors.push('Moderate annual income');
  } else {
    score -= 15;
    factors.push('Low annual income');
  }
  
  // Credit score factor
  if (creditScore >= 750) {
    score += 30;
    factors.push('Excellent credit score');
  } else if (creditScore >= 700) {
    score += 20;
    factors.push('Good credit score');
  } else if (creditScore >= 650) {
    score += 10;
    factors.push('Fair credit score');
  } else if (creditScore >= 600) {
    score -= 5;
    factors.push('Below average credit score');
  } else {
    score -= 20;
    factors.push('Poor credit score');
  }
  
  // Loan to income ratio
  const loanToIncomeRatio = loanAmount / income;
  if (loanToIncomeRatio <= 3) {
    score += 15;
    factors.push('Low loan-to-income ratio');
  } else if (loanToIncomeRatio <= 5) {
    score += 5;
    factors.push('Moderate loan-to-income ratio');
  } else if (loanToIncomeRatio <= 8) {
    score -= 5;
    factors.push('High loan-to-income ratio');
  } else {
    score -= 15;
    factors.push('Very high loan-to-income ratio');
  }
  
  // Education factor
  if (formData.education === 'Graduate') {
    score += 10;
    factors.push('Graduate education level');
  } else {
    score -= 5;
    factors.push('Non-graduate education level');
  }
  
  // Employment factor
  if (formData.employment === 'Salaried') {
    score += 10;
    factors.push('Stable salaried employment');
  } else {
    score += 5;
    factors.push('Self-employed status');
  }
  
  // Marital status factor
  if (formData.married === 'Yes') {
    score += 5;
    factors.push('Married status provides stability');
  }
  
  // Property area factor
  if (formData.propertyArea === 'Urban') {
    score += 5;
    factors.push('Urban property location');
  } else if (formData.propertyArea === 'Semiurban') {
    score += 3;
    factors.push('Semi-urban property location');
  } else {
    score += 1;
    factors.push('Rural property location');
  }
  
  // Dependents factor
  const dependentsCount = formData.dependents === '3+' ? 4 : parseInt(formData.dependents);
  if (dependentsCount === 0) {
    score += 5;
    factors.push('No dependents');
  } else if (dependentsCount <= 2) {
    score += 2;
    factors.push('Few dependents');
  } else {
    score -= 5;
    factors.push('Many dependents');
  }
  
  // Loan term factor
  if (loanTerm <= 180) { // 15 years or less
    score += 5;
    factors.push('Short loan term');
  } else if (loanTerm <= 360) { // 30 years or less
    score += 2;
    factors.push('Standard loan term');
  } else {
    score -= 3;
    factors.push('Long loan term');
  }
  
  // Determine approval based on score
  const isApproved = score >= 50;
  
  // Calculate confidence (50-95% range)
  let confidence = Math.min(95, Math.max(50, 50 + (score - 50) * 0.8));
  confidence = Math.round(confidence);
  
  // Calculate risk score (inverse of approval likelihood)
  const riskScore = Math.max(5, Math.min(95, 100 - score));
  
  return {
    isApproved,
    confidence,
    riskScore: Math.round(riskScore),
    factors: factors.slice(0, 6) // Limit to top 6 factors
  };
}
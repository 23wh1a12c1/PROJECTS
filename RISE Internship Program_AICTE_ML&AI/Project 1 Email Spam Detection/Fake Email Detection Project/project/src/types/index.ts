export interface LoanApplication {
  id: string;
  age: number;
  income: number;
  education: string;
  employment: string;
  creditScore: number;
  loanAmount: number;
  loanTerm: number;
  propertyArea: string;
  dependents: string;
  married: string;
  isApproved: boolean;
  confidence: number;
  riskScore: number;
  timestamp: Date;
  factors: string[];
}

export interface LoanPredictionResult {
  isApproved: boolean;
  confidence: number;
  riskScore: number;
  factors: string[];
}
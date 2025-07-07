import { SpamIndicator } from '../types';

export const SPAM_INDICATORS: SpamIndicator[] = [
  // High-risk patterns
  { pattern: /\b(viagra|cialis|levitra)\b/gi, weight: 8, description: 'Pharmaceutical spam' },
  { pattern: /\b(lottery|winner|congratulations|claim.*prize)\b/gi, weight: 7, description: 'Lottery/Prize scam' },
  { pattern: /\b(urgent|act now|limited time|expires|hurry)\b/gi, weight: 6, description: 'Urgency manipulation' },
  { pattern: /\b(free money|make money|earn \$|get rich)\b/gi, weight: 7, description: 'Financial scam' },
  { pattern: /\b(click here|visit now|download now)\b/gi, weight: 5, description: 'Suspicious call-to-action' },
  
  // Medium-risk patterns
  { pattern: /\b(deal|offer|discount|sale|50% off)\b/gi, weight: 3, description: 'Promotional content' },
  { pattern: /\b(subscribe|unsubscribe|opt-out)\b/gi, weight: 2, description: 'Subscription-related' },
  { pattern: /\b(credit|loan|debt|mortgage)\b/gi, weight: 4, description: 'Financial services' },
  { pattern: /\b(weight loss|lose weight|diet pill)\b/gi, weight: 5, description: 'Health/Weight loss' },
  { pattern: /\b(casino|gambling|poker|slots)\b/gi, weight: 6, description: 'Gambling content' },
  
  // Low-risk patterns
  { pattern: /\b(newsletter|update|notification)\b/gi, weight: 1, description: 'Newsletter content' },
  { pattern: /\b(meeting|conference|webinar)\b/gi, weight: -1, description: 'Business communication' },
  { pattern: /\b(invoice|receipt|payment|order)\b/gi, weight: -2, description: 'Transaction-related' },
];

export const SUSPICIOUS_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com'
];

export const TRUSTED_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'company.com', 'edu', 'gov'
];

export function analyzeEmail(subject: string, sender: string, content: string): {
  isSpam: boolean;
  confidence: number;
  flaggedPatterns: string[];
  score: number;
} {
  const fullText = `${subject} ${content}`.toLowerCase();
  let score = 0;
  const flaggedPatterns: string[] = [];
  
  // Check against spam indicators
  SPAM_INDICATORS.forEach(indicator => {
    const matches = fullText.match(indicator.pattern);
    if (matches) {
      score += indicator.weight * matches.length;
      flaggedPatterns.push(indicator.description);
    }
  });
  
  // Check sender domain
  const domain = sender.split('@')[1]?.toLowerCase();
  if (domain) {
    if (SUSPICIOUS_DOMAINS.some(d => domain.includes(d))) {
      score += 5;
      flaggedPatterns.push('Suspicious sender domain');
    } else if (TRUSTED_DOMAINS.some(d => domain.includes(d))) {
      score -= 2;
    }
  }
  
  // Check for excessive capitalization
  const capsRatio = (fullText.match(/[A-Z]/g) || []).length / fullText.length;
  if (capsRatio > 0.3) {
    score += 3;
    flaggedPatterns.push('Excessive capitalization');
  }
  
  // Check for excessive punctuation
  const punctRatio = (fullText.match(/[!?]{2,}/g) || []).length;
  if (punctRatio > 0) {
    score += punctRatio * 2;
    flaggedPatterns.push('Excessive punctuation');
  }
  
  // Check for suspicious URLs
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urls = fullText.match(urlPattern) || [];
  if (urls.length > 3) {
    score += 4;
    flaggedPatterns.push('Multiple suspicious URLs');
  }
  
  // Determine if spam based on score
  const isSpam = score > 5;
  const confidence = Math.min(95, Math.max(50, Math.abs(score) * 10));
  
  return {
    isSpam,
    confidence: Math.round(confidence),
    flaggedPatterns: [...new Set(flaggedPatterns)],
    score
  };
}
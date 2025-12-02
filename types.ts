export type Difficulty = 1 | 2 | 3; // 1: Simple, 2: Mixed, 3: Complex/Trap

export type DiagnosisType = 'NO_IA' | 'AI_STANDARD' | 'AI_PROJECT';
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';
export type Stakeholder = 'MANAGER' | 'DPO_RSSI' | 'LAB_IA' | 'BUSINESS';

export interface Question {
  id: string;
  text: string;
  answer: string;
  isKey: boolean; // If true, reveals crucial info
  relevance: number; // 0-10 score contribution
}

export interface Case {
  id: string;
  title: string;
  difficulty: Difficulty;
  agentName: string;
  agentRole: string;
  context: string; // The initial "irritant"
  
  // Phase 1: Consultation
  questions: Question[];

  // Phase 2: Expected Diagnosis
  expectedDiagnosis: DiagnosisType;
  expectedRisk: RiskLevel;
  recommendedStakeholder: Stakeholder;

  // Phase 3: Prescription (Multiple choice options for the final report)
  prescriptionOptions: {
    reformulation: string[];
    vigilance: string[];
    nextSteps: string[];
  };
  
  // Feedback content
  feedback: {
    success: string;
    partial: string;
    failure: string;
    expertNote: string; // Educational content from the PDF context
  };
}

export interface GameState {
  unlockedCases: string[];
  completedCases: string[]; // IDs
  scores: Record<string, CaseScore>; // Map caseID to score
}

export interface CaseScore {
  exploration: number; // 0-100
  diagnosis: number; // 0-100
  prescription: number; // 0-100
  total: number; // 0-100
}

export const LEVELS = {
  1: { label: 'Eaux Calmes', description: 'Cas simples, souvent sans IA ou outils standards.' },
  2: { label: 'Haute Mer', description: 'Cas mixtes, IA possible avec précautions.' },
  3: { label: 'Tempête', description: 'Cas sensibles, risques éthiques ou techniques élevés.' },
};
import React, { useState } from 'react';
import { 
  Anchor, Map, Compass, Wind, Search, AlertTriangle, 
  CheckCircle, XCircle, ChevronRight, Sailboat, BookOpen,
  LifeBuoy, Ship, Award, ArrowRight
} from 'lucide-react';
import { CASES } from './data';
import { DiagnosisType, RiskLevel, Stakeholder, CaseScore, LEVELS, Case } from './types';

// --- COMPONENTS ---

const Header = ({ title, score, reset }: { title: string, score: number, reset: () => void }) => (
  <header className="bg-slate-900 text-slate-100 p-4 border-b-4 border-amber-500 flex justify-between items-center sticky top-0 z-50 shadow-md">
    <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
      <Ship className="h-8 w-8 text-amber-500" />
      <div>
        <h1 className="font-bold text-lg md:text-xl tracking-tight">{title}</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest">Navigateur du Référent IA</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex flex-col items-end">
        <span className="text-xs text-slate-400">Score Global</span>
        <span className="font-mono font-bold text-amber-500">{score} pts</span>
      </div>
      <button onClick={reset} className="p-2 hover:bg-slate-800 rounded-full" title="Retour au port">
        <Map className="h-6 w-6" />
      </button>
    </div>
  </header>
);

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 max-w-2xl mx-auto">
    <div className="bg-slate-100 p-6 rounded-full mb-8 shadow-inner">
      <Compass className="h-24 w-24 text-slate-800" strokeWidth={1} />
    </div>
    <h2 className="text-4xl font-bold text-slate-900 mb-4">Bienvenue à bord, Référent.</h2>
    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
      La mer de l'Intelligence Artificielle est vaste et parfois dangereuse. 
      Votre mission : accueillir les agents, écouter leurs besoins, et tracer la route la plus sûre.
      <br /><br />
      Devez-vous hisser les voiles de l'IA, rester au moteur avec des outils simples, ou jeter l'ancre face au danger ?
    </p>
    <button 
      onClick={onStart}
      className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center gap-3 text-lg"
    >
      <Sailboat className="h-6 w-6" />
      Commencer la Navigation
    </button>
  </div>
);

const Dashboard = ({ cases, completedCases, onSelectCase, scores }: { 
  cases: Case[], 
  completedCases: string[], 
  onSelectCase: (c: Case) => void,
  scores: Record<string, CaseScore> 
}) => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Map className="h-6 w-6 text-slate-600" />
        Carte de Navigation
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => {
          const isDone = completedCases.includes(c.id);
          const score = scores[c.id];
          const levelInfo = LEVELS[c.difficulty];
          
          return (
            <div 
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`
                relative bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1
                ${isDone ? 'border-emerald-500/50' : 'border-slate-200'}
              `}
            >
              <div className={`h-2 w-full ${c.difficulty === 1 ? 'bg-cyan-400' : c.difficulty === 2 ? 'bg-blue-600' : 'bg-slate-800'}`}></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${c.difficulty === 1 ? 'bg-cyan-100 text-cyan-800' : c.difficulty === 2 ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-800'}`}>
                    {levelInfo.label}
                  </span>
                  {isDone && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{c.agentRole}</p>
                
                {isDone ? (
                   <div className="flex items-center gap-2 text-sm font-mono text-slate-600 bg-slate-50 p-2 rounded">
                     <Award className="h-4 w-4 text-amber-500" /> Score: {score?.total || 0}/100
                   </div>
                ) : (
                  <div className="text-sm text-slate-400 flex items-center gap-1">
                    <ArrowRight className="h-4 w-4" /> Explorer ce cas
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- GAME PHASES ---

const PhaseConsultation = ({ currentCase, onComplete }: { currentCase: Case, onComplete: (score: number) => void }) => {
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [visibility, setVisibility] = useState(0);

  const handleAsk = (qId: string, relevance: number) => {
    if (askedQuestions.includes(qId)) return;
    const newAsked = [...askedQuestions, qId];
    setAskedQuestions(newAsked);
    setVisibility(prev => Math.min(100, prev + (relevance * 2.5))); // Visuel
  };

  const handleNext = () => {
    // Calculate Score based on Key Questions asked
    const keyQuestions = currentCase.questions.filter(q => q.isKey);
    const askedKeys = currentCase.questions.filter(q => askedQuestions.includes(q.id) && q.isKey);
    const score = Math.round((askedKeys.length / keyQuestions.length) * 100);
    onComplete(score);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="bg-slate-100 p-4 rounded-full">
          <LifeBuoy className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{currentCase.agentName} - {currentCase.agentRole}</h3>
          <p className="text-slate-600 italic mt-2">"{currentCase.context}"</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000" 
            style={{ width: `${visibility}%` }}
          ></div>
        </div>
        <span className="text-xs font-bold text-blue-600 uppercase">Visibilité</span>
      </div>

      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Search className="h-5 w-5" /> Questions disponibles
      </h4>

      <div className="grid gap-4 mb-8">
        {currentCase.questions.map(q => {
          const asked = askedQuestions.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => handleAsk(q.id, q.relevance)}
              disabled={asked}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                asked 
                  ? 'bg-slate-50 border-slate-200 text-slate-400' 
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className="font-semibold mb-1">{q.text}</div>
              {asked && (
                <div className="text-blue-800 font-medium mt-2 animate-slide-down">
                  ↳ "{q.answer}"
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleNext}
          disabled={askedQuestions.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          Passer au Diagnostic
        </button>
      </div>
    </div>
  );
};

const PhaseDiagnosis = ({ currentCase, onComplete }: { currentCase: Case, onComplete: (score: number) => void }) => {
  const [diagnosis, setDiagnosis] = useState<DiagnosisType | null>(null);
  const [risk, setRisk] = useState<RiskLevel | null>(null);
  const [stakeholder, setStakeholder] = useState<Stakeholder | null>(null);

  const handleSubmit = () => {
    let score = 0;
    if (diagnosis === currentCase.expectedDiagnosis) score += 40;
    if (risk === currentCase.expectedRisk) score += 30;
    if (stakeholder === currentCase.recommendedStakeholder) score += 30;
    
    // Penalize dangerous low risk assessment
    if (currentCase.expectedRisk === 'HIGH' && risk === 'LOW') score = Math.max(0, score - 50);

    onComplete(score);
  };

  const isFormComplete = diagnosis && risk && stakeholder;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <Compass className="h-6 w-6" /> Journal de Bord - Diagnostic
      </h3>

      <div className="space-y-8">
        {/* Type of Project */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4">1. Quelle orientation proposez-vous ?</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'NO_IA', label: 'Pas d\'IA', desc: 'Solution classique ou organisationnelle' },
              { id: 'AI_STANDARD', label: 'IA Standard', desc: 'Outil existant, mature, peu de dev' },
              { id: 'AI_PROJECT', label: 'Projet IA', desc: 'Développement spécifique, complexe' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setDiagnosis(opt.id as DiagnosisType)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  diagnosis === opt.id ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold block mb-1">{opt.label}</div>
                <div className="text-xs text-slate-500">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4">2. Niveau de risque estimé (Météo)</h4>
          <div className="flex gap-4">
            {[
              { id: 'LOW', label: 'Faible', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { id: 'MODERATE', label: 'Modéré', color: 'bg-orange-100 text-orange-800 border-orange-200' },
              { id: 'HIGH', label: 'Élevé', color: 'bg-red-100 text-red-800 border-red-200' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setRisk(opt.id as RiskLevel)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition ${
                  risk === opt.id ? `ring-2 ring-offset-2 ${opt.color} border-current` : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stakeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4">3. Qui embarquer en priorité ?</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'MANAGER', label: 'Manager / IT Support' },
              { id: 'DPO_RSSI', label: 'DPO / RSSI' },
              { id: 'LAB_IA', label: 'Lab IA / Data Scientist' },
              { id: 'BUSINESS', label: 'Métier (pour nettoyer la donnée)' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setStakeholder(opt.id as Stakeholder)}
                className={`p-3 rounded-lg border text-sm font-medium transition ${
                  stakeholder === opt.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition shadow-lg"
        >
          Valider le Cap
        </button>
      </div>
    </div>
  );
};

const PhasePrescription = ({ currentCase, onComplete }: { currentCase: Case, onComplete: (score: number) => void }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    reformulation: -1,
    vigilance: -1,
    nextSteps: -1
  });

  const handleSubmit = () => {
    // Ideally indices 0 are correct in our data structure for simplicity in this demo,
    // but in a real app we'd shuffle or have specific IDs.
    // Based on data.ts, index 0 is always the "Correct" or "Better" answer.
    let score = 0;
    if (selectedOptions.reformulation === 0) score += 33;
    if (selectedOptions.vigilance === 0) score += 33;
    if (selectedOptions.nextSteps === 0) score += 34;
    
    onComplete(score);
  };

  const isComplete = Object.values(selectedOptions).every(v => v !== -1);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h3 className="text-2xl font-bold mb-2 text-slate-800 flex items-center gap-2">
        <BookOpen className="h-6 w-6" /> Ordonnance du Référent
      </h3>
      <p className="text-slate-500 mb-8">Construisez votre réponse à l'agent.</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="font-bold text-slate-700 block">Reformulation du besoin</label>
          {currentCase.prescriptionOptions.reformulation.map((opt, idx) => (
            <label key={idx} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedOptions.reformulation === idx ? 'bg-blue-50 border-blue-500' : 'border-slate-200'}`}>
              <input 
                type="radio" 
                name="reformulation" 
                className="mt-1"
                onChange={() => setSelectedOptions(prev => ({...prev, reformulation: idx}))}
                checked={selectedOptions.reformulation === idx}
              />
              <span className="text-sm text-slate-700">{opt}</span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-slate-700 block flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Point de vigilance majeur
          </label>
          {currentCase.prescriptionOptions.vigilance.map((opt, idx) => (
            <label key={idx} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedOptions.vigilance === idx ? 'bg-blue-50 border-blue-500' : 'border-slate-200'}`}>
              <input 
                type="radio" 
                name="vigilance" 
                className="mt-1"
                onChange={() => setSelectedOptions(prev => ({...prev, vigilance: idx}))}
                checked={selectedOptions.vigilance === idx}
              />
              <span className="text-sm text-slate-700">{opt}</span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-slate-700 block">Prochaine étape concrète</label>
          {currentCase.prescriptionOptions.nextSteps.map((opt, idx) => (
            <label key={idx} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${selectedOptions.nextSteps === idx ? 'bg-blue-50 border-blue-500' : 'border-slate-200'}`}>
              <input 
                type="radio" 
                name="nextSteps" 
                className="mt-1"
                onChange={() => setSelectedOptions(prev => ({...prev, nextSteps: idx}))}
                checked={selectedOptions.nextSteps === idx}
              />
              <span className="text-sm text-slate-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition shadow-lg"
        >
          Envoyer la réponse
        </button>
      </div>
    </div>
  );
};

const PhaseFeedback = ({ currentCase, score, onExit }: { currentCase: Case, score: CaseScore, onExit: () => void }) => {
  let feedbackTitle = "";
  let feedbackText = "";
  let feedbackColor = "";

  if (score.total >= 80) {
    feedbackTitle = "Excellent Capitaine !";
    feedbackText = currentCase.feedback.success;
    feedbackColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
  } else if (score.total >= 50) {
    feedbackTitle = "Navigation acceptable";
    feedbackText = currentCase.feedback.partial;
    feedbackColor = "bg-orange-100 text-orange-800 border-orange-300";
  } else {
    feedbackTitle = "Naufrage évité de justesse";
    feedbackText = currentCase.feedback.failure;
    feedbackColor = "bg-red-100 text-red-800 border-red-300";
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 text-center animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{score.total}/100</h2>
        <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden max-w-xs mx-auto">
          <div 
            className={`h-full transition-all duration-1000 ${score.total >= 80 ? 'bg-emerald-500' : score.total >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${score.total}%` }}
          ></div>
        </div>
      </div>

      <div className={`p-6 rounded-xl border-2 mb-8 ${feedbackColor}`}>
        <h3 className="text-xl font-bold mb-2">{feedbackTitle}</h3>
        <p>{feedbackText}</p>
      </div>

      <div className="text-left bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
          <Anchor className="h-5 w-5 text-blue-600" />
          L'avis de l'Expert
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          {currentCase.feedback.expertNote}
        </p>
      </div>

      <button 
        onClick={onExit}
        className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition"
      >
        Retour à la Carte
      </button>
    </div>
  );
};

// --- MAIN APP ---

type View = 'WELCOME' | 'DASHBOARD' | 'GAME';

function App() {
  const [view, setView] = useState<View>('WELCOME');
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(null);
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, CaseScore>>({});
  
  // Game Session State
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1); // 1:Consult, 2:Diag, 3:Prescript, 4:Feedback
  const [currentScores, setCurrentScores] = useState<Partial<CaseScore>>({});

  const startSession = (c: Case) => {
    setCurrentCaseId(c.id);
    setPhase(1);
    setCurrentScores({});
    setView('GAME');
  };

  const handlePhaseComplete = (score: number) => {
    if (phase === 1) {
      setCurrentScores(prev => ({ ...prev, exploration: score }));
      setPhase(2);
    } else if (phase === 2) {
      setCurrentScores(prev => ({ ...prev, diagnosis: score }));
      setPhase(3);
    } else if (phase === 3) {
      const finalScores = { ...currentScores, prescription: score } as CaseScore;
      // Calculate total average weighted
      const total = Math.round((finalScores.exploration * 0.2) + (finalScores.diagnosis * 0.4) + (finalScores.prescription * 0.4));
      finalScores.total = total;
      
      setCurrentScores(finalScores);
      setScores(prev => ({ ...prev, [currentCaseId!]: finalScores }));
      if (!completedCases.includes(currentCaseId!)) {
        setCompletedCases(prev => [...prev, currentCaseId!]);
      }
      setPhase(4);
    }
  };

  const handleExitGame = () => {
    setView('DASHBOARD');
    setCurrentCaseId(null);
  };

  const resetGame = () => {
    if (window.confirm("Voulez-vous retourner à l'accueil ?")) {
      setView('WELCOME');
      setCompletedCases([]);
      setScores({});
    }
  };

  const totalScore = Object.values(scores).reduce((acc: number, curr: CaseScore) => acc + curr.total, 0);

  const currentCase = CASES.find(c => c.id === currentCaseId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100">
      <Header title="Clinique des Cas d'Usage IA" score={totalScore} reset={() => setView('DASHBOARD')} />

      <main>
        {view === 'WELCOME' && (
          <WelcomeScreen onStart={() => setView('DASHBOARD')} />
        )}

        {view === 'DASHBOARD' && (
          <Dashboard 
            cases={CASES} 
            completedCases={completedCases}
            scores={scores}
            onSelectCase={startSession} 
          />
        )}

        {view === 'GAME' && currentCase && (
          <div className="py-6">
            {/* Progress Steps */}
            <div className="max-w-xl mx-auto flex justify-between items-center mb-8 px-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2"></div>
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${
                    phase > step ? 'bg-emerald-500 border-emerald-500 text-white' : 
                    phase === step ? 'bg-white border-blue-600 text-blue-600' : 'bg-white border-slate-300 text-slate-300'
                  }`}
                >
                  {phase > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
              ))}
            </div>

            {phase === 1 && <PhaseConsultation currentCase={currentCase} onComplete={handlePhaseComplete} />}
            {phase === 2 && <PhaseDiagnosis currentCase={currentCase} onComplete={handlePhaseComplete} />}
            {phase === 3 && <PhasePrescription currentCase={currentCase} onComplete={handlePhaseComplete} />}
            {phase === 4 && <PhaseFeedback currentCase={currentCase} score={currentScores as CaseScore} onExit={handleExitGame} />}
          </div>
        )}
      </main>
      
      {/* Footer Branding */}
      <footer className="mt-12 py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        <p className="flex items-center justify-center gap-2">
          <Wind className="h-4 w-4" /> 
          Kit Référent IA - Module d'entraînement
        </p>
      </footer>
    </div>
  );
}

export default App;
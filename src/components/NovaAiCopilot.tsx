import React, { useState } from 'react';
import { SocialWorld, Spark, ActivityConnection, NexusUser } from '../types';
import {
  Bot,
  X,
  Sparkles,
  Zap,
  GitMerge,
  GitBranch,
  Users,
  ArrowRight,
  RefreshCw,
  Layers,
  Flame,
} from 'lucide-react';

interface NovaAiCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  worlds: SocialWorld[];
  sparks: Spark[];
  connections: ActivityConnection[];
  currentUser: NexusUser;
  onApplyNovaSpark: (title: string, content: string, worldId: string) => void;
  onTriggerNovaMerge: (sparkAId: string, sparkBId: string) => void;
  onSelectWorld: (worldId: string) => void;
}

export const NovaAiCopilot: React.FC<NovaAiCopilotProps> = ({
  isOpen,
  onClose,
  worlds,
  sparks,
  connections,
  currentUser,
  onApplyNovaSpark,
  onTriggerNovaMerge,
  onSelectWorld,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'recommendations' | 'merge_detector' | 'collaborators'>('recommendations');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRefresh = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 800);
  };

  return (
    <div
      id="nova-ai-drawer"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-y-auto text-slate-900"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="relative p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold font-display text-slate-900">
                  NOVA Copilot
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  AI INTELLIGENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Realtime Social Graph & Idea Synthesizer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Re-analyze Graph"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 my-4 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ideation
          </button>
          <button
            onClick={() => setActiveTab('merge_detector')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'merge_detector'
                ? 'bg-white text-purple-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Merge Radar
          </button>
          <button
            onClick={() => setActiveTab('collaborators')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'collaborators'
                ? 'bg-white text-pink-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Synergy
          </button>
        </div>

        {/* TAB 1: Idea Synthesis & White-Space Detection */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-indigo-700 block mb-1 font-mono uppercase text-[10px]">
                Graph Opportunity Detected:
              </span>
              NOVA detected high community energy in <strong className="text-slate-900">AI Research</strong> and <strong className="text-slate-900">Future Design</strong>, but a distinct gap in <em>epistemic reproducibility interfaces</em>.
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-indigo-600 mb-1.5">
                  <span>WORLD: AI RESEARCH</span>
                  <span className="text-amber-600 flex items-center gap-0.5 font-bold">
                    <Flame className="w-3 h-3" /> 97% Synergy Score
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                  Synthesize: "Deterministic ArXiv Code-Verification Sandbox"
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                  Couples Elena's literature gap model with containerized reproduction to test preprint papers in isolated runtime pods.
                </p>
                <button
                  onClick={() => {
                    onApplyNovaSpark(
                      'Deterministic ArXiv Code-Verification Sandbox',
                      'Hypothesis: Preprints could contain zero-install web-container reproduction sandboxes to immediately verify machine learning claims.',
                      'world-ai'
                    );
                    onClose();
                  }}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instantiate this Spark</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-pink-600 mb-1.5">
                  <span>WORLD: FUTURE DESIGN</span>
                  <span className="text-amber-600 flex items-center gap-0.5 font-bold">
                    <Flame className="w-3 h-3" /> 92% Synergy Score
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                  Synthesize: "Haptic Eye-Gaze UI Shader Library"
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                  A fluid glassmorphic token set that adapts CSS refraction indices in response to user reading speed and cognitive load.
                </p>
                <button
                  onClick={() => {
                    onApplyNovaSpark(
                      'Haptic Eye-Gaze UI Shader Library',
                      'Proposal: Develop zero-GPU-overhead glassmorphism shader tokens calibrated for spatial web devices.',
                      'world-design'
                    );
                    onClose();
                  }}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instantiate this Spark</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Merge Radar (Detecting sparks that should combine) */}
        {activeTab === 'merge_detector' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-purple-900 leading-relaxed">
              <span className="font-bold text-purple-700 block mb-1 font-mono uppercase text-[10px]">
                High Merge Compatibility:
              </span>
              NOVA detected 2 independently branching ideas with 96% conceptual overlap. Merging them will accelerate active project formation.
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-700 mb-2">
                <span>SUGGESTED MERGE PAIR</span>
                <span className="font-bold bg-purple-100 px-1.5 py-0.5 rounded">
                  96% Match
                </span>
              </div>

              <div className="space-y-2 mb-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-indigo-600 font-mono block font-bold">Node 1:</span>
                  <span className="font-semibold text-slate-800">
                    AI Gap Hunter (Elena Vance)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-purple-600 font-mono block font-bold">Node 2:</span>
                  <span className="font-semibold text-slate-800">
                    Automated Code Sandboxes (Alex Rivera)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 italic mb-3">
                Synthesis outcome: "Autonomous Literature Verification Engine" — ready to launch as a 48-hour community challenge!
              </p>

              <button
                onClick={() => {
                  onTriggerNovaMerge('spark-1', 'spark-1-remix-a');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <GitMerge className="w-4 h-4" />
                <span>Open Merge Studio for this Pair</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Matchmaker (Activity & Skill Complementarity) */}
        {activeTab === 'collaborators' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-pink-50 border border-pink-100 text-xs text-pink-900">
              <span className="font-bold text-pink-700 block mb-1 font-mono uppercase text-[10px]">
                Skill Synergy Matrix
              </span>
              Matches are determined by complementary capabilities rather than follower counts.
            </div>

            {connections.map((conn) => (
              <div
                key={conn.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-300 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={conn.targetUser.avatar}
                      alt={conn.targetUser.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {conn.targetUser.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {conn.targetUser.role.slice(0, 28)}...
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {conn.compatibilityScore}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-mono line-clamp-2 mb-2 bg-white p-2 rounded-lg border border-slate-200">
                  {conn.complementarySkills.synergyReason}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{conn.sharedIdeasCount} shared sparks</span>
                  <span className="text-indigo-600 font-medium">Mutual: {conn.mutualWorlds[0]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>NOVA Autonomous Engine</span>
        <span className="text-indigo-600 font-medium">Status: Optimal (12ms)</span>
      </div>
    </div>
  );
};

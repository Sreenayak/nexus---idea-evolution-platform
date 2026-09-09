import React, { useState } from 'react';
import { Spark, SocialWorld } from '../types';
import {
  Scale,
  Zap,
  TrendingUp,
  Award,
  Sparkles,
  Info,
  X,
  CheckCircle2,
  BarChart3,
  Flame,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuadraticConsensusModalProps {
  isOpen: boolean;
  onClose: () => void;
  sparks: Spark[];
  worlds: SocialWorld[];
  onStakeEnergy: (sparkId: string, credits: number) => void;
}

export const QuadraticConsensusModal: React.FC<QuadraticConsensusModalProps> = ({
  isOpen,
  onClose,
  sparks,
  worlds,
  onStakeEnergy,
}) => {
  if (!isOpen) return null;

  // Available energy budget for this round
  const [userEnergyBudget, setUserEnergyBudget] = useState(100);
  const [allocatedCredits, setAllocatedCredits] = useState<Record<string, number>>({});
  const [stakedSuccess, setStakedSuccess] = useState(false);

  // Top 5 active sparks eligible for quadratic consensus
  const eligibleSparks = sparks.slice(0, 5);

  const handleSliderChange = (sparkId: string, credits: number) => {
    const currentTotalExcluding = Object.entries(allocatedCredits)
      .filter(([id]) => id !== sparkId)
      .reduce((sum: number, [, c]) => sum + Number(c), 0);

    const maxAffordable = 100 - currentTotalExcluding;
    const boundedCredits = Math.max(0, Math.min(credits, maxAffordable));

    setAllocatedCredits((prev) => ({
      ...prev,
      [sparkId]: boundedCredits,
    }));
  };

  const totalUsed = Object.values(allocatedCredits).reduce((a: number, b: number) => a + Number(b), 0);
  const remainingBudget = 100 - totalUsed;

  const handleCommitStaking = () => {
    soundEffects.playMergeFusion();
    Object.entries(allocatedCredits).forEach(([sparkId, credits]) => {
      const numCredits = Number(credits);
      if (numCredits > 0) {
        onStakeEnergy(sparkId, numCredits);
      }
    });
    setStakedSuccess(true);
    setTimeout(() => {
      setStakedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quadratic-consensus-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="quadratic-consensus-title" className="text-lg font-bold font-display text-slate-900">
                  Quadratic Conviction Staking Matrix
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                  Novel Mechanism
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Mathematical anti-plutocracy engine: Cost = (Conviction Votes)², dampening echo-chamber hype
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close quadratic staking dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Budget Counter Banner */}
        <div className="bg-indigo-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <span className="text-xs text-indigo-200 font-mono block">Your Conviction Energy Budget</span>
              <span className="text-sm font-bold font-mono">
                {remainingBudget} / 100 Credits Available
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-indigo-200 font-mono block">Effective Collective Weight</span>
            <span className="text-sm font-mono font-bold text-amber-300">
              Σ √Credits = {(Object.values(allocatedCredits) as number[]).reduce((acc: number, val: number) => acc + Math.sqrt(Number(val) || 0), 0).toFixed(2)} pts
            </span>
          </div>
        </div>

        {/* List of Eligible Hypothesis Nodes */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/40">
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Why Quadratic?</strong> In standard social voting, whales or loud mobs dominate. With quadratic consensus, giving 9 conviction points to an idea costs 81 credits, whereas supporting 9 distinct breakthrough ideas costs only 9 credits.
            </p>
          </div>

          <div className="space-y-3">
            {eligibleSparks.map((spark) => {
              const credits = allocatedCredits[spark.id] || 0;
              const effectiveVoice = Math.sqrt(credits).toFixed(1);
              const world = worlds.find((w) => w.id === spark.worldId);

              return (
                <div
                  key={spark.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {world?.name || 'Open Domain'}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{spark.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{spark.content}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-indigo-600">
                        +{effectiveVoice} Conviction
                      </span>
                      <span className="block text-[10px] font-mono text-slate-400">
                        Cost: {credits} credits
                      </span>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-mono text-slate-400 w-12 text-left">0 cr</span>
                    <input
                      type="range"
                      min="0"
                      max="64"
                      step="1"
                      value={credits}
                      onChange={(e) => handleSliderChange(spark.id, parseInt(e.target.value, 10))}
                      aria-label={`Allocate conviction credits to ${spark.title}`}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-[11px] font-mono text-slate-400 w-12 text-right">64 cr</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {totalUsed} credits committed across ideas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCommitStaking}
              disabled={totalUsed === 0 || stakedSuccess}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              {stakedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Conviction Staked!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Commit Quadratic Staking</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

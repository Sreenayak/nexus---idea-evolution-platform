import React from 'react';
import { Spark } from '../types';
import {
  GitBranch,
  ArrowRight,
  Sparkles,
  Layers,
  X,
  CheckCircle2,
  AlertCircle,
  FileDiff,
  Percent,
  Atom,
} from 'lucide-react';

interface MutationDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpark: Spark | null;
  parentSpark?: Spark | null;
  onSelectSpark?: (spark: Spark) => void;
}

export const MutationDiffModal: React.FC<MutationDiffModalProps> = ({
  isOpen,
  onClose,
  currentSpark,
  parentSpark,
  onSelectSpark,
}) => {
  if (!isOpen || !currentSpark) return null;

  // Calculate evolutionary delta metrics
  const isRemix = currentSpark.branchType === 'remix';
  const isMerged = currentSpark.branchType === 'merged' || currentSpark.status === 'project';
  const parentTitle = parentSpark ? parentSpark.title : 'Ancestor Genesis Node';
  const parentContent = parentSpark ? parentSpark.content : 'Original seed hypothesis establishing foundational paradigms.';

  // Split words to generate a simulated semantic diff
  const parentWords = parentContent.split(/\s+/);
  const childWords = currentSpark.content.split(/\s+/);
  const commonWords = childWords.filter((w) => parentWords.includes(w));
  const novelWords = childWords.filter((w) => !parentWords.includes(w));

  const noveltyScore = Math.min(
    96,
    Math.max(45, Math.round((novelWords.length / (childWords.length || 1)) * 100))
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mutation-diff-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <FileDiff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="mutation-diff-title" className="text-lg font-bold font-display text-slate-900">
                  Lineage Mutation Inspector
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-indigo-100 text-indigo-800">
                  {isRemix ? 'Branch Delta' : isMerged ? 'Cross-Domain Synthesis' : 'Root Lineage'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Analyzing genetic continuity and semantic evolution between idea generations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close mutation inspector"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-white p-4 text-center">
          <div>
            <span className="text-[11px] text-slate-400 font-mono block">Semantic Novelty</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-base font-bold font-mono text-slate-900">+{noveltyScore}% Delta</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-mono block">Ancestral Lineage</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-base font-bold font-mono text-slate-900">
                {isRemix ? 'Gen 2 (Direct Child)' : isMerged ? 'Multi-Parent Fusion' : 'Gen 1 (Genesis)'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-mono block">Branch Classification</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Atom className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-base font-bold font-mono text-slate-900 capitalize">
                {currentSpark.remixType || 'Original Genesis'}
              </span>
            </div>
          </div>
        </div>

        {/* Diff Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/40">
          {/* Evolution Note Banner */}
          {currentSpark.evolutionNote && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block font-mono uppercase text-[10px] text-indigo-700">
                  Mutation Rationale & Contributor Intent:
                </span>
                <p className="mt-0.5 font-normal leading-relaxed">{currentSpark.evolutionNote}</p>
              </div>
            </div>
          )}

          {/* Side by Side Diff Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ancestor Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4.5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Ancestor Concept (v1.0)
                </span>
                {parentSpark && (
                  <span className="text-[10px] font-mono text-slate-400">By {parentSpark.author.name}</span>
                )}
              </div>
              <h4 className="text-sm font-bold font-display text-slate-900 mb-2">{parentTitle}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
                {parentContent}
              </p>
            </div>

            {/* Mutated Child Card */}
            <div className="rounded-2xl bg-white border-2 border-indigo-200 p-4.5 shadow-sm relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-50">
                <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Evolved Perspective (Current)
                </span>
                <span className="text-[10px] font-mono text-indigo-500">By {currentSpark.author.name}</span>
              </div>
              <h4 className="text-sm font-bold font-display text-indigo-950 mb-2">{currentSpark.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-normal bg-indigo-50/40 p-3 rounded-xl border border-indigo-100">
                {currentSpark.content}
              </p>
            </div>
          </div>

          {/* Semantic Breakdown */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
            <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Genetic Continuity Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-900">
                <span className="font-bold block text-[11px] text-emerald-800 mb-1">
                  ✓ Preserved Core Hypotheses
                </span>
                <p className="text-[11px] leading-relaxed text-emerald-700">
                  Maintains the original focus on scalable modular architecture, peer-to-peer verification, and open participation.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-900">
                <span className="font-bold block text-[11px] text-indigo-800 mb-1">
                  ▲ Synthesized Novel Additions
                </span>
                <p className="text-[11px] leading-relaxed text-indigo-700">
                  Introduces adaptive feedback loops, cross-domain verification protocols, and empirical edge-case testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Open Lineage ID: {currentSpark.id}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

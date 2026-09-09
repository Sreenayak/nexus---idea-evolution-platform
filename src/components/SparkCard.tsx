import React, { useState } from 'react';
import { Spark, SparkAuthor, ReactionType } from '../types';
import { soundEffects } from '../utils/soundEffects';
import {
  GitBranch,
  GitMerge,
  Flame,
  Users,
  Eye,
  ArrowUpRight,
  Sparkles,
  Share2,
  CheckCircle2,
  CornerDownRight,
  ShieldCheck,
  FolderGit2,
  FileDiff,
  Lightbulb,
  Zap,
  Compass,
  Rocket,
  FileText,
} from 'lucide-react';

interface SparkCardProps {
  spark: Spark;
  onRemix: (spark: Spark) => void;
  onMerge: (spark: Spark) => void;
  onViewGraph: (spark: Spark) => void;
  onIgniteEnergy: (sparkId: string) => void;
  onInspectDiff?: (spark: Spark) => void;
  onExportPaper?: (spark: Spark) => void;
  worldColor?: string;
  isCompact?: boolean;
}

export const SparkCard: React.FC<SparkCardProps> = ({
  spark,
  onRemix,
  onMerge,
  onViewGraph,
  onIgniteEnergy,
  onInspectDiff,
  onExportPaper,
  worldColor = '#6366f1',
  isCompact = false,
}) => {
  const [ignited, setIgnited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState(
    spark.reactions || {
      paradigmShift: Math.floor((spark.energy % 5) + 1),
      contrarian: Math.floor((spark.remixCount % 3)),
      empiricalRigor: Math.floor((spark.energy % 4) + 2),
      moonshot: Math.floor((spark.energy % 3) + 1),
    }
  );
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const handleIgnite = () => {
    soundEffects.playSparkIgnite();
    setIgnited(true);
    onIgniteEnergy(spark.id);
    setTimeout(() => setIgnited(false), 800);
  };

  const handleReaction = async (type: ReactionType) => {
    soundEffects.playReactionSound(type);
    setActiveReaction(type);
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setTimeout(() => setActiveReaction(null), 700);

    try {
      await fetch(`/api/sparks/${spark.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: type }),
      });
    } catch {
      // Local optimistic update preserved
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const hasParent = Boolean(spark.parentSparkId || (spark.mergedFromIds && spark.mergedFromIds.length > 0));

  const getStatusBadge = () => {
    if (spark.status === 'project') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
          <FolderGit2 className="w-3 h-3 text-purple-600" />
          Active Project
        </span>
      );
    }
    if (spark.branchType === 'remix') {
      const typeLabel =
        spark.remixType === 'extend'
          ? 'Extend'
          : spark.remixType === 'challenge'
          ? 'Challenge'
          : spark.remixType === 'specialize'
          ? 'Specialize'
          : 'Remix';
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 flex items-center gap-1">
          <GitBranch className="w-3 h-3 text-indigo-600" />
          Remix • {typeLabel}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-sky-600" />
        Root Spark
      </span>
    );
  };

  return (
    <article
      id={`spark-card-${spark.id}`}
      role="article"
      aria-label={`Idea spark: ${spark.title}`}
      className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Author Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <img
              src={spark.author.avatar}
              alt={spark.author.name}
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 group-hover:ring-indigo-300 transition-all"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {spark.author.name}
                </span>
                {spark.author.compatibilityScore && spark.author.compatibilityScore > 80 && (
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                    title="Collaboration Compatibility"
                  >
                    {spark.author.compatibilityScore}% Synergy
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>{spark.author.handle}</span>
                <span>•</span>
                <span>{spark.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
          </div>
        </div>

        {/* Evolution note if remix */}
        {spark.evolutionNote && (
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-800 flex items-center justify-between gap-2 font-mono">
            <div className="flex items-center gap-2 truncate">
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{spark.evolutionNote}</span>
            </div>
            {hasParent && onInspectDiff && (
              <button
                onClick={() => onInspectDiff(spark)}
                className="shrink-0 text-[10px] font-bold text-indigo-600 hover:text-indigo-900 flex items-center gap-1 underline cursor-pointer"
                title="Inspect what changed in this mutation"
              >
                <FileDiff className="w-3 h-3" />
                Diff
              </button>
            )}
          </div>
        )}

        {/* Spark Title */}
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 leading-snug mb-2 transition-colors">
          {spark.title}
        </h3>

        {/* Spark Content */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
          {spark.content}
        </p>

        {/* Multi-Dimensional Intellectual Reactions (Next-Gen Social Innovation) */}
        <div className="mb-4 p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-1 text-[11px] font-mono">
          <button
            onClick={() => handleReaction('paradigmShift')}
            aria-label="Paradigm Shift reaction"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeReaction === 'paradigmShift'
                ? 'bg-amber-100 text-amber-800 scale-105'
                : 'hover:bg-white text-slate-600 hover:text-amber-700'
            }`}
            title="Paradigm Shift: Radically novel mental model"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold">{reactions.paradigmShift}</span>
          </button>

          <button
            onClick={() => handleReaction('contrarian')}
            aria-label="Contrarian critique reaction"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeReaction === 'contrarian'
                ? 'bg-rose-100 text-rose-800 scale-105'
                : 'hover:bg-white text-slate-600 hover:text-rose-700'
            }`}
            title="Contrarian Spark: Critical counter-narrative"
          >
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-bold">{reactions.contrarian}</span>
          </button>

          <button
            onClick={() => handleReaction('empiricalRigor')}
            aria-label="Empirical rigor reaction"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeReaction === 'empiricalRigor'
                ? 'bg-blue-100 text-blue-800 scale-105'
                : 'hover:bg-white text-slate-600 hover:text-blue-700'
            }`}
            title="Empirical Rigor: Technically & scientifically sound"
          >
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-bold">{reactions.empiricalRigor}</span>
          </button>

          <button
            onClick={() => handleReaction('moonshot')}
            aria-label="Moonshot breakthrough reaction"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
              activeReaction === 'moonshot'
                ? 'bg-purple-100 text-purple-800 scale-105'
                : 'hover:bg-white text-slate-600 hover:text-purple-700'
            }`}
            title="Moonshot: 10x breakthrough potential"
          >
            <Rocket className="w-3.5 h-3.5 text-purple-500" />
            <span className="font-bold">{reactions.moonshot}</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {spark.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 border border-slate-200 text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Evolution Telemetry & Actions */}
      <div className="pt-3 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-3">
          <div className="flex items-center gap-3">
            {/* Energy Flame Button */}
            <button
              onClick={handleIgnite}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all cursor-pointer ${
                ignited
                  ? 'bg-amber-100 text-amber-800 scale-105'
                  : 'hover:bg-amber-50 text-amber-700'
              }`}
              title="Ignite Spark Energy"
            >
              <Flame className={`w-3.5 h-3.5 text-amber-600 ${ignited ? 'animate-bounce' : ''}`} />
              <span className="font-bold">{spark.energy}%</span>
            </button>

            {/* Remix Count */}
            <div className="flex items-center gap-1" title="Remixes created from this idea">
              <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
              <span>{spark.remixCount} Remixes</span>
            </div>

            {/* Merge Count */}
            <div className="flex items-center gap-1" title="Merged collaborative branches">
              <GitMerge className="w-3.5 h-3.5 text-violet-600" />
              <span>{spark.mergeCount} Merges</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {hasParent && onInspectDiff && (
              <button
                onClick={() => onInspectDiff(spark)}
                className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Inspect Genetic Mutation Diff"
                aria-label="Inspect Mutation Diff"
              >
                <FileDiff className="w-3.5 h-3.5" />
              </button>
            )}
            {onExportPaper && (
              <button
                onClick={() => onExportPaper(spark)}
                className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Export Academic Paper & Lineage Tree"
                aria-label="Export Academic Paper"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Share Idea Link"
              aria-label="Share idea link"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Remix CTA */}
          <button
            id={`remix-btn-${spark.id}`}
            onClick={() => {
              soundEffects.playRemixBranch();
              onRemix(spark);
            }}
            aria-label={`Remix idea ${spark.title}`}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all cursor-pointer active:scale-95"
          >
            <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
            <span>Remix</span>
          </button>

          {/* Merge CTA */}
          <button
            id={`merge-btn-${spark.id}`}
            onClick={() => {
              soundEffects.playMergeFusion();
              onMerge(spark);
            }}
            aria-label={`Merge idea ${spark.title}`}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-700 transition-all cursor-pointer active:scale-95"
          >
            <GitMerge className="w-3.5 h-3.5 text-violet-600" />
            <span>Merge</span>
          </button>

          {/* View Evolution Graph */}
          <button
            id={`graph-btn-${spark.id}`}
            onClick={() => onViewGraph(spark)}
            aria-label={`View lineage tree for ${spark.title}`}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer active:scale-95"
          >
            <span>Tree</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </article>
  );
};

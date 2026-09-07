import React, { useState } from 'react';
import { Spark, SparkAuthor } from '../types';
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
} from 'lucide-react';

interface SparkCardProps {
  spark: Spark;
  onRemix: (spark: Spark) => void;
  onMerge: (spark: Spark) => void;
  onViewGraph: (spark: Spark) => void;
  onIgniteEnergy: (sparkId: string) => void;
  worldColor?: string;
  isCompact?: boolean;
}

export const SparkCard: React.FC<SparkCardProps> = ({
  spark,
  onRemix,
  onMerge,
  onViewGraph,
  onIgniteEnergy,
  worldColor = '#6366f1',
  isCompact = false,
}) => {
  const [ignited, setIgnited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleIgnite = () => {
    setIgnited(true);
    onIgniteEnergy(spark.id);
    setTimeout(() => setIgnited(false), 800);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
    <div
      id={`spark-card-${spark.id}`}
      className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Author Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <img
              src={spark.author.avatar}
              alt={spark.author.name}
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
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-800 flex items-center gap-2 font-mono">
            <CornerDownRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{spark.evolutionNote}</span>
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

          <button
            onClick={handleShare}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            title="Share Idea Link"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Remix CTA */}
          <button
            id={`remix-btn-${spark.id}`}
            onClick={() => onRemix(spark)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all cursor-pointer active:scale-95"
          >
            <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
            <span>Remix</span>
          </button>

          {/* Merge CTA */}
          <button
            id={`merge-btn-${spark.id}`}
            onClick={() => onMerge(spark)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-700 transition-all cursor-pointer active:scale-95"
          >
            <GitMerge className="w-3.5 h-3.5 text-violet-600" />
            <span>Merge</span>
          </button>

          {/* View Evolution Graph */}
          <button
            id={`graph-btn-${spark.id}`}
            onClick={() => onViewGraph(spark)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer active:scale-95"
          >
            <span>Tree</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

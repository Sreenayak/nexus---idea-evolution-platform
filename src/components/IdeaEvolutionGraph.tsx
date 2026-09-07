import React, { useState } from 'react';
import { Spark, SocialWorld, RemixType } from '../types';
import {
  GitBranch,
  GitMerge,
  Sparkles,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  FolderGit2,
  User,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Info,
  CornerDownRight,
  Search,
} from 'lucide-react';

interface IdeaEvolutionGraphProps {
  rootSpark?: Spark;
  allSparks?: Spark[];
  sparks?: Spark[];
  worlds?: SocialWorld[];
  selectedSparkId?: string;
  onSelectSpark?: (spark: Spark) => void;
  onRemixFromNode?: (spark: Spark) => void;
  onRemixSpark?: (spark: Spark) => void;
  onMergeBranches?: (spark1: Spark, spark2: Spark) => void;
  onMergeSpark?: (spark: Spark) => void;
  onIgniteEnergy?: (sparkId: string) => void;
}

export const IdeaEvolutionGraph: React.FC<IdeaEvolutionGraphProps> = ({
  rootSpark: propRootSpark,
  allSparks: propAllSparks,
  sparks: propSparks,
  worlds = [],
  selectedSparkId: propSelectedSparkId,
  onSelectSpark,
  onRemixFromNode,
  onRemixSpark,
  onMergeBranches,
  onMergeSpark,
  onIgniteEnergy,
}) => {
  const sparksList = propAllSparks || propSparks || [];

  // All root sparks (original sparks that form roots of lineages)
  const rootSparks = sparksList.filter(
    (s) => s.branchType === 'original' || !s.parentSparkId
  );

  // Active root spark determination
  const initialRoot =
    propRootSpark ||
    (propSelectedSparkId ? sparksList.find((s) => s.id === propSelectedSparkId) : null) ||
    rootSparks[0] ||
    sparksList[0];

  const [activeRootId, setActiveRootId] = useState<string>(initialRoot ? initialRoot.id : '');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    propSelectedSparkId || (initialRoot ? initialRoot.id : '')
  );

  // Active root spark
  const currentRootSpark =
    sparksList.find((s) => s.id === activeRootId) || initialRoot || sparksList[0];

  // Handler helpers
  const handleRemix = onRemixFromNode || onRemixSpark || (() => {});
  const handleMerge = onMergeBranches || onMergeSpark || (() => {});

  if (!currentRootSpark) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 shadow-xs">
        No idea lineages found. Ignite a spark to begin evolving ideas!
      </div>
    );
  }

  // Find all sparks associated with this lineage
  const directRemixes = sparksList.filter(
    (s) => s.parentSparkId === currentRootSpark.id && s.branchType === 'remix'
  );

  const mergedConcepts = sparksList.filter(
    (s) =>
      s.status === 'project' ||
      s.branchType === 'merged' ||
      s.branchType === 'merge' ||
      (s.mergedFromIds && s.mergedFromIds.includes(currentRootSpark.id)) ||
      (s.mergedFromIds &&
        s.mergedFromIds.some((id) => directRemixes.some((r) => r.id === id)))
  );

  const selectedSpark =
    sparksList.find((s) => s.id === selectedNodeId) || currentRootSpark;

  const worldOfRoot = worlds.find((w) => w.id === currentRootSpark.worldId);

  const handleSelectLineage = (rootId: string) => {
    setActiveRootId(rootId);
    setSelectedNodeId(rootId);
    const newRoot = sparksList.find((s) => s.id === rootId);
    if (newRoot && onSelectSpark) {
      onSelectSpark(newRoot);
    }
  };

  const handleNodeClick = (spark: Spark) => {
    setSelectedNodeId(spark.id);
    if (onSelectSpark) {
      onSelectSpark(spark);
    }
  };

  return (
    <div
      id="idea-evolution-graph-container"
      className="w-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Top Lineage Selector & Controls Bar */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <GitBranch className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
              Idea Evolution Graph
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
              Directed Acyclic Graph (DAG)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Witness how human minds remix, branch, and merge ideas from raw Sparks into collaborative projects.
          </p>
        </div>

        {/* Tree Topology Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Origin Spark</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Remix Branch</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Merged Synthesis</span>
          </div>
        </div>
      </div>

      {/* Lineage Switcher Tab Bar */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
          Select Lineage:
        </span>
        {rootSparks.map((spark) => {
          const isCurrent = currentRootSpark.id === spark.id;
          return (
            <button
              key={spark.id}
              onClick={() => handleSelectLineage(spark.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all duration-200 cursor-pointer font-medium flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>{spark.title.slice(0, 32)}...</span>
              <span className={`text-[10px] font-mono px-1 rounded ${isCurrent ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'}`}>
                {spark.remixCount} branches
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Evolution Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[580px]">
        {/* Visual Graph Diagram Area */}
        <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-x-auto bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* STAGE 1: ORIGINAL ROOT SPARK */}
          <div className="flex flex-col items-center w-full z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-600" />
                1. Original Spark Origin
              </span>
              {worldOfRoot && (
                <span className="text-[10px] font-mono text-slate-500">
                  in {worldOfRoot.name}
                </span>
              )}
            </div>

            <button
              id={`graph-node-${currentRootSpark.id}`}
              onClick={() => handleNodeClick(currentRootSpark)}
              className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left shadow-xs cursor-pointer ${
                selectedNodeId === currentRootSpark.id
                  ? 'bg-sky-50/60 border-sky-400 ring-2 ring-sky-200'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={currentRootSpark.author.avatar}
                    alt={currentRootSpark.author.name}
                    className="w-6 h-6 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    {currentRootSpark.author.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200">
                  ROOT SPARK
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug">
                {currentRootSpark.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentRootSpark.content}
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <Flame className="w-3 h-3 text-amber-600" />
                  {currentRootSpark.energy}% Energy Resonance
                </span>
                <span>{currentRootSpark.remixCount} Active Remixes</span>
              </div>
            </button>
          </div>

          {/* Connector stem from root down to remix layer */}
          <div className="w-0.5 h-10 bg-gradient-to-b from-sky-400 to-indigo-500 relative my-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 -translate-x-1 absolute bottom-0 animate-ping" />
          </div>

          {/* Branching Header */}
          <div className="text-[10px] font-mono tracking-widest uppercase text-indigo-700 mb-3 font-bold z-10 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" />
            2. Divergent Community Remixes ({directRemixes.length} Branches)
          </div>

          {/* STAGE 2: COMMUNITY REMIX BRANCHES */}
          {directRemixes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full max-w-3xl z-10 mb-4">
              {directRemixes.map((remix, index) => {
                const isSelected = selectedNodeId === remix.id;
                const badgeLetter = String.fromCharCode(65 + index);

                return (
                  <button
                    key={remix.id}
                    id={`graph-node-${remix.id}`}
                    onClick={() => handleNodeClick(remix)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 shadow-xs cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                          BRANCH {badgeLetter} • {remix.remixType?.toUpperCase() || 'REMIX'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {remix.author.name.split(' ')[0]}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mb-1.5 leading-tight">
                        {remix.title}
                      </h5>
                      {remix.evolutionNote && (
                        <p className="text-[11px] text-indigo-700 font-mono line-clamp-1 mb-2">
                          ↳ {remix.evolutionNote}
                        </p>
                      )}
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="capitalize text-indigo-600 font-medium">
                        {remix.remixType || 'extend'}
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-700 font-bold">
                        <Flame className="w-3 h-3 text-amber-600" />
                        {remix.energy}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-dashed border-slate-300 text-center max-w-sm text-xs text-slate-500 font-mono mb-4 z-10 bg-white">
              No remix branches yet. Be the first to branch this idea!
              <button
                onClick={() => handleRemix(currentRootSpark)}
                className="mt-2 block mx-auto px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all font-semibold cursor-pointer"
              >
                + Create First Remix
              </button>
            </div>
          )}

          {/* Connector down to Merge Layer */}
          <div className="w-0.5 h-10 bg-gradient-to-b from-indigo-500 to-purple-500 relative my-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 -translate-x-1 absolute bottom-0" />
          </div>

          {/* STAGE 3: MERGE CONVERGENCE */}
          <div className="flex flex-col items-center w-full z-10 max-w-lg">
            <span className="text-[10px] font-mono tracking-widest uppercase text-violet-700 mb-3 font-bold flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5" />
              3. Synthesis: Merged Collaborative Deliverable
            </span>

            {mergedConcepts.length > 0 ? (
              mergedConcepts.map((merged) => {
                const isSelected = selectedNodeId === merged.id;
                return (
                  <button
                    key={merged.id}
                    id={`graph-node-${merged.id}`}
                    onClick={() => handleNodeClick(merged)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left shadow-xs cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50/70 border-purple-400 ring-2 ring-purple-200'
                        : 'bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                          <FolderGit2 className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          Cross-Branch Synthesis
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ACTIVE PROJECT
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug">
                      {merged.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {merged.content}
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="text-violet-700 font-medium">Synthesized Project</span>
                      <span className="flex items-center gap-1 text-amber-700 font-bold">
                        <Flame className="w-3 h-3 text-amber-600" />
                        {merged.energy}% Resonance
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-5 rounded-2xl border border-dashed border-slate-300 text-center max-w-sm text-xs text-slate-500 font-mono bg-white">
                <p className="mb-2">No branches merged yet.</p>
                {directRemixes.length >= 2 ? (
                  <button
                    onClick={() => handleMerge(directRemixes[0], directRemixes[1])}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-all font-semibold cursor-pointer"
                  >
                    Merge Remix A & B into Project
                  </button>
                ) : (
                  <span className="text-slate-400">
                    Create 2 remix branches to synthesize them into a merged project.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Node Details & Action Inspector */}
        <div className="p-6 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                Node Inspector
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                ID: {selectedSpark.id.slice(0, 16)}
              </span>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 mb-4 shadow-xs">
              <img
                src={selectedSpark.author.avatar}
                alt={selectedSpark.author.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {selectedSpark.author.name}
                </h4>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedSpark.author.role}
                </span>
              </div>
            </div>

            {/* Node Status Badge */}
            <div className="mb-3">
              {selectedSpark.status === 'project' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  Synthesized Project Node
                </span>
              ) : selectedSpark.branchType === 'remix' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Remix Branch • {selectedSpark.remixType?.toUpperCase() || 'EXTEND'}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                  Root Idea Origin
                </span>
              )}
            </div>

            {/* Title & full description */}
            <h4 className="text-base font-bold font-display text-slate-900 mb-2 leading-snug">
              {selectedSpark.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
              {selectedSpark.content}
            </p>

            {/* Evolution note if present */}
            {selectedSpark.evolutionNote && (
              <div className="mb-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block mb-1">
                  Evolution Vector:
                </span>
                <p className="text-xs text-indigo-900">
                  {selectedSpark.evolutionNote}
                </p>
              </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-3 rounded-xl bg-white border border-slate-200 mb-4 shadow-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Energy</span>
                <span className="font-bold text-amber-600">{selectedSpark.energy}%</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Remixes</span>
                <span className="font-bold text-indigo-600">{selectedSpark.remixCount}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Merges</span>
                <span className="font-bold text-purple-600">{selectedSpark.mergeCount}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedSpark.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            {onIgniteEnergy && (
              <button
                onClick={() => onIgniteEnergy(selectedSpark.id)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 transition-all cursor-pointer active:scale-95"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Ignite Energy (+4%)</span>
              </button>
            )}

            <button
              id="node-inspector-remix-btn"
              onClick={() => handleRemix(selectedSpark)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer active:scale-95"
            >
              <GitBranch className="w-4 h-4" />
              <span>Remix from This Node</span>
            </button>

            {directRemixes.length >= 2 && (
              <button
                id="node-inspector-merge-btn"
                onClick={() => handleMerge(directRemixes[0], directRemixes[1])}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 transition-all cursor-pointer active:scale-95"
              >
                <GitMerge className="w-4 h-4 text-purple-600" />
                <span>Merge Remix A & B into Project</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

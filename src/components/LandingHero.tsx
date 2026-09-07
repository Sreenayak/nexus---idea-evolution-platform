import React, { useState } from 'react';
import {
  Orbit,
  Globe2,
  GitBranch,
  GitMerge,
  Sparkles,
  Trophy,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface LandingHeroProps {
  onEnterUniverse: () => void;
  onExploreEvolution: () => void;
  onOpenCreateSpark: () => void;
  onNavigateToWorlds?: () => void;
  onExploreChallenges?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterUniverse,
  onExploreEvolution,
  onOpenCreateSpark,
  onNavigateToWorlds,
  onExploreChallenges,
}) => {
  const [comparisonMode, setComparisonMode] = useState<'traditional' | 'nexus'>('nexus');

  return (
    <div id="nexus-landing-view" className="space-y-12 sm:space-y-16 py-6 sm:py-10">
      {/* Primary Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle luminous backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-200/50 via-sky-200/40 to-teal-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs font-mono mb-6 shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
          <span className="font-semibold">Next-Gen Collaborative Human Network</span>
        </div>

        {/* Big Impactful Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.1] mb-6">
          We didn't build another place to{' '}
          <span className="text-slate-400 line-through decoration-rose-500/80 decoration-4">
            scroll
          </span>
          .<br />
          We built a place where{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
            ideas evolve through people
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          NEXUS replaces passive feeds and vanity follower counts with interactive <strong>Social Worlds</strong>, evolving <strong>Sparks</strong>, divergent <strong>Remixes</strong>, and collaborative <strong>Merges</strong>.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            id="hero-enter-universe-btn"
            onClick={onEnterUniverse}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <Orbit className="w-4 h-4 text-white" />
            <span>Enter The Universe</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          {onNavigateToWorlds && (
            <button
              id="hero-explore-worlds-btn"
              onClick={onNavigateToWorlds}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-xs hover:border-slate-300 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <Globe2 className="w-4 h-4 text-sky-600" />
              <span>Explore Social Worlds</span>
            </button>
          )}

          <button
            id="hero-explore-tree-btn"
            onClick={onExploreEvolution}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-xs hover:border-slate-300 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <GitBranch className="w-4 h-4 text-indigo-600" />
            <span>Idea Evolution Graph</span>
          </button>

          <button
            id="hero-create-spark-btn"
            onClick={onOpenCreateSpark}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Ignite Spark</span>
          </button>
        </div>
      </div>

      {/* The 5-Step Idea Evolution Progression Strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm backdrop-blur-xl">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              The Evolution Progression
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1">
              How Social Interaction Works in NEXUS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {[
              {
                step: '01',
                title: 'Spark',
                desc: 'A question or hypothesis formulated to invite collaborative friction.',
                icon: Sparkles,
                color: 'text-sky-600',
                bg: 'bg-sky-50 border-sky-200/80',
              },
              {
                step: '02',
                title: 'Remix',
                desc: 'Extend, challenge, or specialize someone’s perspective with explicit attribution.',
                icon: GitBranch,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50 border-indigo-200/80',
              },
              {
                step: '03',
                title: 'Merge',
                desc: 'Synthesize related divergent branches into a unified joint prototype.',
                icon: GitMerge,
                color: 'text-violet-600',
                bg: 'bg-violet-50 border-violet-200/80',
              },
              {
                step: '04',
                title: 'Collaborate',
                desc: 'Form high-synergy micro-teams based on verified complementary skills.',
                icon: Users,
                color: 'text-pink-600',
                bg: 'bg-pink-50 border-pink-200/80',
              },
              {
                step: '05',
                title: 'Create',
                desc: 'Ship functional open-source deliverables through 48h community sprints.',
                icon: Trophy,
                color: 'text-emerald-700',
                bg: 'bg-emerald-50 border-emerald-200/80',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className={`p-4 rounded-2xl border ${item.bg} flex flex-col justify-between relative group hover:shadow-xs transition-all`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {item.step}
                      </span>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <h3 className="text-sm font-bold font-display text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Paradigm Comparison (Traditional Social Media vs NEXUS) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                Core Paradigm Shift
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
                Why NEXUS is Built Differently
              </h2>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                onClick={() => setComparisonMode('traditional')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  comparisonMode === 'traditional'
                    ? 'bg-white text-rose-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Traditional Feed
              </button>
              <button
                onClick={() => setComparisonMode('nexus')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  comparisonMode === 'nexus'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NEXUS Paradigm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Traditional Card */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                comparisonMode === 'traditional'
                  ? 'bg-rose-50/60 border-rose-200 ring-2 ring-rose-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-700 text-xs font-mono font-bold uppercase mb-4">
                <XCircle className="w-4 h-4 text-rose-600" />
                Conventional Social Networks
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-mono font-bold">✕</span>
                  <span><strong>Passive Consumption:</strong> Infinite algorithmic vertical feeds optimized for screen time and engagement traps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-mono font-bold">✕</span>
                  <span><strong>Vanity Followers:</strong> Reputation reduced to superficial like counts, follow ratios, and hot takes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-mono font-bold">✕</span>
                  <span><strong>Dead-End Threads:</strong> Posts sink within hours; comments are disconnected noise without cumulative progress.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-mono font-bold">✕</span>
                  <span><strong>Isolated Builders:</strong> Minds working on the exact same breakthroughs remain unknown to each other.</span>
                </li>
              </ul>
            </div>

            {/* NEXUS Card */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                comparisonMode === 'nexus'
                  ? 'bg-indigo-50/60 border-indigo-200 ring-2 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 text-indigo-700 text-xs font-mono font-bold uppercase mb-4">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                The NEXUS Collaborative Engine
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-indigo-600 font-mono font-bold">✓</span>
                  <span><strong>Living Social Worlds:</strong> Enter dimensional hubs with real-time Community Pulses (Energy, Curiosity, Creativity, Collaboration).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-indigo-600 font-mono font-bold">✓</span>
                  <span><strong>Activity-Based Synergy:</strong> "You & Alex co-evolved 4 ideas. 94% Synergy" instead of vanity follower counts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-indigo-600 font-mono font-bold">✓</span>
                  <span><strong>Idea Evolution DAG:</strong> Sparks branch into Remixes, merge into synthesized hypotheses, and culminate in 48h Sprints.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-indigo-600 font-mono font-bold">✓</span>
                  <span><strong>NOVA AI Copilot:</strong> Flags unaddressed literature vacuums, predicts collaborator synergy, and suggests cross-world merges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

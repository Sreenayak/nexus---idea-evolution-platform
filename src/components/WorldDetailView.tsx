import React, { useState } from 'react';
import { SocialWorld, Spark, Challenge, NexusUser } from '../types';
import { CommunityPulse } from './CommunityPulse';
import { SparkCard } from './SparkCard';
import {
  Cpu,
  Rocket,
  Palette,
  Atom,
  Sparkles,
  Gamepad2,
  Dna,
  Globe2,
  PlusCircle,
  Trophy,
  Filter,
  ArrowLeft,
  Share2,
  Users,
  Flame,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface WorldDetailViewProps {
  world: SocialWorld;
  allWorlds: SocialWorld[];
  sparks: Spark[];
  challenges: Challenge[];
  currentUser: NexusUser;
  onBackToUniverse: () => void;
  onBackToWorlds?: () => void;
  onSelectOtherWorld: (worldId: string) => void;
  onOpenCreateSparkInWorld: (worldId: string) => void;
  onRemixSpark: (spark: Spark) => void;
  onMergeSpark: (spark: Spark) => void;
  onViewGraph: (spark: Spark) => void;
  onIgniteEnergy: (sparkId: string) => void;
  onJoinChallenge: (challengeId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Rocket,
  Palette,
  Atom,
  Sparkles,
  Gamepad2,
  Dna,
  Globe2,
};

export const WorldDetailView: React.FC<WorldDetailViewProps> = ({
  world,
  allWorlds,
  sparks,
  challenges,
  currentUser,
  onBackToUniverse,
  onBackToWorlds,
  onSelectOtherWorld,
  onOpenCreateSparkInWorld,
  onRemixSpark,
  onMergeSpark,
  onViewGraph,
  onIgniteEnergy,
  onJoinChallenge,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sparks' | 'remixes' | 'projects'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const Icon = ICON_MAP[world.iconName] || Globe2;

  // Filter sparks for this world
  const worldSparks = sparks.filter((s) => s.worldId === world.id);
  const worldChallenges = challenges.filter((c) => c.worldId === world.id);

  const displayedSparks = worldSparks.filter((s) => {
    if (activeFilter === 'sparks' && s.branchType !== 'original') return false;
    if (activeFilter === 'remixes' && s.branchType !== 'remix') return false;
    if (activeFilter === 'projects' && s.status !== 'project') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q) ||
        s.author.name.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const connectedWorlds = allWorlds.filter((w) =>
    world.connectedWorldIds.includes(w.id)
  );

  return (
    <div id={`world-detail-view-${world.id}`} className="space-y-8">
      {/* Back button and navigation breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToUniverse}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Universe Map</span>
          </button>
          {onBackToWorlds && (
            <button
              onClick={onBackToWorlds}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-sky-600" />
              <span>All Social Worlds</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>Dimension:</span>
          <span className="font-bold text-indigo-600">{world.category}</span>
        </div>
      </div>

      {/* World Hero Banner */}
      <div
        className="relative p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              style={{
                backgroundColor: `${world.accentColor}18`,
                border: `2px solid ${world.accentColor}50`,
              }}
            >
              <Icon className="w-8 h-8" style={{ color: world.accentColor }} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                  {world.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700">
                  {world.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Realm
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-700 mb-1">
                {world.tagline}
              </p>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {world.description}
              </p>
            </div>
          </div>

          {/* Quick stats and Ignite Spark CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="font-bold text-slate-900 block text-sm">
                  {world.activeParticipants.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Minds Inside</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="font-bold text-indigo-600 block text-sm">
                  {worldSparks.length}
                </span>
                <span className="text-[10px] text-slate-500">Active Sparks</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="font-bold text-emerald-600 block text-sm">
                  {world.activeProjects}
                </span>
                <span className="text-[10px] text-slate-500">Collaborations</span>
              </div>
            </div>

            <button
              id={`world-ignite-spark-btn-${world.id}`}
              onClick={() => onOpenCreateSparkInWorld(world.id)}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md hover:brightness-95 active:scale-95"
              style={{ backgroundColor: world.accentColor }}
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Ignite Spark in {world.name}</span>
            </button>
          </div>
        </div>

        {/* Interconnected Dimensions Links */}
        {connectedWorlds.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <span>Harmonically Linked Worlds:</span>
            {connectedWorlds.map((cw) => (
              <button
                key={cw.id}
                onClick={() => onSelectOtherWorld(cw.id)}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cw.accentColor }}
                />
                <span>{cw.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Community Pulse Component */}
      <CommunityPulse pulse={world.pulse} worldName={world.name} />

      {/* World Active Challenges */}
      {worldChallenges.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wider">
                Ongoing 48h Challenges in {world.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {worldChallenges.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worldChallenges.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {c.rewardBadge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {c.deadline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                      <span>Progress</span>
                      <span className="text-amber-700 font-bold">{c.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${c.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-mono text-slate-500">
                    {c.participantCount} Minds joined
                  </span>
                  <button
                    onClick={() => onJoinChallenge(c.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all cursor-pointer"
                  >
                    Join Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sparks Feed Section */}
      <div className="space-y-4">
        {/* Sparks Header & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold font-display text-slate-900">
              Evolving Sparks Stream
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
              {displayedSparks.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Ideas
              </button>
              <button
                onClick={() => setActiveFilter('sparks')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'sparks'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roots Only
              </button>
              <button
                onClick={() => setActiveFilter('remixes')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'remixes'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Remixes
              </button>
              <button
                onClick={() => setActiveFilter('projects')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeFilter === 'projects'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Projects
              </button>
            </div>
          </div>
        </div>

        {/* Sparks Grid */}
        {displayedSparks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedSparks.map((spark) => (
              <SparkCard
                key={spark.id}
                spark={spark}
                worldColor={world.accentColor}
                onRemix={onRemixSpark}
                onMerge={onMergeSpark}
                onViewGraph={onViewGraph}
                onIgniteEnergy={onIgniteEnergy}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-dashed border-slate-200 text-center shadow-xs">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 mb-1">
              No Sparks match your current filter
            </h4>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
              Be the first to formulate an evocative hypothesis in this dimension.
            </p>
            <button
              onClick={() => onOpenCreateSparkInWorld(world.id)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer transition-all shadow-xs"
            >
              Ignite First Spark
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SocialWorld } from '../types';
import {
  Cpu,
  Rocket,
  Palette,
  Atom,
  Sparkles,
  Gamepad2,
  Dna,
  Globe2,
  Users,
  Flame,
  ArrowRight,
  PlusCircle,
  Trophy,
  Filter,
  Search,
  Zap,
} from 'lucide-react';

interface WorldsDirectoryProps {
  worlds: SocialWorld[];
  onSelectWorld: (worldId: string) => void;
  onOpenCreateSpark: (worldId: string) => void;
  onViewChallenges: (worldId: string) => void;
  searchQuery?: string;
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

export const WorldsDirectory: React.FC<WorldsDirectoryProps> = ({
  worlds,
  onSelectWorld,
  onOpenCreateSpark,
  onViewChallenges,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Dimensions');
  const [localSearch, setLocalSearch] = useState<string>('');

  const activeQuery = searchQuery || localSearch;

  const categories = [
    'All Dimensions',
    'AI & Systems',
    'Startups & Venture',
    'Design & Spatial',
    'Deep Science',
    'Creative & Media',
    'Gaming & Metaverse',
    'BioTech',
  ];

  const filteredWorlds = worlds.filter((w) => {
    if (selectedCategory !== 'All Dimensions' && w.category !== selectedCategory) {
      return false;
    }
    if (activeQuery.trim()) {
      const q = activeQuery.toLowerCase();
      return (
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.trendingKeywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalParticipants = worlds.reduce((acc, w) => acc + w.activeParticipants, 0);
  const totalSparks = worlds.reduce((acc, w) => acc + w.activeSparks, 0);
  const totalProjects = worlds.reduce((acc, w) => acc + w.activeProjects, 0);

  return (
    <div id="nexus-social-worlds-directory" className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Globe2 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                Social Worlds Directory
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                7 Active Dimensions
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Living, self-organizing knowledge hubs. Instead of static topic forums, each Social World pulses with collective curiosity, evolving ideas, and 48-hour collaborative challenge teams.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block mb-0.5">Participants</span>
              <span className="text-lg font-bold text-slate-900">
                {totalParticipants.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block mb-0.5">Live Sparks</span>
              <span className="text-lg font-bold text-indigo-600">{totalSparks}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block mb-0.5">Projects</span>
              <span className="text-lg font-bold text-emerald-600">{totalProjects}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Local Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter worlds or topics..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorlds.map((world) => {
          const Icon = ICON_MAP[world.iconName] || Globe2;

          return (
            <div
              key={world.id}
              id={`world-card-${world.id}`}
              className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              {/* Top colored accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${world.accentColor}, transparent)`,
                }}
              />

              <div>
                {/* World Header with Icon & Energy */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${world.accentColor}15`,
                        border: `1px solid ${world.accentColor}40`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: world.accentColor }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {world.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        {world.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 border"
                    style={{
                      backgroundColor: `${world.accentColor}12`,
                      color: world.accentColor,
                      borderColor: `${world.accentColor}30`,
                    }}
                  >
                    <Flame className="w-3 h-3" />
                    {world.pulse.energy}% Energy
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                  {world.description}
                </p>

                {/* Community Pulse Metric Bars */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Zap className="w-3 h-3 text-indigo-600" />
                      Community Vitality
                    </span>
                    <span className="text-slate-500">Live Pulse</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Curiosity</span>
                        <span className="font-bold text-sky-600">{world.pulse.curiosity}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${world.pulse.curiosity}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Creativity</span>
                        <span className="font-bold text-indigo-600">{world.pulse.creativity}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${world.pulse.creativity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics strip */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono p-3 rounded-xl bg-slate-50 border border-slate-200 mb-5">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Active Minds</span>
                    <span className="font-bold text-slate-800">
                      {world.activeParticipants}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Live Sparks</span>
                    <span className="font-bold text-indigo-600">{world.activeSparks}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Projects</span>
                    <span className="font-bold text-emerald-600">{world.activeProjects}</span>
                  </div>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {world.trendingKeywords.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  id={`enter-world-btn-${world.id}`}
                  onClick={() => onSelectWorld(world.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition-all cursor-pointer active:scale-95 group/btn"
                >
                  <span>Enter World</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenCreateSpark(world.id)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                  title="Ignite Spark in this World"
                >
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                </button>

                <button
                  onClick={() => onViewChallenges(world.id)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-all cursor-pointer"
                  title="View 48h Challenges in this World"
                >
                  <Trophy className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

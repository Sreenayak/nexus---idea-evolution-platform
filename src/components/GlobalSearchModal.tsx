import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  Globe2,
  Trophy,
  Users2,
  ArrowRight,
  Flame,
  GitBranch,
  Clock,
  Layers,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { SocialWorld, Spark, Challenge, ActivityConnection, NexusUser } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  worlds: SocialWorld[];
  sparks: Spark[];
  challenges: Challenge[];
  connections: ActivityConnection[];
  onSelectWorld: (worldId: string) => void;
  onSelectSpark: (spark: Spark) => void;
  onSelectChallenge: (challengeId: string) => void;
  onSelectPerson?: (user: NexusUser) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  query,
  onQueryChange,
  worlds,
  sparks,
  challenges,
  connections,
  onSelectWorld,
  onSelectSpark,
  onSelectChallenge,
  onSelectPerson,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'sparks' | 'worlds' | 'challenges' | 'people'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const cleanQuery = query.trim().toLowerCase();

  // Search results
  const filteredResults = useMemo(() => {
    if (!cleanQuery) {
      return {
        sparks: sparks.slice(0, 3),
        worlds: worlds.slice(0, 3),
        challenges: challenges.slice(0, 2),
        people: connections.map((c) => c.targetUser).slice(0, 3),
        totalCount: 0,
      };
    }

    const matchedSparks = sparks.filter(
      (s) =>
        s.title.toLowerCase().includes(cleanQuery) ||
        s.content.toLowerCase().includes(cleanQuery) ||
        s.author.name.toLowerCase().includes(cleanQuery) ||
        s.tags.some((t) => t.toLowerCase().includes(cleanQuery))
    );

    const matchedWorlds = worlds.filter(
      (w) =>
        w.name.toLowerCase().includes(cleanQuery) ||
        w.description.toLowerCase().includes(cleanQuery) ||
        w.category.toLowerCase().includes(cleanQuery) ||
        w.trendingKeywords.some((k) => k.toLowerCase().includes(cleanQuery))
    );

    const matchedChallenges = challenges.filter(
      (c) =>
        c.title.toLowerCase().includes(cleanQuery) ||
        c.description.toLowerCase().includes(cleanQuery) ||
        c.tags.some((t) => t.toLowerCase().includes(cleanQuery))
    );

    const matchedPeople = connections
      .map((c) => c.targetUser)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.handle.toLowerCase().includes(cleanQuery) ||
          p.role.toLowerCase().includes(cleanQuery) ||
          p.skills.some((s) => s.toLowerCase().includes(cleanQuery))
      );

    const totalCount =
      matchedSparks.length + matchedWorlds.length + matchedChallenges.length + matchedPeople.length;

    return {
      sparks: matchedSparks,
      worlds: matchedWorlds,
      challenges: matchedChallenges,
      people: matchedPeople,
      totalCount,
    };
  }, [cleanQuery, sparks, worlds, challenges, connections]);

  if (!isOpen) return null;

  const quickKeywords = [
    'Autonomous AI',
    'Neural Agents',
    'Bio-Synthetic',
    'Quantum',
    'Spatial',
    'DeSci',
    'Climate Tech',
  ];

  return (
    <div
      id="nexus-global-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 shadow-xs">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              id="global-search-input-field"
              type="text"
              placeholder="Search across Sparks, Social Worlds, Challenges, or People..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => onQueryChange('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block text-[11px] font-mono text-slate-400 border border-slate-200 rounded-md px-2 py-0.5 bg-slate-100">
              ESC to close
            </kbd>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              All {cleanQuery && `(${filteredResults.totalCount})`}
            </button>
            <button
              onClick={() => setFilterType('sparks')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'sparks'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Sparks ({filteredResults.sparks.length})
            </button>
            <button
              onClick={() => setFilterType('worlds')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'worlds'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Globe2 className="w-3 h-3" />
              Worlds ({filteredResults.worlds.length})
            </button>
            <button
              onClick={() => setFilterType('challenges')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'challenges'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Trophy className="w-3 h-3" />
              Challenges ({filteredResults.challenges.length})
            </button>
            <button
              onClick={() => setFilterType('people')}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'people'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users2 className="w-3 h-3" />
              People ({filteredResults.people.length})
            </button>
          </div>

          {cleanQuery && (
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Found {filteredResults.totalCount} matches
            </span>
          )}
        </div>

        {/* Quick Tag Pills for zero query */}
        {!cleanQuery && (
          <div className="px-5 py-2.5 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 shrink-0 font-medium">Trending keywords:</span>
            {quickKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => onQueryChange(kw)}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 transition-colors cursor-pointer shrink-0"
              >
                #{kw}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* No results message */}
          {cleanQuery && filteredResults.totalCount === 0 && (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-display">
                No matching results found for "{query}"
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for broader keywords such as "AI", "Quantum", "BioTech", or an author's name.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {quickKeywords.slice(0, 4).map((kw) => (
                  <button
                    key={kw}
                    onClick={() => onQueryChange(kw)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100"
                  >
                    Search "{kw}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 1: SPARKS */}
          {(filterType === 'all' || filterType === 'sparks') &&
            filteredResults.sparks.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Ideas & Sparks ({filteredResults.sparks.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredResults.sparks.map((spark) => (
                    <div
                      key={spark.id}
                      onClick={() => {
                        onSelectSpark(spark);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            {spark.branchType?.toUpperCase() || 'SPARK'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-500" /> {spark.energy}% Pulse
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                          {spark.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {spark.content}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate max-w-[140px]">by {spark.author.name}</span>
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          <span>View Lineage</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* SECTION 2: SOCIAL WORLDS */}
          {(filterType === 'all' || filterType === 'worlds') &&
            filteredResults.worlds.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-700 font-bold flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                    Social Worlds ({filteredResults.worlds.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredResults.worlds.map((world) => (
                    <div
                      key={world.id}
                      onClick={() => {
                        onSelectWorld(world.id);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3 text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 group-hover:scale-105 transition-transform">
                        <Globe2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                            {world.name}
                          </h4>
                          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 shrink-0">
                            {world.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {world.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-slate-400">
                          <span>{world.activeParticipants} minds</span>
                          <span>•</span>
                          <span>{world.activeSparks} active sparks</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* SECTION 3: SPRINT CHALLENGES */}
          {(filterType === 'all' || filterType === 'challenges') &&
            filteredResults.challenges.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-rose-700 font-bold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-rose-600" />
                    Sprint Challenges ({filteredResults.challenges.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredResults.challenges.map((chal) => (
                    <div
                      key={chal.id}
                      onClick={() => {
                        onSelectChallenge(chal.id);
                        onClose();
                      }}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                          Reward: {chal.rewardBadge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {chal.daysRemaining}d remaining
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-1">
                        {chal.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {chal.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{chal.participantCount} collaborators joined</span>
                        <span className="text-rose-600 font-semibold group-hover:underline">
                          Open Sprint →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* SECTION 4: COLLABORATORS / PEOPLE */}
          {(filterType === 'all' || filterType === 'people') &&
            filteredResults.people.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-pink-700 font-bold flex items-center gap-1.5">
                    <Users2 className="w-3.5 h-3.5 text-pink-600" />
                    Contributors & Researchers ({filteredResults.people.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredResults.people.map((person) => (
                    <div
                      key={person.id}
                      onClick={() => {
                        if (onSelectPerson) onSelectPerson(person);
                        onClose();
                      }}
                      className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3 text-left"
                    >
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shadow-2xs"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-pink-700 transition-colors truncate">
                            {person.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 truncate">
                            {person.handle}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{person.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {person.skills.slice(0, 2).map((sk) => (
                            <span
                              key={sk}
                              className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search matches across all active Social Worlds and evolutionary branches.</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-indigo-600 cursor-pointer"
          >
            Close Engine
          </button>
        </div>
      </div>
    </div>
  );
};

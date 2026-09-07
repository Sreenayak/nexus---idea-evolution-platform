import React, { useState } from 'react';
import { Challenge, SocialWorld, NexusUser } from '../types';
import {
  Trophy,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Filter,
} from 'lucide-react';

interface ChallengesListProps {
  challenges: Challenge[];
  worlds: SocialWorld[];
  currentUser: NexusUser;
  onJoinChallenge: (challengeId: string) => void;
  onSelectWorld?: (worldId: string) => void;
}

export const ChallengesList: React.FC<ChallengesListProps> = ({
  challenges,
  worlds,
  currentUser,
  onJoinChallenge,
  onSelectWorld,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [joinedChallengeIds, setJoinedChallengeIds] = useState<string[]>([
    'challenge-1',
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleJoin = (cId: string, title: string) => {
    if (joinedChallengeIds.includes(cId)) {
      setToastMessage(`You are already collaborating on "${title.slice(0, 30)}..."`);
    } else {
      setJoinedChallengeIds([...joinedChallengeIds, cId]);
      onJoinChallenge(cId);
      setToastMessage(`Joined sprint: "${title.slice(0, 35)}..."! Collaborative workspace unlocked.`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredChallenges = challenges.filter((c) => {
    if (selectedCategory === 'all') return true;
    return c.worldId === selectedCategory;
  });

  return (
    <div id="nexus-challenges-view" className="space-y-6">
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white border border-emerald-300 text-emerald-900 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <Trophy className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Collaborative Challenges & Sprints
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Ideas graduate from sparks into high-intensity shared challenges. Team up with complementary minds across Social Worlds to build concrete outcomes within 24 to 72 hours.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
              <span className="font-bold text-base block font-display">48-Hour</span>
              <span>Sprint Cycles</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              <span className="font-bold text-base block font-display text-slate-900">
                {challenges.length} Active
              </span>
              <span>Missions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-amber-600 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All Challenges ({challenges.length})
        </button>
        {worlds.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelectedCategory(w.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === w.id
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {w.name}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredChallenges.map((challenge) => {
          const world = worlds.find((w) => w.id === challenge.worldId);
          const isJoined = joinedChallengeIds.includes(challenge.id);

          return (
            <div
              key={challenge.id}
              id={`challenge-card-${challenge.id}`}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* World & Badge Chip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${world?.accentColor || '#f59e0b'}15`,
                        color: world?.accentColor || '#d97706',
                      }}
                    >
                      {world?.name || 'Cross-World'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 font-semibold">
                      <Trophy className="w-3 h-3 text-amber-600" />
                      {challenge.rewardBadge}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {challenge.deadline}
                  </span>
                </div>

                {/* Challenge Title */}
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                  {challenge.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {challenge.description}
                </p>

                {/* Target Outcome */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    Deliverable Target:
                  </span>
                  <span className="text-slate-800 font-mono font-medium">
                    {challenge.targetOutcome}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
                    <span>Sprint Milestone Progress</span>
                    <span className="font-bold text-amber-700">{challenge.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700"
                      style={{ width: `${challenge.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {challenge.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Participants & Join Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {challenge.participants.map((p, idx) => (
                      <img
                        key={idx}
                        src={p.avatar}
                        alt={p.name}
                        title={`${p.name} (${p.role})`}
                        className="inline-block w-7 h-7 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {challenge.participantCount}/{challenge.maxParticipants} Minds
                  </span>
                </div>

                <button
                  id={`join-challenge-btn-${challenge.id}`}
                  onClick={() => handleJoin(challenge.id, challenge.title)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                    isJoined
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs font-bold'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Collaborating</span>
                    </>
                  ) : (
                    <>
                      <span>Join Sprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { NexusUser, Spark } from '../types';
import {
  X,
  Globe2,
  Sparkles,
  GitBranch,
  Trophy,
  FolderGit2,
  Flame,
  Award,
  Shield,
  Layers,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: NexusUser;
  userSparks: Spark[];
  onSelectSpark: (spark: Spark) => void;
  onLogout?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  userSparks,
  onSelectSpark,
  onLogout,
}) => {
  if (!isOpen) return null;

  const contributionMetrics = [
    {
      label: 'Worlds Entered',
      value: user.stats.worldsEntered,
      icon: Globe2,
      color: 'text-indigo-600',
      border: 'border-slate-200',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Sparks Created',
      value: user.stats.sparksCreated,
      icon: Sparkles,
      color: 'text-amber-600',
      border: 'border-slate-200',
      bg: 'bg-amber-50',
    },
    {
      label: 'Ideas Remixed',
      value: user.stats.ideasRemixed,
      icon: GitBranch,
      color: 'text-sky-600',
      border: 'border-slate-200',
      bg: 'bg-sky-50',
    },
    {
      label: 'Challenges Completed',
      value: user.stats.challengesCompleted,
      icon: Trophy,
      color: 'text-rose-600',
      border: 'border-slate-200',
      bg: 'bg-rose-50',
    },
    {
      label: 'Projects Built',
      value: user.stats.projectsBuilt,
      icon: FolderGit2,
      color: 'text-emerald-600',
      border: 'border-slate-200',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div
      id="user-profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="user-profile-modal-container"
        className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto text-slate-900"
      >
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-bold transition-all cursor-pointer"
              title="Log out of session"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Log Out</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-3xl object-cover ring-2 ring-indigo-200 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white shadow-2xs">
              Active Catalyst
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold font-display text-slate-900">
                {user.name}
              </h2>
              <span className="text-xs font-mono text-indigo-600 font-semibold">{user.handle}</span>
            </div>
            <p className="text-xs font-mono text-slate-600 font-semibold mb-2">
              {user.role}
            </p>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>

        {/* Paradigm Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-700 font-bold block mb-0.5">
              YOUR NEXUS LEDGER
            </span>
            <span className="text-xs text-slate-600">
              Rankings and status are determined by collaborative contribution, not follower counts.
            </span>
          </div>
          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white text-indigo-700 border border-indigo-200 shadow-2xs whitespace-nowrap">
            Level 5 Architect
          </span>
        </div>

        {/* 5 Core Contribution Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {contributionMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl bg-slate-50 border ${m.border} flex flex-col items-center text-center justify-center shadow-2xs`}
              >
                <div className={`p-2 rounded-xl ${m.bg} ${m.color} mb-2`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                  {m.value}
                </span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Skills & Expertise Radar Tags */}
        <div className="mb-6">
          <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-2">
            Ecosystem Expertise & Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:border-indigo-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Badges / Accolades */}
        <div className="mb-6">
          <label className="block text-xs font-mono font-bold uppercase text-slate-500 mb-2">
            Earned Accolades
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-2xs"
              >
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    {badge.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authored & Remixed Sparks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">
              Recent Sparks & Remixes By {user.name.split(' ')[0]}
            </label>
            <span className="text-xs font-mono text-indigo-600 font-semibold">
              {userSparks.length} Contributions
            </span>
          </div>

          <div className="space-y-2.5">
            {userSparks.map((spark) => (
              <div
                key={spark.id}
                onClick={() => {
                  onSelectSpark(spark);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                      {spark.branchType === 'remix' ? 'Remix Branch' : 'Root Spark'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {spark.createdAt}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {spark.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 shrink-0 ml-3">
                  <span className="flex items-center gap-1 text-indigo-600 font-medium">
                    <GitBranch className="w-3.5 h-3.5" />
                    {spark.remixCount}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-medium">
                    <Flame className="w-3.5 h-3.5" />
                    {spark.energy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

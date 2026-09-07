import React, { useState } from 'react';
import { ActivityConnection, NexusUser } from '../types';
import {
  Users2,
  Sparkles,
  Zap,
  ArrowRight,
  GitBranch,
  CheckCircle2,
  Share2,
  MessageSquare,
  ShieldCheck,
  Flame,
  Globe2,
} from 'lucide-react';

interface ConnectionsViewProps {
  connections: ActivityConnection[];
  currentUser: NexusUser;
  onInitiateCollab: (targetUser: NexusUser) => void;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
  connections,
  currentUser,
  onInitiateCollab,
}) => {
  const [toast, setToast] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'collaborating' | 'exploring'>('all');

  const filteredConnections = connections.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.collaborationStatus === activeFilter;
  });

  const handleMessage = (name: string) => {
    setToast(`Opened encrypted collaborative channel with ${name}.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div id="nexus-connections-view" className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white border border-emerald-300 text-emerald-900 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Paradigm Explanation Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Users2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Activity-Based Connections
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                Anti-Follower Model
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We eliminated vanity followers and arbitrary like counts. Connections here originate when two minds repeatedly co-evolve Sparks, complement each other's skill gaps, and build challenges together.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-mono max-w-xs">
            <span className="block text-[10px] uppercase font-bold text-rose-700 mb-1">
              Traditional vs NEXUS:
            </span>
            <p className="text-slate-400 line-through text-[11px]">
              "Alex has 5,000 followers."
            </p>
            <p className="text-rose-900 font-bold text-xs mt-1">
              "You and Alex co-evolved 4 ideas. 94% Synergy."
            </p>
          </div>
        </div>
      </div>

      {/* Visual Radial Compatibility Network Preview */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wider">
              Your Synergy Field
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Node Center: <span className="text-indigo-600 font-bold">{currentUser.name}</span>
          </span>
        </div>

        {/* Synergistic Nodes Radar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {connections.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src={c.targetUser.avatar}
                  alt={c.targetUser.name}
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <span className="absolute -bottom-1 -right-1 px-1 rounded text-[9px] font-mono font-bold bg-emerald-600 text-white">
                  {c.compatibilityScore}%
                </span>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {c.targetUser.name}
                </h4>
                <p className="text-[10px] text-slate-500 truncate font-mono">
                  {c.targetUser.role}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-mono mt-0.5">
                  <GitBranch className="w-2.5 h-2.5" />
                  <span>{c.sharedIdeasCount} shared sparks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Filter Pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All Connections ({connections.length})
        </button>
        <button
          onClick={() => setActiveFilter('collaborating')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeFilter === 'collaborating'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Active Collaborators
        </button>
        <button
          onClick={() => setActiveFilter('exploring')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeFilter === 'exploring'
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Exploring Synergy
        </button>
      </div>

      {/* Detailed Connection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredConnections.map((conn) => {
          return (
            <div
              key={conn.id}
              id={`connection-card-${conn.id}`}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header with avatar, compatibility, status */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={conn.targetUser.avatar}
                      alt={conn.targetUser.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 group-hover:ring-indigo-300 transition-all"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold font-display text-slate-900">
                          {conn.targetUser.name}
                        </h3>
                        <span className="text-xs font-mono text-slate-500">
                          {conn.targetUser.handle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono">
                        {conn.targetUser.role}
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <div className="flex flex-col items-end">
                    <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{conn.compatibilityScore}% Synergy</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1">
                      {conn.sharedIdeasCount} shared sparks
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {conn.targetUser.bio}
                </p>

                {/* Complementary Skills Matrix */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-indigo-700 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    Complementary Skill Synthesis
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Your Skill</span>
                      <span className="font-semibold text-slate-800">
                        {conn.complementarySkills.userSkill}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">{conn.targetUser.name.split(' ')[0]}'s Skill</span>
                      <span className="font-semibold text-indigo-700">
                        {conn.complementarySkills.partnerSkill}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 italic">
                    "{conn.complementarySkills.synergyReason}"
                  </p>
                </div>

                {/* Mutual Worlds & Recent Spark */}
                <div className="space-y-2 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Mutual Worlds:</span>
                    <span className="text-slate-800 font-medium">
                      {conn.mutualWorlds.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <GitBranch className="w-3.5 h-3.5 text-sky-600" />
                    <span>Shared Spark:</span>
                    <span className="text-slate-800 font-medium truncate">
                      {conn.recentSharedSparkTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleMessage(conn.targetUser.name)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Channel</span>
                </button>

                <button
                  id={`collab-btn-${conn.id}`}
                  onClick={() => onInitiateCollab(conn.targetUser)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <span>Propose Idea Collaboration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

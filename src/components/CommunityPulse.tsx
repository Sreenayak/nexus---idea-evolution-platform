import React from 'react';
import { WorldPulse } from '../types';
import { Zap, Compass, Sparkles, Users } from 'lucide-react';

interface CommunityPulseProps {
  pulse: WorldPulse;
  worldName?: string;
  compact?: boolean;
}

export const CommunityPulse: React.FC<CommunityPulseProps> = ({
  pulse,
  worldName,
  compact = false,
}) => {
  const metrics = [
    {
      key: 'energy',
      label: 'Energy',
      value: pulse.energy,
      icon: Zap,
      color: 'text-amber-600',
      strokeColor: '#d97706',
      bgBar: 'bg-amber-100',
      description: 'Activity tempo & spark generation velocity',
    },
    {
      key: 'curiosity',
      label: 'Curiosity',
      value: pulse.curiosity,
      icon: Compass,
      color: 'text-sky-600',
      strokeColor: '#0284c7',
      bgBar: 'bg-sky-100',
      description: 'Hypothesis branching & exploration depth',
    },
    {
      key: 'creativity',
      label: 'Creativity',
      value: pulse.creativity,
      icon: Sparkles,
      color: 'text-pink-600',
      strokeColor: '#db2777',
      bgBar: 'bg-pink-100',
      description: 'Remix diversity & cross-domain leaps',
    },
    {
      key: 'collaboration',
      label: 'Collaboration',
      value: pulse.collaboration,
      icon: Users,
      color: 'text-emerald-700',
      strokeColor: '#059669',
      bgBar: 'bg-emerald-100',
      description: 'Merge ratios & cross-node sprint participation',
    },
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.key}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200"
            >
              <Icon className={`w-3.5 h-3.5 ${m.color}`} />
              <span className="text-slate-600 font-medium">{m.label}</span>
              <span className="ml-auto font-mono font-bold text-slate-900">{m.value}%</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      id="community-pulse-panel"
      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-700 font-display">
              Community Pulse
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {worldName ? `Dynamic vitality of ${worldName}` : 'Living resonance of the NEXUS social field'}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          Realtime Telemetry
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.key}
              className="group p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all duration-200 relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-xs font-medium text-slate-700">{metric.label}</span>
                </div>
                <span className="font-mono text-xs font-bold text-slate-900">{metric.value}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: metric.strokeColor,
                  }}
                />
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-1 group-hover:text-slate-700 transition-colors">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

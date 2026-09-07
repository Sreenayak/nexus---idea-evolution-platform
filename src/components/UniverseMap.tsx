import React, { useState } from 'react';
import { SocialWorld, WorldCategory } from '../types';
import {
  Cpu,
  Rocket,
  Palette,
  Atom,
  Sparkles,
  Gamepad2,
  Dna,
  Globe2,
  ArrowRight,
  Activity,
  Flame,
  Zap,
  Users,
  Layers,
} from 'lucide-react';
import { CommunityPulse } from './CommunityPulse';

interface UniverseMapProps {
  worlds: SocialWorld[];
  onSelectWorld: (worldId: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  selectedWorldId?: string;
  onNavigateToWorlds?: () => void;
  onOpenCreateSpark?: () => void;
}

// Map icon names to Lucide icons
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

export const UniverseMap: React.FC<UniverseMapProps> = ({
  worlds,
  onSelectWorld,
  selectedCategory,
  onSelectCategory,
  selectedWorldId,
  onNavigateToWorlds,
  onOpenCreateSpark,
}) => {
  const [internalCategory, setInternalCategory] = useState('All Dimensions');
  const activeCategory = selectedCategory || internalCategory;
  const handleCategoryChange = onSelectCategory || setInternalCategory;
  const [hoveredWorldId, setHoveredWorldId] = useState<string | null>(null);

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
    if (activeCategory === 'All Dimensions') return true;
    return w.category === activeCategory;
  });

  const hoveredWorld = worlds.find((w) => w.id === hoveredWorldId) || null;

  // Build connection links
  const connectionLinks: { source: SocialWorld; target: SocialWorld; key: string }[] = [];
  const processedPairs = new Set<string>();

  worlds.forEach((w1) => {
    w1.connectedWorldIds.forEach((w2Id) => {
      const w2 = worlds.find((w) => w.id === w2Id);
      if (w2) {
        const pairKey = [w1.id, w2.id].sort().join('--');
        if (!processedPairs.has(pairKey)) {
          processedPairs.add(pairKey);
          connectionLinks.push({ source: w1, target: w2, key: pairKey });
        }
      }
    });
  });

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm backdrop-blur-md">
      {/* Top Universe Status Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 tracking-wide">
              The NEXUS Universe
            </h2>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200">
              Dimensional Map
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Explore interconnected Social Worlds. Hover over any celestial node to observe community pulse, sparks, and live challenges.
          </p>
        </div>

        {/* Global Universe Ticker & Quick Controls */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          {onNavigateToWorlds && (
            <button
              onClick={onNavigateToWorlds}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-xs transition-all cursor-pointer font-medium"
            >
              <Globe2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Social Worlds Grid</span>
            </button>
          )}

          {onOpenCreateSpark && (
            <button
              onClick={onOpenCreateSpark}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Ignite Spark</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>{worlds.length} Worlds</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {worlds.reduce((acc, w) => acc + w.activeParticipants, 0).toLocaleString()} Minds
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-50/40">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Universe Canvas / Graph Area */}
      <div
        id="nexus-universe-canvas"
        className="relative w-full h-[520px] sm:h-[620px] bg-gradient-to-br from-indigo-50/30 via-slate-50 to-white select-none overflow-hidden"
      >
        {/* Ambient celestial rings & grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[700px] h-[700px] rounded-full border border-dashed border-indigo-200 animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-sky-200 animate-[spin_80s_linear_infinite_reverse]" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-teal-200" />
        </div>

        {/* SVG connection lines between worlds */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {connectionLinks.map((link) => {
            const isHovered =
              hoveredWorldId === link.source.id || hoveredWorldId === link.target.id;
            const x1 = `${link.source.coordinates.x}%`;
            const y1 = `${link.source.coordinates.y}%`;
            const x2 = `${link.target.coordinates.x}%`;
            const y2 = `${link.target.coordinates.y}%`;

            return (
              <g key={link.key}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isHovered ? '#6366f1' : 'rgba(148, 163, 184, 0.4)'}
                  strokeWidth={isHovered ? 2.5 : 1.2}
                  strokeDasharray={isHovered ? '6 4' : '4 4'}
                  className="transition-all duration-300"
                />
                {isHovered && (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#6366f1"
                    strokeWidth={2}
                    className="opacity-70 animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic World Nodes */}
        {filteredWorlds.map((world) => {
          const isHovered = hoveredWorldId === world.id;
          const Icon = ICON_MAP[world.iconName] || Globe2;

          return (
            <div
              key={world.id}
              id={`world-node-${world.id}`}
              style={{
                left: `${world.coordinates.x}%`,
                top: `${world.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredWorldId(world.id)}
              className="absolute z-10 cursor-pointer group"
              onClick={() => onSelectWorld(world.id)}
            >
              {/* Outer pulsating aura */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-500 -m-3 sm:-m-4"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle, ${world.glowColor} 0%, transparent 70%)`
                    : 'transparent',
                }}
              />

              {/* Pulsing beacon rings */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative transition-all duration-300 group-hover:scale-115"
                style={{
                  backgroundColor: '#ffffff',
                  border: `2px solid ${isHovered ? world.accentColor : '#e2e8f0'}`,
                  boxShadow: isHovered
                    ? `0 0 20px ${world.glowColor}`
                    : '0 4px 14px rgba(0,0,0,0.08)',
                }}
              >
                {/* Micro orbit indicator */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed opacity-30 animate-[spin_20s_linear_infinite]"
                  style={{ borderColor: world.accentColor }}
                />

                <Icon
                  className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                  style={{ color: world.accentColor }}
                />

                {/* Energy badge pill */}
                <span
                  className="absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-white shadow-xs"
                  style={{ backgroundColor: world.accentColor }}
                >
                  {world.pulse.energy}%
                </span>
              </div>

              {/* World Label Under Node */}
              <div className="mt-2 flex flex-col items-center text-center pointer-events-none">
                <span className="text-xs font-bold font-display text-slate-800 group-hover:text-indigo-600 drop-shadow-xs whitespace-nowrap">
                  {world.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight whitespace-nowrap">
                  {world.activeParticipants} minds • {world.activeSparks} sparks
                </span>
              </div>
            </div>
          );
        })}

        {/* Floating Detail Hover Card */}
        {hoveredWorld && (
          <div
            id="universe-world-preview-card"
            className="absolute bottom-4 right-4 z-20 w-84 sm:w-96 p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${hoveredWorld.accentColor}15`,
                    border: `1px solid ${hoveredWorld.accentColor}40`,
                  }}
                >
                  {(() => {
                    const Icon = ICON_MAP[hoveredWorld.iconName] || Globe2;
                    return <Icon className="w-5 h-5" style={{ color: hoveredWorld.accentColor }} />;
                  })()}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-slate-900">
                    {hoveredWorld.name}
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-600 font-semibold">
                    {hoveredWorld.category}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Hub
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {hoveredWorld.tagline}
            </p>

            {/* Quick Community Pulse summary */}
            <div className="mb-3">
              <CommunityPulse pulse={hoveredWorld.pulse} compact={true} />
            </div>

            {/* Trending tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {hoveredWorld.trendingKeywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono border border-slate-200"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Enter World Button */}
            <button
              id={`enter-world-btn-${hoveredWorld.id}`}
              onClick={() => onSelectWorld(hoveredWorld.id)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 cursor-pointer shadow-sm hover:brightness-95 active:scale-98"
              style={{ backgroundColor: hoveredWorld.accentColor }}
            >
              <span>Enter {hoveredWorld.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

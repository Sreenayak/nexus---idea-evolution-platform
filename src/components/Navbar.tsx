import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Orbit,
  Globe2,
  GitBranch,
  Trophy,
  Users2,
  PlusCircle,
  Bot,
  Search,
  LogIn,
  LogOut,
  Volume2,
  VolumeX,
  Keyboard,
  Activity,
  HelpCircle,
  Scale,
  Sparkles,
  ChevronDown,
  FileText,
  FileDiff,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { NexusUser } from '../types';

interface NavbarProps {
  currentTab: 'landing' | 'universe' | 'worlds' | 'evolution' | 'challenges' | 'connections';
  onSelectTab: (tab: 'landing' | 'universe' | 'worlds' | 'evolution' | 'challenges' | 'connections') => void;
  onOpenCreateSpark: () => void;
  onOpenProfile: () => void;
  onToggleNova: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  onOpenSearch: () => void;
  isNovaOpen: boolean;
  currentUser: NexusUser;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onOpenShortcuts?: () => void;
  onOpenReliability?: () => void;
  onOpenQuadraticConsensus?: () => void;
  onOpenPaperExport?: () => void;
  onOpenDiff?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCreateSpark,
  onOpenProfile,
  onToggleNova,
  onOpenAuth,
  onLogout,
  isAuthenticated,
  onOpenSearch,
  isNovaOpen,
  currentUser,
  searchQuery,
  onSearchChange,
  soundEnabled = false,
  onToggleSound,
  onOpenShortcuts,
  onOpenReliability,
  onOpenQuadraticConsensus,
  onOpenPaperExport,
  onOpenDiff,
}) => {
  const [isFeaturesMenuOpen, setIsFeaturesMenuOpen] = useState(false);
  const featuresMenuRef = useRef<HTMLDivElement>(null);

  // Close features menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (featuresMenuRef.current && !featuresMenuRef.current.contains(e.target as Node)) {
        setIsFeaturesMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFeaturesMenuOpen(false);
      }
    };

    if (isFeaturesMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFeaturesMenuOpen]);

  return (
    <>
      {/* WCAG AA Accessible Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:font-bold focus:text-xs focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        id="nexus-primary-nav"
        role="banner"
        className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-1.5 sm:gap-3">
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="nexus-logo-btn"
                onClick={() => onSelectTab('landing')}
                className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-teal-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                    <Orbit className="w-4.5 h-4.5 text-indigo-600 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                      NEXUS
                    </span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold tracking-wider hidden sm:inline-block">
                      v2.0
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono tracking-tight hidden xl:inline-block">
                    Ideas evolve through people
                  </span>
                </div>
              </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shrink-0">
              <button
                id="nav-home-btn"
                onClick={() => onSelectTab('landing')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'landing'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                id="nav-universe-btn"
                onClick={() => onSelectTab('universe')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'universe'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Universe</span>
              </button>

              <button
                id="nav-worlds-btn"
                onClick={() => onSelectTab('worlds')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'worlds'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Social</span>
                <span>Worlds</span>
              </button>

              <button
                id="nav-evolution-btn"
                onClick={() => onSelectTab('evolution')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'evolution'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Idea</span>
                <span>Evolution</span>
              </button>

              <button
                id="nav-challenges-btn"
                onClick={() => onSelectTab('challenges')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'challenges'
                    ? 'bg-white text-amber-800 shadow-xs border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Challenges</span>
              </button>

              <button
                id="nav-connections-btn"
                onClick={() => onSelectTab('connections')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentTab === 'connections'
                    ? 'bg-white text-pink-700 shadow-xs border border-pink-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Users2 className="w-3.5 h-3.5 text-pink-600" />
                <span>Connections</span>
              </button>
            </nav>

            {/* Features Directory Dropdown Trigger (Visible to ALL users for complete feature discovery) */}
            <div className="relative" ref={featuresMenuRef}>
              <button
                id="nav-features-hub-btn"
                onClick={() => setIsFeaturesMenuOpen((prev) => !prev)}
                aria-expanded={isFeaturesMenuOpen}
                aria-haspopup="true"
                aria-label="Toggle Available Features Menu"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                  isFeaturesMenuOpen
                    ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200'
                    : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 hover:from-indigo-100 hover:to-pink-100 text-indigo-900 border-indigo-200/80'
                }`}
                title="Explore All Available Platform Features"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isFeaturesMenuOpen ? 'text-amber-300' : 'text-indigo-600 animate-pulse'}`} />
                <span className="font-bold">Features</span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/80 text-indigo-700 border border-indigo-200/60 font-semibold">
                  Hub
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isFeaturesMenuOpen ? 'rotate-180 text-white' : 'text-indigo-600'}`} />
              </button>

              {/* Popover Menu: Full Directory of Available Features */}
              {isFeaturesMenuOpen && (
                <div
                  id="features-dropdown-menu"
                  className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-[92vw] sm:w-[480px] md:w-[560px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                          NEXUS Platform Capabilities
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Active tools, epistemic governance, and research utilities
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      All Systems Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto pr-1">
                    {/* Feature 1: Quadratic Consensus Matrix */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        onOpenQuadraticConsensus?.();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/60 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-100 border border-amber-200 shrink-0">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                            Quadratic Consensus
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            Gov
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Epistemic conviction staking using square-root voting weight
                        </p>
                      </div>
                    </button>

                    {/* Feature 2: NOVA AI Copilot */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        onToggleNova();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/60 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100 border border-indigo-200 shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                            NOVA AI Copilot
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">
                            AI
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Autonomous hypothesis generation & semantic spark matchmaking
                        </p>
                      </div>
                    </button>

                    {/* Feature 3: Academic Paper Exporter */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        if (onOpenPaperExport) onOpenPaperExport();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50/60 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-700 group-hover:bg-purple-100 border border-purple-200 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-purple-900">
                            Paper Exporter
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">
                            BibTeX
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Download citeable papers with full genealogical lineage trees
                        </p>
                      </div>
                    </button>

                    {/* Feature 4: Genetic Mutation Diff */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        if (onOpenDiff) onOpenDiff();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/60 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-100 border border-sky-200 shrink-0">
                        <FileDiff className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-sky-900">
                            Mutation Diff
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-sky-100 text-sky-800 font-bold">
                            DAG
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Semantic comparison between ancestral parent and forked child
                        </p>
                      </div>
                    </button>

                    {/* Feature 5: Omni-Search Engine */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        onOpenSearch();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-200 border border-slate-200 shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            Global Omni-Search
                          </span>
                          <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            /
                          </kbd>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Instant filtering across sparks, authors, worlds, and tags
                        </p>
                      </div>
                    </button>

                    {/* Feature 6: Harmonic Audio FX */}
                    <button
                      onClick={() => {
                        onToggleSound?.();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-100 border border-amber-200 shrink-0">
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            Acoustic Feedback
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${soundEnabled ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                            {soundEnabled ? 'ON' : 'MUTED'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Procedural Web Audio pentatonic chimes on idea interactions [M]
                        </p>
                      </div>
                    </button>

                    {/* Feature 7: System Reliability & Security Telemetry */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        onOpenReliability?.();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/60 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 border border-emerald-200 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                            Reliability & Security
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                            99.9%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          Live uptime, XSS defense audit, and container health metrics
                        </p>
                      </div>
                    </button>

                    {/* Feature 8: Keyboard Shortcuts */}
                    <button
                      onClick={() => {
                        setIsFeaturesMenuOpen(false);
                        onOpenShortcuts?.();
                      }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-200 border border-slate-200 shrink-0">
                        <Keyboard className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            Accessibility Shortcuts
                          </span>
                          <kbd className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            ?
                          </kbd>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          WCAG AA single-key shortcuts for rapid keyboard navigation
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Header Cluster */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Omni Search Button */}
              <button
                id="nexus-search-trigger-btn"
                onClick={onOpenSearch}
                aria-label="Open Omni Search (/)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                title="Search Sparks, Worlds, Challenges (/)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden lg:inline text-xs font-medium text-slate-500 truncate max-w-[90px]">
                  {searchQuery ? searchQuery : 'Search...'}
                </span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-white px-1 rounded border border-slate-200">
                  /
                </kbd>
              </button>

              {/* Quadratic Consensus Direct Pill */}
              {onOpenQuadraticConsensus && (
                <button
                  id="nav-quadratic-btn"
                  onClick={onOpenQuadraticConsensus}
                  aria-label="Open Quadratic Conviction Staking Matrix"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 transition-all cursor-pointer shadow-2xs"
                  title="Quadratic Conviction Staking Matrix"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden md:inline">Consensus</span>
                </button>
              )}

              {/* NOVA AI Direct Pill */}
              <button
                id="nav-nova-ai-btn"
                onClick={onToggleNova}
                aria-label="Toggle NOVA AI Copilot"
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isNovaOpen
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-800 shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700'
                }`}
                title="NOVA AI Idea & Matchmaking Copilot"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">NOVA AI</span>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600"></span>
                </span>
              </button>

              {/* Ambient Acoustic Sound Toggle */}
              {onToggleSound && (
                <button
                  id="nav-sound-btn"
                  onClick={onToggleSound}
                  aria-label={soundEnabled ? 'Mute sound effects (M)' : 'Enable sound effects (M)'}
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                    soundEnabled
                      ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-500'
                  }`}
                  title={soundEnabled ? 'Sound: Enabled (M)' : 'Sound: Muted (M)'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* System Reliability Telemetry Indicator */}
              {onOpenReliability && (
                <button
                  id="nav-health-btn"
                  onClick={onOpenReliability}
                  aria-label="View system reliability audit"
                  className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold transition-all cursor-pointer"
                  title="System Reliability & Security Benchmark (99.9%)"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>99.9%</span>
                </button>
              )}

              {/* Create Spark Primary Action Button */}
              <button
                id="nav-create-spark-btn"
                onClick={onOpenCreateSpark}
                aria-label="Create New Spark"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">New Spark</span>
                <span className="sm:hidden">Spark</span>
              </button>

              {/* User Profile or Sign In */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <button
                    id="nav-user-profile-btn"
                    onClick={onOpenProfile}
                    aria-label="View Profile"
                    className="flex items-center gap-1.5 p-1 pl-1 pr-2 rounded-xl bg-slate-100 hover:bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                    title={`Researcher: ${currentUser.name}`}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-lg object-cover ring-1 ring-indigo-500/30"
                    />
                    <span className="hidden xl:inline text-xs font-bold text-slate-800 max-w-[80px] truncate">
                      {currentUser.name}
                    </span>
                  </button>

                  <button
                    id="nav-logout-btn"
                    onClick={onLogout}
                    aria-label="Sign Out"
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-700 transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="nav-signin-btn"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  title="Sign In or Register"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile secondary tab bar with quick navigation & Features trigger */}
          <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-200/90 overflow-x-auto text-xs gap-1">
            <button
              onClick={() => onSelectTab('landing')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'landing' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('universe')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'universe' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
              }`}
            >
              Universe
            </button>
            <button
              onClick={() => onSelectTab('worlds')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'worlds' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
              }`}
            >
              Worlds
            </button>
            <button
              onClick={() => onSelectTab('evolution')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'evolution' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
              }`}
            >
              Evolution
            </button>
            <button
              onClick={() => onSelectTab('challenges')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'challenges' ? 'text-amber-800 bg-amber-50' : 'text-slate-600'
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => onSelectTab('connections')}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                currentTab === 'connections' ? 'text-pink-700 bg-pink-50' : 'text-slate-600'
              }`}
            >
              Connections
            </button>
            <button
              onClick={() => setIsFeaturesMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold whitespace-nowrap bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Features</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};


import React, { useState, useEffect } from 'react';
import {
  mockWorlds,
  mockSparks,
  mockChallenges,
  mockConnections,
  currentUser as initialCurrentUser,
} from './data/mockData';
import {
  SocialWorld,
  Spark,
  Challenge,
  ActivityConnection,
  NexusUser,
  RemixType,
} from './types';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { UniverseMap } from './components/UniverseMap';
import { WorldsDirectory } from './components/WorldsDirectory';
import { WorldDetailView } from './components/WorldDetailView';
import { IdeaEvolutionGraph } from './components/IdeaEvolutionGraph';
import { ChallengesList } from './components/ChallengesList';
import { ConnectionsView } from './components/ConnectionsView';
import { CreateSparkModal } from './components/CreateSparkModal';
import { RemixModal } from './components/RemixModal';
import { MergeModal } from './components/MergeModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NovaAiCopilot } from './components/NovaAiCopilot';
import { MutationDiffModal } from './components/MutationDiffModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { ReliabilityModal } from './components/ReliabilityModal';
import { QuadraticConsensusModal } from './components/QuadraticConsensusModal';
import { ResearchPaperExportModal } from './components/ResearchPaperExportModal';
import { soundEffects } from './utils/soundEffects';
import {
  Sparkles,
  CheckCircle2,
  GitBranch,
  GitMerge,
  Flame,
  Home,
  Orbit,
  Globe2,
  Trophy,
  Users2,
} from 'lucide-react';

export default function App() {
  // App-level view state: Home page ('landing') as default entry point per user request
  const [currentView, setCurrentView] = useState<
    'landing' | 'universe' | 'worlds' | 'world' | 'evolution' | 'challenges' | 'connections'
  >('landing');

  const [selectedWorldId, setSelectedWorldId] = useState<string>('world-ai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('nexus_token') || localStorage.getItem('nexus_auth_active'));
  });

  // Entities state
  const [worlds, setWorlds] = useState<SocialWorld[]>(mockWorlds);
  const [sparks, setSparks] = useState<Spark[]>(mockSparks);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [connections, setConnections] = useState<ActivityConnection[]>(mockConnections);
  const [currentUser, setCurrentUser] = useState<NexusUser>(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return initialCurrentUser;
      }
    }
    return initialCurrentUser;
  });

  // Selected spark for the Evolution DAG graph view
  const [selectedSparkForGraph, setSelectedSparkForGraph] = useState<Spark>(mockSparks[0]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCreateSparkOpen, setIsCreateSparkOpen] = useState(false);
  const [createSparkDefaultWorldId, setCreateSparkDefaultWorldId] = useState<string>('world-ai');

  const [isRemixOpen, setIsRemixOpen] = useState(false);
  const [targetRemixSpark, setTargetRemixSpark] = useState<Spark | null>(null);

  const [isMergeOpen, setIsMergeOpen] = useState(false);
  const [mergeSparkA, setMergeSparkA] = useState<Spark | null>(null);
  const [mergeSparkB, setMergeSparkB] = useState<Spark | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNovaAiOpen, setIsNovaAiOpen] = useState(false);

  // New accessibility, mutation inspector & reliability modals
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isReliabilityOpen, setIsReliabilityOpen] = useState(false);
  const [isMutationDiffOpen, setIsMutationDiffOpen] = useState(false);
  const [diffCurrentSpark, setDiffCurrentSpark] = useState<Spark | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(() => soundEffects.isEnabled());

  // Innovation Modals: Quadratic Conviction Staking & Research Paper Export
  const [isConsensusOpen, setIsConsensusOpen] = useState(false);
  const [isPaperExportOpen, setIsPaperExportOpen] = useState(false);
  const [paperExportSpark, setPaperExportSpark] = useState<Spark | null>(null);

  // Notifications Toast state
  const [toast, setToast] = useState<{
    id: string;
    title: string;
    description: string;
    type: 'spark' | 'remix' | 'merge' | 'challenge' | 'ignite';
  } | null>(null);

  const showToast = (
    title: string,
    description: string,
    type: 'spark' | 'remix' | 'merge' | 'challenge' | 'ignite'
  ) => {
    setToast({
      id: Date.now().toString(),
      title,
      description,
      type,
    });
    setTimeout(() => setToast(null), 4500);
  };

  // Sync initial backend state on mount
  useEffect(() => {
    const syncBackendData = async () => {
      try {
        const [worldsRes, sparksRes, challengesRes, connectionsRes] = await Promise.allSettled([
          fetch('/api/worlds'),
          fetch('/api/sparks'),
          fetch('/api/challenges'),
          fetch('/api/connections'),
        ]);

        if (worldsRes.status === 'fulfilled' && worldsRes.value.ok) {
          const data = await worldsRes.value.json();
          if (data.worlds && data.worlds.length > 0) setWorlds(data.worlds);
        }

        if (sparksRes.status === 'fulfilled' && sparksRes.value.ok) {
          const data = await sparksRes.value.json();
          if (data.sparks && data.sparks.length > 0) {
            setSparks(data.sparks);
            setSelectedSparkForGraph(data.sparks[0]);
          }
        }

        if (challengesRes.status === 'fulfilled' && challengesRes.value.ok) {
          const data = await challengesRes.value.json();
          if (data.challenges && data.challenges.length > 0) setChallenges(data.challenges);
        }

        if (connectionsRes.status === 'fulfilled' && connectionsRes.value.ok) {
          const data = await connectionsRes.value.json();
          if (data.connections && data.connections.length > 0) setConnections(data.connections);
        }
      } catch (err) {
        console.info('Operating with local client cache fallback');
      }
    };

    syncBackendData();
  }, []);

  // Save current user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Could not save user state');
    }
  }, [currentUser]);

  // Handler: Selecting a world to inspect
  const handleSelectWorld = (worldId: string) => {
    setSelectedWorldId(worldId);
    setCurrentView('world');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Creating a brand new Spark
  const handleCreateSpark = async (data: {
    worldId: string;
    title: string;
    content: string;
    tags: string[];
  }) => {
    const newSpark: Spark = {
      id: `spark-${Date.now()}`,
      worldId: data.worldId,
      author: currentUser,
      title: data.title,
      content: data.content,
      branchType: 'original',
      remixCount: 0,
      mergeCount: 0,
      energy: 85,
      createdAt: 'Just now',
      tags: data.tags,
      status: 'active',
      childSparkIds: [],
    };

    // Update local state optimistically
    setSparks((prev) => [newSpark, ...prev]);

    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        sparksCreated: prev.stats.sparksCreated + 1,
      },
    }));

    // Increment world active sparks & pulse energy
    setWorlds((prev) =>
      prev.map((w) =>
        w.id === data.worldId
          ? {
              ...w,
              activeSparks: w.activeSparks + 1,
              pulse: {
                ...w.pulse,
                energy: Math.min(100, w.pulse.energy + 2),
                creativity: Math.min(100, w.pulse.creativity + 3),
              },
            }
          : w
      )
    );

    setSelectedWorldId(data.worldId);
    setCurrentView('world');

    showToast(
      'Spark Ignited in Social World!',
      `"${data.title.slice(0, 35)}..." is now live on the Idea Evolution Graph.`,
      'spark'
    );

    // Sync to backend asynchronously
    try {
      await fetch('/api/sparks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worldId: data.worldId,
          title: data.title,
          content: data.content,
          tags: data.tags,
          authorId: currentUser.id,
        }),
      });
    } catch {
      // Handled gracefully in local state
    }
  };

  // Handler: Submitting a Remix
  const handleCreateRemix = async (data: {
    parentSparkId: string;
    worldId: string;
    title: string;
    content: string;
    remixType: RemixType;
    evolutionNote: string;
    tags: string[];
  }) => {
    const newRemixId = `spark-remix-${Date.now()}`;
    const newRemixSpark: Spark = {
      id: newRemixId,
      worldId: data.worldId,
      author: currentUser,
      title: data.title,
      content: data.content,
      branchType: 'remix',
      remixType: data.remixType,
      parentSparkId: data.parentSparkId,
      evolutionNote: data.evolutionNote,
      remixCount: 0,
      mergeCount: 0,
      energy: 92,
      createdAt: 'Just now',
      tags: data.tags,
      status: 'active',
      childSparkIds: [],
    };

    // Update sparks and link into parent
    setSparks((prev) =>
      prev.map((s) => {
        if (s.id === data.parentSparkId) {
          return {
            ...s,
            remixCount: s.remixCount + 1,
            energy: Math.min(100, s.energy + 5),
            childSparkIds: [...s.childSparkIds, newRemixId],
          };
        }
        return s;
      }).concat(newRemixSpark)
    );

    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        ideasRemixed: prev.stats.ideasRemixed + 1,
      },
    }));

    // Update world pulse
    setWorlds((prev) =>
      prev.map((w) =>
        w.id === data.worldId
          ? {
              ...w,
              pulse: {
                ...w.pulse,
                curiosity: Math.min(100, w.pulse.curiosity + 3),
                collaboration: Math.min(100, w.pulse.collaboration + 4),
              },
            }
          : w
      )
    );

    setSelectedSparkForGraph(newRemixSpark);
    showToast(
      `Remix Branch Created [${data.remixType.toUpperCase()}]`,
      `Successfully branched idea on the lineage tree.`,
      'remix'
    );

    // Sync to backend asynchronously
    try {
      await fetch(`/api/sparks/${data.parentSparkId}/remix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worldId: data.worldId,
          title: data.title,
          content: data.content,
          remixType: data.remixType,
          evolutionNote: data.evolutionNote,
          tags: data.tags,
          authorId: currentUser.id,
        }),
      });
    } catch {
      // Local state is preserved
    }
  };

  // Handler: Executing a Merge
  const handleExecuteMerge = async (data: {
    sparkAId: string;
    sparkBId: string;
    mergedTitle: string;
    synthesisDescription: string;
    projectGoal: string;
    worldId: string;
  }) => {
    const newProjectId = `spark-project-${Date.now()}`;
    const projectSpark: Spark = {
      id: newProjectId,
      worldId: data.worldId,
      author: currentUser,
      title: data.mergedTitle,
      content: `${data.synthesisDescription}\n\nDeliverable: ${data.projectGoal}`,
      branchType: 'merged',
      mergedFromIds: [data.sparkAId, data.sparkBId],
      remixCount: 0,
      mergeCount: 1,
      energy: 98,
      createdAt: 'Just now',
      tags: ['CollaborativeProject', 'Merged', 'SprintReady'],
      status: 'project',
      childSparkIds: [],
    };

    // Update existing sparks
    setSparks((prev) =>
      prev.map((s) => {
        if (s.id === data.sparkAId || s.id === data.sparkBId) {
          return {
            ...s,
            mergeCount: s.mergeCount + 1,
            energy: Math.min(100, s.energy + 8),
            childSparkIds: [...s.childSparkIds, newProjectId],
          };
        }
        return s;
      }).concat(projectSpark)
    );

    // Update user stats
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        projectsBuilt: prev.stats.projectsBuilt + 1,
      },
    }));

    // Update world active projects and pulse
    setWorlds((prev) =>
      prev.map((w) =>
        w.id === data.worldId
          ? {
              ...w,
              activeProjects: w.activeProjects + 1,
              pulse: {
                ...w.pulse,
                collaboration: Math.min(100, w.pulse.collaboration + 6),
                energy: Math.min(100, w.pulse.energy + 4),
              },
            }
          : w
      )
    );

    setSelectedSparkForGraph(projectSpark);
    showToast(
      'Ideas Merged: Collaborative Project Born!',
      `Synthesized 2 branches into a unified project node.`,
      'merge'
    );

    // Sync to backend asynchronously
    try {
      await fetch('/api/sparks/merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          authorId: currentUser.id,
        }),
      });
    } catch {
      // Local state is preserved
    }
  };

  // Handler: Igniting energy on a spark
  const handleIgniteEnergy = async (sparkId: string) => {
    setSparks((prev) =>
      prev.map((s) =>
        s.id === sparkId ? { ...s, energy: Math.min(100, s.energy + 4) } : s
      )
    );
    showToast('Spark Resonance Ignited', 'Added collective attention energy to this node.', 'ignite');

    try {
      await fetch(`/api/sparks/${sparkId}/ignite`, { method: 'POST' });
    } catch {
      // Local state is preserved
    }
  };

  // Handler: Joining a challenge
  const handleJoinChallenge = async (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              participantCount: Math.min(c.maxParticipants, c.participantCount + 1),
              progressPercent: Math.min(100, c.progressPercent + 8),
              participants: [
                ...c.participants,
                {
                  id: currentUser.id,
                  name: currentUser.name,
                  handle: currentUser.handle,
                  avatar: currentUser.avatar,
                  role: currentUser.role,
                },
              ],
            }
          : c
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        challengesCompleted: prev.stats.challengesCompleted + 1,
      },
    }));

    showToast('Challenge Workspace Unlocked', 'You are now an active collaborator in this sprint.', 'challenge');

    try {
      await fetch(`/api/challenges/${challengeId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          userRole: currentUser.role,
        }),
      });
    } catch {
      // Local state preserved
    }
  };

  // Global keyboard shortcut for search (/ and Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Authentication callback
  const handleLoginSuccess = (user: NexusUser, token?: string) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('nexus_auth_active', 'true');
    if (token) localStorage.setItem('nexus_token', token);
    showToast('Authenticated Successfully', `Welcome to NEXUS, ${user.name}!`, 'spark');
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('nexus_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // Ignore
    }
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_auth_active');
    setIsAuthenticated(false);
    setCurrentUser(initialCurrentUser);
    showToast('Signed Out', 'You have logged out of your node session.', 'spark');
  };

  // Global keyboard shortcuts listener (Accessibility & Power Navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (e.key === 'Escape') {
          setIsAuthOpen(false);
          setIsCreateSparkOpen(false);
          setIsRemixOpen(false);
          setIsMergeOpen(false);
          setIsProfileOpen(false);
          setIsSearchOpen(false);
          setIsNovaAiOpen(false);
          setIsShortcutsOpen(false);
          setIsReliabilityOpen(false);
          setIsMutationDiffOpen(false);
        }
        return;
      }

      if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsCreateSparkOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const next = soundEffects.toggle();
        setSoundEnabled(next);
        showToast(next ? 'Sound FX Enabled' : 'Sound FX Muted', 'Acoustic harmonic feedback updated', 'ignite');
      } else if (e.key === '1') {
        setCurrentView('landing');
      } else if (e.key === '2') {
        setCurrentView('universe');
      } else if (e.key === '3') {
        setCurrentView('worlds');
      } else if (e.key === '4') {
        setCurrentView('evolution');
      } else if (e.key === '5') {
        setCurrentView('challenges');
      } else if (e.key === '6') {
        setCurrentView('connections');
      } else if (e.key === 'Escape') {
        setIsAuthOpen(false);
        setIsCreateSparkOpen(false);
        setIsRemixOpen(false);
        setIsMergeOpen(false);
        setIsProfileOpen(false);
        setIsSearchOpen(false);
        setIsNovaAiOpen(false);
        setIsShortcutsOpen(false);
        setIsReliabilityOpen(false);
        setIsMutationDiffOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to inspect genetic mutation diff
  const handleInspectDiff = (spark: Spark) => {
    setDiffCurrentSpark(spark);
    setIsMutationDiffOpen(true);
  };

  // Helper to trigger remix modal
  const handleStartRemix = (spark: Spark) => {
    setTargetRemixSpark(spark);
    setIsRemixOpen(true);
  };

  // Helper to trigger merge modal
  const handleStartMerge = (spark: Spark) => {
    setMergeSparkA(spark);
    setIsMergeOpen(true);
  };

  // Helper to view graph for specific spark
  const handleViewGraph = (spark: Spark) => {
    setSelectedSparkForGraph(spark);
    setCurrentView('evolution');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Current active world entity
  const currentActiveWorld =
    worlds.find((w) => w.id === selectedWorldId) || worlds[0];

  const sidebarItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'universe', label: 'Universe', icon: Orbit },
    { id: 'worlds', label: 'Social Worlds', icon: Globe2 },
    { id: 'evolution', label: 'Idea Evolution', icon: GitBranch },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'connections', label: 'Connections', icon: Users2 },
  ] as const;

  const normalizedCurrentTab = currentView === 'world' ? 'worlds' : currentView;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Background Interactive Cosmic Stars Canvas in clean subtle light tones */}
      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Global Navbar */}
        <Navbar
          currentTab={normalizedCurrentTab}
          onSelectTab={(tab) => {
            setCurrentView(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCreateSpark={() => {
            setCreateSparkDefaultWorldId(selectedWorldId);
            setIsCreateSparkOpen(true);
          }}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleNova={() => setIsNovaAiOpen((prev) => !prev)}
          isNovaOpen={isNovaAiOpen}
          currentUser={currentUser}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            const next = soundEffects.toggle();
            setSoundEnabled(next);
            showToast(next ? 'Sound FX Enabled' : 'Sound FX Muted', 'Acoustic harmonic feedback updated', 'ignite');
          }}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenReliability={() => setIsReliabilityOpen(true)}
          onOpenQuadraticConsensus={() => setIsConsensusOpen(true)}
          onOpenPaperExport={() => {
            if (sparks.length > 0) {
              setPaperExportSpark(sparks[0]);
            }
            setIsPaperExportOpen(true);
          }}
          onOpenDiff={() => {
            const remixedSpark = sparks.find((s) => s.parentSparkId) || sparks[0];
            if (remixedSpark) {
              setDiffCurrentSpark(remixedSpark);
              setIsMutationDiffOpen(true);
            }
          }}
        />

        <div className="flex flex-1 w-full max-w-[1460px] mx-auto px-3 sm:px-5 lg:px-6 pb-16">
          <aside className="hidden lg:flex w-72 shrink-0 pt-5 pr-5">
            <div className="w-full rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur-xl p-3 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="mb-4 px-2 pt-1">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-mono font-bold">
                  Workspace
                </p>
                <h2 className="mt-2 text-lg font-display font-bold text-slate-900">Navigation</h2>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map(({ id, label, icon: Icon }) => {
                  const active = normalizedCurrentTab === id;

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setCurrentView(id === 'worlds' ? 'worlds' : id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                          active
                            ? 'bg-white border-indigo-200 text-indigo-600'
                            : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Container Content with WCAG AA Landmark and Skip Target */}
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 pt-5 relative z-10 focus:outline-none"
          >
            {/* VIEW 1: LANDING OVERVIEW (Default Home Screen per user request) */}
            {currentView === 'landing' && (
              <LandingHero
                onEnterUniverse={() => setCurrentView('universe')}
                onExploreEvolution={() => setCurrentView('evolution')}
                onOpenCreateSpark={() => {
                  setCreateSparkDefaultWorldId('world-ai');
                  setIsCreateSparkOpen(true);
                }}
              />
            )}

            {/* VIEW 2: UNIVERSE GALAXY MAP */}
            {currentView === 'universe' && (
              <div className="space-y-6">
                <UniverseMap
                  worlds={worlds}
                  selectedWorldId={selectedWorldId}
                  onSelectWorld={handleSelectWorld}
                  onNavigateToWorlds={() => setCurrentView('worlds')}
                  onOpenCreateSpark={() => {
                    setCreateSparkDefaultWorldId(selectedWorldId);
                    setIsCreateSparkOpen(true);
                  }}
                />
              </div>
            )}

            {/* VIEW 2b: SOCIAL WORLDS DIRECTORY */}
            {currentView === 'worlds' && (
              <WorldsDirectory
                worlds={worlds}
                onSelectWorld={handleSelectWorld}
                onOpenCreateSpark={(wId) => {
                  setCreateSparkDefaultWorldId(wId);
                  setIsCreateSparkOpen(true);
                }}
                onViewChallenges={(wId) => {
                  setSelectedWorldId(wId);
                  setCurrentView('challenges');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                searchQuery={searchQuery}
              />
            )}

            {/* VIEW 3: SOCIAL WORLD DETAIL */}
            {currentView === 'world' && (
              <WorldDetailView
                world={currentActiveWorld}
                allWorlds={worlds}
                sparks={sparks}
                challenges={challenges}
                currentUser={currentUser}
                onBackToUniverse={() => setCurrentView('universe')}
                onBackToWorlds={() => setCurrentView('worlds')}
                onSelectOtherWorld={handleSelectWorld}
                onOpenCreateSparkInWorld={(wId) => {
                  setCreateSparkDefaultWorldId(wId);
                  setIsCreateSparkOpen(true);
                }}
                onRemixSpark={handleStartRemix}
                onMergeSpark={handleStartMerge}
                onViewGraph={handleViewGraph}
                onIgniteEnergy={handleIgniteEnergy}
                onJoinChallenge={handleJoinChallenge}
                onInspectDiff={handleInspectDiff}
                onExportPaper={(spark) => {
                  setPaperExportSpark(spark);
                  setIsPaperExportOpen(true);
                }}
              />
            )}

            {/* VIEW 4: IDEA EVOLUTION GRAPH (DAG) */}
            {currentView === 'evolution' && (
              <div className="space-y-6">
                <IdeaEvolutionGraph
                  sparks={sparks}
                  allSparks={sparks}
                  worlds={worlds}
                  selectedSparkId={selectedSparkForGraph.id}
                  onSelectSpark={(spark) => setSelectedSparkForGraph(spark)}
                  onRemixSpark={handleStartRemix}
                  onRemixFromNode={handleStartRemix}
                  onMergeSpark={handleStartMerge}
                  onMergeBranches={(sA, sB) => {
                    setMergeSparkA(sA);
                    setMergeSparkB(sB);
                    setIsMergeOpen(true);
                  }}
                  onIgniteEnergy={handleIgniteEnergy}
                />
              </div>
            )}

            {/* VIEW 5: CHALLENGES LIST */}
            {currentView === 'challenges' && (
              <ChallengesList
                challenges={challenges}
                worlds={worlds}
                currentUser={currentUser}
                onJoinChallenge={handleJoinChallenge}
                onSelectWorld={handleSelectWorld}
              />
            )}

            {/* VIEW 6: ACTIVITY CONNECTIONS */}
            {currentView === 'connections' && (
              <ConnectionsView
                connections={connections}
                currentUser={currentUser}
                onInitiateCollab={(user) => {
                  setCreateSparkDefaultWorldId('world-ai');
                  setIsCreateSparkOpen(true);
                  showToast(
                    'Collaborative Spark Initiated',
                    `Ready to co-author an idea with ${user.name} based on your complementary skills.`,
                    'spark'
                  );
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Toast Notification Banner with ARIA Live Announcement */}
      {toast && (
        <div
          id="global-nexus-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-white border border-slate-200 shadow-xl backdrop-blur-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 mt-0.5">
            {toast.type === 'spark' && <Sparkles className="w-4 h-4" />}
            {toast.type === 'remix' && <GitBranch className="w-4 h-4" />}
            {toast.type === 'merge' && <GitMerge className="w-4 h-4" />}
            {toast.type === 'challenge' && <CheckCircle2 className="w-4 h-4" />}
            {toast.type === 'ignite' && <Flame className="w-4 h-4 text-amber-500" />}
          </div>
          <div>
            <h4 className="text-xs font-bold font-display text-slate-900">
              {toast.title}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {toast.description}
            </p>
          </div>
        </div>
      )}

      {/* Global Modals */}
      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Global Search Engine Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        sparks={sparks}
        worlds={worlds}
        challenges={challenges}
        connections={connections}
        onSelectSpark={(spark) => {
          setSelectedSparkForGraph(spark);
          setCurrentView('evolution');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectWorld={(worldId) => {
          handleSelectWorld(worldId);
        }}
        onSelectChallenge={(challengeId) => {
          const target = challenges.find((c) => c.id === challengeId);
          if (target) setSelectedWorldId(target.worldId);
          setCurrentView('challenges');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectPerson={() => {
          setCurrentView('connections');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Create Spark Modal */}
      <CreateSparkModal
        isOpen={isCreateSparkOpen}
        onClose={() => setIsCreateSparkOpen(false)}
        worlds={worlds}
        defaultWorldId={createSparkDefaultWorldId}
        currentUser={currentUser}
        onCreateSpark={handleCreateSpark}
      />

      {/* Remix Modal */}
      <RemixModal
        isOpen={isRemixOpen}
        onClose={() => setIsRemixOpen(false)}
        parentSpark={targetRemixSpark}
        currentUser={currentUser}
        onSubmitRemix={handleCreateRemix}
      />

      {/* Merge Modal */}
      <MergeModal
        isOpen={isMergeOpen}
        onClose={() => setIsMergeOpen(false)}
        initialSparkA={mergeSparkA}
        initialSparkB={mergeSparkB}
        availableSparks={sparks}
        currentUser={currentUser}
        onExecuteMerge={handleExecuteMerge}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        userSparks={sparks.filter((s) => s.author.id === currentUser.id)}
        onSelectSpark={(spark) => {
          setSelectedSparkForGraph(spark);
          setCurrentView('evolution');
        }}
        onLogout={handleLogout}
      />

      {/* NOVA AI Copilot Drawer */}
      <NovaAiCopilot
        isOpen={isNovaAiOpen}
        onClose={() => setIsNovaAiOpen(false)}
        worlds={worlds}
        sparks={sparks}
        connections={connections}
        currentUser={currentUser}
        onApplyNovaSpark={(title, content, worldId) => {
          handleCreateSpark({
            worldId,
            title,
            content,
            tags: ['NovaSynthesized', 'OpenCollab'],
          });
        }}
        onTriggerNovaMerge={(sparkAId, sparkBId) => {
          const sA = sparks.find((s) => s.id === sparkAId) || sparks[0];
          const sB = sparks.find((s) => s.id === sparkBId) || sparks[1];
          setMergeSparkA(sA);
          setMergeSparkB(sB);
          setIsMergeOpen(true);
        }}
        onSelectWorld={handleSelectWorld}
      />

      {/* Mutation Diff Inspector Modal */}
      <MutationDiffModal
        isOpen={isMutationDiffOpen}
        onClose={() => setIsMutationDiffOpen(false)}
        currentSpark={diffCurrentSpark}
        parentSpark={
          diffCurrentSpark
            ? sparks.find(
                (s) =>
                  s.id === diffCurrentSpark.parentSparkId ||
                  (diffCurrentSpark.mergedFromIds && diffCurrentSpark.mergedFromIds.includes(s.id))
              ) || null
            : null
        }
        onSelectSpark={(s) => {
          setSelectedSparkForGraph(s);
          setCurrentView('evolution');
          setIsMutationDiffOpen(false);
        }}
      />

      {/* Keyboard Shortcuts & Accessibility Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* System Architecture & Reliability Benchmark Modal */}
      <ReliabilityModal
        isOpen={isReliabilityOpen}
        onClose={() => setIsReliabilityOpen(false)}
        worldsCount={worlds.length}
        sparksCount={sparks.length}
        challengesCount={challenges.length}
      />

      {/* Quadratic Conviction Staking Modal (Innovation & Governance) */}
      <QuadraticConsensusModal
        isOpen={isConsensusOpen}
        onClose={() => setIsConsensusOpen(false)}
        sparks={sparks}
        worlds={worlds}
        onStakeEnergy={(sparkId, credits) => {
          const additionalPoints = Math.round(Math.sqrt(credits) * 2);
          setSparks((prev) =>
            prev.map((s) => (s.id === sparkId ? { ...s, energy: Math.min(100, s.energy + additionalPoints) } : s))
          );
          showToast(
            'Conviction Staked',
            `Allocated ${credits} credits quadratic weight (+${additionalPoints}% energy).`,
            'ignite'
          );
        }}
      />

      {/* Academic Paper & Provenance Tree Exporter Modal (Innovation) */}
      <ResearchPaperExportModal
        isOpen={isPaperExportOpen}
        onClose={() => setIsPaperExportOpen(false)}
        spark={paperExportSpark}
        world={paperExportSpark ? worlds.find((w) => w.id === paperExportSpark.worldId) || null : null}
        allSparks={sparks}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-4 sm:px-6 relative z-10 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold font-display text-slate-900 text-sm">NEXUS</span>
            <span>— Next-Generation Idea Evolution Engine</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="italic">"Ideas evolve through people."</span>
            <span className="text-indigo-600 font-bold">• 48h Sprint Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

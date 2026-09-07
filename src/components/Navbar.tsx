import React from 'react';
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
}) => {
  return (
    <header
      id="nexus-primary-nav"
      className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="nexus-logo-btn"
              onClick={() => onSelectTab('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-teal-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Orbit className="w-5 h-5 text-indigo-600 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    NEXUS
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold tracking-wider">
                    v2.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight hidden lg:inline-block">
                  Ideas evolve through people
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
            {/* Home Tab */}
            <button
              id="nav-home-btn"
              onClick={() => onSelectTab('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'landing'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>

            <button
              id="nav-universe-btn"
              onClick={() => onSelectTab('universe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'universe'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              Universe
            </button>

            <button
              id="nav-worlds-btn"
              onClick={() => onSelectTab('worlds')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'worlds'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              Social Worlds
            </button>

            <button
              id="nav-evolution-btn"
              onClick={() => onSelectTab('evolution')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'evolution'
                  ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Idea Evolution
            </button>

            <button
              id="nav-challenges-btn"
              onClick={() => onSelectTab('challenges')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'challenges'
                  ? 'bg-white text-amber-800 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              Challenges
            </button>

            <button
              id="nav-connections-btn"
              onClick={() => onSelectTab('connections')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentTab === 'connections'
                  ? 'bg-white text-pink-700 shadow-xs border border-pink-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users2 className="w-3.5 h-3.5 text-pink-600" />
              Connections
            </button>
          </nav>

          {/* Search bar - Click triggers interactive global search engine */}
          <div className="hidden lg:flex items-center relative flex-1 max-w-xs">
            <button
              type="button"
              id="nexus-search-trigger-btn"
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between bg-slate-100/90 hover:bg-slate-100 border border-slate-200 hover:border-indigo-300 rounded-xl pl-3 pr-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                <span className="truncate">
                  {searchQuery ? searchQuery : 'Search Sparks, Worlds, Challenges...'}
                </span>
              </div>
              <kbd className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 group-hover:border-indigo-200">
                /
              </kbd>
            </button>
          </div>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile Search Button */}
            <button
              id="nav-mobile-search-btn"
              onClick={onOpenSearch}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
              title="Search Engine"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* NOVA AI Assistant trigger */}
            <button
              id="nav-nova-ai-btn"
              onClick={onToggleNova}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                isNovaOpen
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-800 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700'
              }`}
              title="NOVA AI Idea & Matchmaking Copilot"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">NOVA AI</span>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600"></span>
              </span>
            </button>

            {/* Create Spark Primary Action */}
            <button
              id="nav-create-spark-btn"
              onClick={onOpenCreateSpark}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">New Spark</span>
              <span className="sm:hidden">Spark</span>
            </button>

            {/* CONDITION 1: When user is Signed In */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* User Profile trigger */}
                <button
                  id="nav-user-profile-btn"
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 p-1 pl-1 pr-2.5 rounded-xl bg-slate-100/90 border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all focus:outline-none group cursor-pointer"
                  title="View Profile & Contributions"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-indigo-500/30 shadow-2xs"
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-indigo-700 font-mono font-semibold leading-none">
                      {currentUser.stats.sparksCreated} Sparks • {currentUser.stats.ideasRemixed} Remixes
                    </span>
                  </div>
                </button>

                {/* Direct Logout Button */}
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-700 text-xs font-bold transition-all cursor-pointer group"
                  title="Sign Out of Session"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-600 transition-colors" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              /* CONDITION 2: When user is NOT Signed In -> Show clear Sign In button */
              <button
                id="nav-signin-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 active:scale-95 cursor-pointer"
                title="Sign In or Create Account"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200 overflow-x-auto text-xs gap-1">
          <button
            onClick={() => onSelectTab('landing')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'landing' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('universe')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'universe' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
            }`}
          >
            Universe
          </button>
          <button
            onClick={() => onSelectTab('worlds')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'worlds' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
            }`}
          >
            Worlds
          </button>
          <button
            onClick={() => onSelectTab('evolution')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'evolution' ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600'
            }`}
          >
            Evolution
          </button>
          <button
            onClick={() => onSelectTab('challenges')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'challenges' ? 'text-amber-800 bg-amber-50' : 'text-slate-600'
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => onSelectTab('connections')}
            className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
              currentTab === 'connections' ? 'text-pink-700 bg-pink-50' : 'text-slate-600'
            }`}
          >
            Connections
          </button>
        </div>
      </div>
    </header>
  );
};


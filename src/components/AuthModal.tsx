import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Palette,
  Atom,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Layers,
  KeyRound,
} from 'lucide-react';
import { NexusUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: NexusUser;
  isAuthenticated: boolean;
  onLoginSuccess: (user: NexusUser, token: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  isAuthenticated,
  onLoginSuccess,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'session' | 'signin' | 'register' | 'switch'>(
    isAuthenticated ? 'session' : 'signin'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  // Demo personas for instant exploration
  const demoPersonas = [
    {
      key: 'elena@nexus.network',
      name: 'Elena Vance',
      role: 'Cognitive Systems Architect',
      email: 'elena@nexus.network',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
      tag: 'AI Research & Design',
      icon: Cpu,
      color: 'border-cyan-200 bg-cyan-50 text-cyan-800',
    },
    {
      key: 'alex@nexus.network',
      name: 'Alex Rivera',
      role: 'ML Infrastructure & Cloud Containers',
      email: 'alex@nexus.network',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80',
      tag: 'Cloud Sandbox / Infra',
      icon: Sparkles,
      color: 'border-indigo-200 bg-indigo-50 text-indigo-800',
    },
    {
      key: 'marcus@nexus.network',
      name: 'Marcus Thorne',
      role: 'Spatial Experience & Tactile Designer',
      email: 'marcus@nexus.network',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&h=240&q=80',
      tag: 'Spatial UI & Haptics',
      icon: Palette,
      color: 'border-pink-200 bg-pink-50 text-pink-800',
    },
    {
      key: 'soren@nexus.network',
      name: 'Dr. Soren Chen',
      role: 'Decentralized Science Architect',
      email: 'soren@nexus.network',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
      tag: 'DeSci & Tokenomics',
      icon: Atom,
      color: 'border-violet-200 bg-violet-50 text-violet-800',
    },
  ];

  const handlePersonaSelect = async (personaKey: string) => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaKey }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setFeedback({ type: 'success', message: `Signed in as ${data.user.name}!` });
        setTimeout(() => {
          onLoginSuccess(data.user, data.token || 'demo-token');
          onClose();
        }, 500);
      } else {
        throw new Error(data.message || 'Failed to switch persona');
      }
    } catch (err: any) {
      const found = demoPersonas.find((p) => p.key === personaKey);
      if (found) {
        const fallbackUser: NexusUser = {
          ...currentUser,
          name: found.name,
          role: found.role,
          avatar: found.avatar,
          email: found.email,
        };
        onLoginSuccess(fallbackUser, 'demo-token');
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your registered email address.' });
      return;
    }
    if (!password) {
      setFeedback({ type: 'error', message: 'Please enter your password.' });
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setFeedback({ type: 'success', message: `Welcome back, ${data.user.name}!` });
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onClose();
        }, 500);
      } else {
        setFeedback({ type: 'error', message: data.error || data.message || 'Unable to sign in. Please verify your credentials.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Network error connecting to node authentication service.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({ type: 'error', message: 'Full name is required.' });
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFeedback({ type: 'error', message: 'A valid email address is required.' });
      return;
    }
    if (!password || password.length < 6) {
      setFeedback({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match. Please re-enter carefully.' });
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role: role.trim() || 'Emergent Thinker & Researcher',
          bio: bio.trim() || 'Synthesizing knowledge across NEXUS Social Worlds.',
          skills: ['Idea Formulation', 'Remixing', 'Cross-Domain Innovation'],
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setFeedback({ type: 'success', message: `Account created for ${data.user.name}!` });
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onClose();
        }, 600);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to create account.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Server communication error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="nexus-auth-dialog"
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden transition-all"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50/40">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-700 font-bold">
              NEXUS Node Identity
            </span>
          </div>

          <h2 className="text-xl font-bold font-display text-slate-900">
            {isAuthenticated && activeTab === 'session'
              ? 'Active Authenticated Node'
              : activeTab === 'signin'
              ? 'Access Your Node'
              : activeTab === 'register'
              ? 'Create New Member Node'
              : 'Switch Active Persona'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAuthenticated && activeTab === 'session'
              ? 'Manage your current authenticated session or log out.'
              : 'Secure credentials for Social Worlds, Sparks, and DAG branches.'}
          </p>

          {/* Tab selector - Only displayed if not in active session view or if explicitly switching */}
          {(!isAuthenticated || activeTab !== 'session') && (
            <div className="flex gap-1 mt-4 p-1 bg-slate-200/60 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setFeedback(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setFeedback(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('switch');
                  setFeedback(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'switch'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Demo Personas
              </button>
            </div>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* VIEW 0: WHEN USER IS ALREADY SIGNED IN -> Hide other details & give logout option */}
        {isAuthenticated && activeTab === 'session' && (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-300 shadow-sm shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                    Connected
                  </span>
                </div>
                <p className="text-xs font-mono text-indigo-600 font-medium">{currentUser.handle}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{currentUser.role}</p>
                {currentUser.email && (
                  <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="block text-sm font-extrabold font-display text-indigo-600">
                  {currentUser.stats.sparksCreated}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Sparks</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="block text-sm font-extrabold font-display text-sky-600">
                  {currentUser.stats.ideasRemixed}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Remixes</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="block text-sm font-extrabold font-display text-amber-600">
                  {currentUser.stats.worldsEntered}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Worlds</span>
              </div>
            </div>

            {/* Prominent Primary Logout Action */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setFeedback({ type: 'success', message: 'You have logged out successfully.' });
                  setTimeout(() => onClose(), 600);
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Session</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('switch');
                  setFeedback(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                <span>Switch to Another Account / Persona</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: SIGN IN */}
        {(!isAuthenticated || activeTab !== 'session') && activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="elena@nexus.network"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Demo accounts password is <span className="font-bold text-indigo-600">nexus123</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Node...</span>
              ) : (
                <>
                  <span>Sign In to Node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Don't have an account?</span>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
              >
                Register with password →
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER WITH MANDATORY PASSWORD */}
        {(!isAuthenticated || activeTab !== 'session') && activeTab === 'register' && (
          <form onSubmit={handleRegister} className="p-6 space-y-3.5 max-h-[440px] overflow-y-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="maya@research.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* MANDATORY PASSWORD FIELD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password (min. 6 characters) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specialty / Domain
              </label>
              <input
                type="text"
                placeholder="e.g. Neural Robotics, Climate DeSci"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brief Bio
              </label>
              <textarea
                rows={2}
                placeholder="What topics are you passionate about evolving?"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Registering Node...</span>
              ) : (
                <>
                  <span>Create Account with Password</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 3: SWITCH DEMO PERSONAS */}
        {(!isAuthenticated || activeTab !== 'session') && activeTab === 'switch' && (
          <div className="p-6 space-y-3">
            <p className="text-xs text-slate-500 mb-1">
              Select any pre-configured researcher persona to explore NEXUS from diverse perspectives:
            </p>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto">
              {demoPersonas.map((persona) => {
                const isCurrent = currentUser.name === persona.name;
                return (
                  <button
                    key={persona.key}
                    onClick={() => handlePersonaSelect(persona.key)}
                    disabled={isLoading}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer group ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {persona.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{persona.role}</p>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${persona.color}`}>
                        {persona.tag}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Back button if authenticated */}
            {isAuthenticated && (
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('session')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
                >
                  ← Return to Current Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

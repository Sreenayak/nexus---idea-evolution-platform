import React, { useState } from 'react';
import { SocialWorld, Spark, NexusUser } from '../types';
import { Sparkles, X, Bot, Globe2, ArrowRight } from 'lucide-react';

interface CreateSparkModalProps {
  isOpen: boolean;
  onClose: () => void;
  worlds: SocialWorld[];
  defaultWorldId?: string;
  currentUser: NexusUser;
  onCreateSpark: (newSparkData: {
    worldId: string;
    title: string;
    content: string;
    tags: string[];
  }) => void;
}

export const CreateSparkModal: React.FC<CreateSparkModalProps> = ({
  isOpen,
  onClose,
  worlds,
  defaultWorldId,
  currentUser,
  onCreateSpark,
}) => {
  if (!isOpen) return null;

  const [worldId, setWorldId] = useState(defaultWorldId || worlds[0]?.id || 'world-ai');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Hypothesis', 'OpenCollab']);

  const quickPrompts = [
    {
      title: 'Autonomous Multi-Agent Consensus Protocol for Research Validation',
      worldId: 'world-ai',
      text: 'Instead of centralized peer review, what if 5 competing AI models critique an ArXiv draft and stake verification tokens?',
      tags: ['AgentConsensus', 'PeerReview', 'DeSci'],
    },
    {
      title: 'Zero-Latency Ambient Soundscapes Modulated by Eye Micro-Tremors',
      worldId: 'world-design',
      text: 'Spatial audio that dynamically shifts reverberation when user focus intensifies, creating psychological depth cues.',
      tags: ['SpatialAudio', 'Haptics', 'CalmTech'],
    },
    {
      title: 'Decentralized Micro-Venture Swarms Powered by Solo Founders',
      worldId: 'world-startups',
      text: 'A collaborative legal template and automated token distribution system for 48-hour hackathon project spin-outs.',
      tags: ['MicroSaaS', 'SwarmOps', 'Startups'],
    },
  ];

  const handleApplyPrompt = (p: typeof quickPrompts[0]) => {
    setWorldId(p.worldId);
    setTitle(p.title);
    setContent(p.text);
    setTags(p.tags);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onCreateSpark({
      worldId,
      title: title.trim(),
      content: content.trim(),
      tags,
    });
    onClose();
  };

  return (
    <div
      id="create-spark-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="create-spark-modal-container"
        className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Ignite a New Spark
            </h3>
            <p className="text-xs text-slate-500">
              Pose an evocative hypothesis, challenge, or question to ignite community collaboration.
            </p>
          </div>
        </div>

        {/* Quick prompt seed cards */}
        <div className="mb-5 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <span className="text-[11px] font-mono text-indigo-700 uppercase font-bold flex items-center gap-1.5 mb-2">
            <Bot className="w-3.5 h-3.5" />
            Quick Inspiration Seeds
          </span>
          <div className="space-y-1.5">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPrompt(qp)}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-indigo-50/80 text-xs text-slate-700 hover:text-indigo-900 border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-between group shadow-2xs"
              >
                <span className="line-clamp-1 font-medium">{qp.title}</span>
                <span className="text-[10px] font-mono text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                  Use Seed →
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Target World */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Select Social World
            </label>
            <div className="relative">
              <select
                value={worldId}
                onChange={(e) => setWorldId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
              >
                {worlds.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.category}) — {w.activeParticipants} minds active
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Spark Title */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Spark Title (Question, Hypothesis, or Concept)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. What if AI could automatically uncover scientific research gaps?"
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          {/* Spark Content */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Spark Hypothesis & Context
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the core intuition, mechanism, or open problem. What makes this exciting for other minds to remix or challenge?"
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none shadow-2xs"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Tags
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tag..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 cursor-pointer"
              >
                + Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Broadcast Spark to Universe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

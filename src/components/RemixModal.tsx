import React, { useState } from 'react';
import { Spark, RemixType, NexusUser } from '../types';
import {
  GitBranch,
  X,
  Sparkles,
  Rocket,
  ShieldAlert,
  Target,
  Repeat,
  Layers,
  Bot,
  ArrowRight,
} from 'lucide-react';

interface RemixModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentSpark: Spark | null;
  currentUser: NexusUser;
  onSubmitRemix: (remixData: {
    parentSparkId: string;
    worldId: string;
    title: string;
    content: string;
    remixType: RemixType;
    evolutionNote: string;
    tags: string[];
  }) => void;
}

export const RemixModal: React.FC<RemixModalProps> = ({
  isOpen,
  onClose,
  parentSpark,
  currentUser,
  onSubmitRemix,
}) => {
  if (!isOpen || !parentSpark) return null;

  const [remixType, setRemixType] = useState<RemixType>('extend');
  const [title, setTitle] = useState(
    `${parentSpark.title.slice(0, 42)}... + `
  );
  const [content, setContent] = useState('');
  const [evolutionNote, setEvolutionNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Remix', 'Evolution']);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const archetypes: {
    type: RemixType;
    label: string;
    icon: React.ElementType;
    activeClass: string;
    description: string;
  }[] = [
    {
      type: 'extend',
      label: 'Extend',
      icon: Rocket,
      activeClass: 'text-sky-700 border-sky-300 bg-sky-50',
      description: 'Add a new capability, automation layer, or scale factor',
    },
    {
      type: 'challenge',
      label: 'Challenge',
      icon: ShieldAlert,
      activeClass: 'text-rose-700 border-rose-300 bg-rose-50',
      description: 'Critique fundamental assumptions or counter with stress tests',
    },
    {
      type: 'specialize',
      label: 'Specialize',
      icon: Target,
      activeClass: 'text-amber-700 border-amber-300 bg-amber-50',
      description: 'Focus deeply on an ultra-specific technical or market vertical',
    },
    {
      type: 'pivot',
      label: 'Pivot',
      icon: Repeat,
      activeClass: 'text-indigo-700 border-indigo-300 bg-indigo-50',
      description: 'Transplant the core mechanism into an entirely different world',
    },
    {
      type: 'synthesize',
      label: 'Synthesize',
      icon: Layers,
      activeClass: 'text-emerald-700 border-emerald-300 bg-emerald-50',
      description: 'Bridge this idea with a complementary technology or protocol',
    },
  ];

  const handleGenerateAiIdeas = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiSuggestions([
        `+ Autonomous Verification Network: Introduce zero-knowledge proof logging for any generated output.`,
        `+ Edge-Compute Sandbox: Run local containerized verification directly on user devices to eliminate cloud latency.`,
        `+ Epistemic Prediction Market: Allow researchers to stake reputational tokens on whether experiments hold true.`,
      ]);
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleApplyAiSuggestion = (suggestion: string) => {
    const parts = suggestion.split(': ');
    const newTitle = `${parentSpark.title.slice(0, 36)}... ${parts[0]}`;
    setTitle(newTitle);
    setContent(parts[1] || suggestion);
    setEvolutionNote(`Coupled original concept with ${parts[0]}.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmitRemix({
      parentSparkId: parentSpark.id,
      worldId: parentSpark.worldId,
      title: title.trim(),
      content: content.trim(),
      remixType,
      evolutionNote:
        evolutionNote.trim() ||
        `${remixType.toUpperCase()} branch: Added new perspective to original spark.`,
      tags,
    });
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div
      id="remix-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="remix-modal-container"
        className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in-95 duration-200 text-slate-900"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900">
              Remix Idea Branch
            </h3>
            <p className="text-xs text-slate-500">
              Ideas aren't meant to be scrolled past. Evolve this Spark with your contribution.
            </p>
          </div>
        </div>

        {/* Parent Spark Reference Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
            <span className="font-semibold text-indigo-600">Branching From:</span>
            <span>{parentSpark.author.name}</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-800">
            {parentSpark.title}
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Remix Archetype */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-2">
              Select Remix Vector
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {archetypes.map((arch) => {
                const Icon = arch.icon;
                const isSelected = remixType === arch.type;
                return (
                  <button
                    key={arch.type}
                    type="button"
                    onClick={() => setRemixType(arch.type)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? arch.activeClass + ' ring-1 ring-indigo-300 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{arch.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 italic">
              {archetypes.find((a) => a.type === remixType)?.description}
            </p>
          </div>

          {/* NOVA AI Co-Ideator Inspiration */}
          <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-indigo-800 flex items-center gap-1.5 font-semibold">
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                NOVA AI Inspiration Angles
              </span>
              <button
                type="button"
                onClick={handleGenerateAiIdeas}
                disabled={isGeneratingAi}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3" />
                {isGeneratingAi ? 'Synthesizing...' : 'Suggest Angles'}
              </button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="space-y-1.5">
                {aiSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyAiSuggestion(sug)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-white hover:bg-indigo-50/80 text-slate-700 hover:text-indigo-900 border border-slate-200 transition-colors flex items-center justify-between group shadow-2xs"
                  >
                    <span className="line-clamp-1">{sug}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Remix Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Gap Hunter + Reproduction Sandbox"
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Your Perspective / Extension
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detail your insight, alternative algorithm, mechanism, or architectural improvement..."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none shadow-2xs"
            />
          </div>

          {/* Evolution Note */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Evolution Summary Note (For the Graph)
            </label>
            <input
              type="text"
              value={evolutionNote}
              onChange={(e) => setEvolutionNote(e.target.value)}
              placeholder="e.g. Extended hypothesis by adding containerized Docker sandboxes."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
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
                placeholder="Add keyword tag..."
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

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Publish Remix to Graph
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

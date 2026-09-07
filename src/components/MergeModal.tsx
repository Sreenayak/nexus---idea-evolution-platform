import React, { useState } from 'react';
import { Spark, NexusUser } from '../types';
import {
  GitMerge,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Layers,
  FolderGit2,
} from 'lucide-react';

interface MergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSparkA: Spark | null;
  initialSparkB?: Spark | null;
  availableSparks: Spark[];
  currentUser: NexusUser;
  onExecuteMerge: (mergeData: {
    sparkAId: string;
    sparkBId: string;
    mergedTitle: string;
    synthesisDescription: string;
    projectGoal: string;
    worldId: string;
  }) => void;
}

export const MergeModal: React.FC<MergeModalProps> = ({
  isOpen,
  onClose,
  initialSparkA,
  initialSparkB,
  availableSparks,
  currentUser,
  onExecuteMerge,
}) => {
  if (!isOpen || !initialSparkA) return null;

  // Filter possible candidate sparks to merge with
  const candidateSparks = availableSparks.filter(
    (s) => s.id !== initialSparkA.id && s.status !== 'project'
  );

  const [selectedSparkBId, setSelectedSparkBId] = useState<string>(
    initialSparkB?.id || (candidateSparks[0]?.id ?? '')
  );

  const sparkB =
    availableSparks.find((s) => s.id === selectedSparkBId) || candidateSparks[0];

  const defaultSynthesizedTitle = sparkB
    ? `Nexus Synergy: ${initialSparkA.title.slice(0, 24)}... × ${sparkB.title.slice(0, 24)}...`
    : 'Collaborative Synthesis Project';

  const [mergedTitle, setMergedTitle] = useState(defaultSynthesizedTitle);
  const [synthesisDescription, setSynthesisDescription] = useState(
    'SYNTHESIS: Unifying these complementary paradigms to create a single cross-functional pipeline. Merging interface design with autonomous micro-services.'
  );
  const [projectGoal, setProjectGoal] = useState(
    'Deliver a working interactive alpha prototype within a 48-hour community sprint.'
  );

  const handleMerge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sparkB || !mergedTitle.trim()) return;

    onExecuteMerge({
      sparkAId: initialSparkA.id,
      sparkBId: sparkB.id,
      mergedTitle: mergedTitle.trim(),
      synthesisDescription: synthesisDescription.trim(),
      projectGoal: projectGoal.trim(),
      worldId: initialSparkA.worldId,
    });
    onClose();
  };

  return (
    <div
      id="merge-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="merge-modal-container"
        className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in-95 duration-200 text-slate-900"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Idea Merge Studio
            </h3>
            <p className="text-xs text-slate-500">
              Transform divergent Sparks into a unified collaborative project.
            </p>
          </div>
        </div>

        {/* Dual Node Convergence Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mb-6">
          {/* Branch A */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative">
            <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block mb-1">
              Source Idea A
            </span>
            <h4 className="text-xs font-bold text-slate-900 mb-1 line-clamp-2">
              {initialSparkA.title}
            </h4>
            <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">
              {initialSparkA.content}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <span>Author:</span>
              <span className="font-semibold text-slate-800">{initialSparkA.author.name}</span>
            </div>
          </div>

          {/* Merge Central Indicator Pill */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-purple-600 border-2 border-white shadow-md items-center justify-center">
            <GitMerge className="w-4 h-4 text-white" />
          </div>

          {/* Branch B */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-700">
                Source Idea B
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Select candidate</span>
            </div>

            <select
              value={selectedSparkBId}
              onChange={(e) => {
                setSelectedSparkBId(e.target.value);
                const found = availableSparks.find((s) => s.id === e.target.value);
                if (found) {
                  setMergedTitle(
                    `Nexus Synergy: ${initialSparkA.title.slice(0, 20)}... × ${found.title.slice(0, 20)}...`
                  );
                }
              }}
              className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 mb-2 focus:outline-none focus:border-indigo-500 shadow-2xs"
            >
              {candidateSparks.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.slice(0, 50)}... ({s.author.name})
                </option>
              ))}
            </select>

            {sparkB && (
              <>
                <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">
                  {sparkB.content}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span>Author:</span>
                  <span className="font-semibold text-slate-800">{sparkB.author.name}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Synthesis Form */}
        <form onSubmit={handleMerge} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Merged Collaborative Project Title
            </label>
            <input
              type="text"
              required
              value={mergedTitle}
              onChange={(e) => setMergedTitle(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Synergy Thesis (How these ideas combine)
            </label>
            <textarea
              required
              rows={3}
              value={synthesisDescription}
              onChange={(e) => setSynthesisDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1.5">
              Initial 48-Hour Sprint Milestone
            </label>
            <input
              type="text"
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              placeholder="e.g. Release interactive prototype on GitHub and ArXiv."
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 shadow-2xs"
            />
          </div>

          {/* Outcome preview */}
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs text-purple-900">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-600" />
              <span>
                Merging will establish an <strong>Active Project Node</strong> on the Idea Evolution Graph.
              </span>
            </div>
            <span className="font-mono text-[10px] text-purple-700 font-semibold">Team: 2+ Nodes</span>
          </div>

          {/* Buttons */}
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
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Execute Merge & Instantiate Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

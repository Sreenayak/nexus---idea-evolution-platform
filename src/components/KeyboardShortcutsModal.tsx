import React from 'react';
import {
  Keyboard,
  X,
  Search,
  PlusCircle,
  Volume2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      category: 'Global Navigation',
      items: [
        { keys: ['/'], description: 'Open Omni-Search Engine' },
        { keys: ['Ctrl', 'K'], description: 'Alternative search shortcut' },
        { keys: ['1'], description: 'Navigate to Home / Landing' },
        { keys: ['2'], description: 'Navigate to Universe Map' },
        { keys: ['3'], description: 'Navigate to Worlds Directory' },
        { keys: ['4'], description: 'Navigate to Evolution Lineage (DAG)' },
        { keys: ['5'], description: 'Navigate to Sprint Challenges' },
        { keys: ['6'], description: 'Navigate to Researchers & Synergy' },
      ],
    },
    {
      category: 'Idea Evolution & Creation',
      items: [
        { keys: ['N'], description: 'Ignite New Spark (Idea submission)' },
        { keys: ['M'], description: 'Toggle Acoustic Ambient Sound FX' },
        { keys: ['?'], description: 'Open this Keyboard Shortcuts Guide' },
        { keys: ['Esc'], description: 'Close any active modal or drawer' },
      ],
    },
    {
      category: 'Accessibility & Screen Readers',
      items: [
        { keys: ['Tab'], description: 'Navigate focus through interactive cards & buttons' },
        { keys: ['Enter'], description: 'Activate selected button, branch, or node' },
        { keys: ['Space'], description: 'Toggle reactions and expand spark details' },
      ],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 id="shortcuts-dialog-title" className="text-lg font-bold font-display text-slate-900">
                Keyboard Navigation & Shortcuts
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Full accessibility controls designed for fast, frictionless collaboration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close keyboard shortcuts dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/40">
          {shortcuts.map((section) => (
            <div key={section.category} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                {section.category}
              </h4>
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-slate-700 font-medium">{item.description}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2.5 py-1 text-[11px] font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg text-slate-800 shadow-xs min-w-[28px] text-center"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>WCAG 2.1 AA Compliant Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

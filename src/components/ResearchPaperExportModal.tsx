import React, { useState } from 'react';
import { Spark, SocialWorld } from '../types';
import {
  FileText,
  Copy,
  Check,
  Download,
  X,
  Share2,
  BookOpen,
  GitBranch,
  Sparkles,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface ResearchPaperExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  spark: Spark | null;
  world?: SocialWorld | null;
  allSparks: Spark[];
}

export const ResearchPaperExportModal: React.FC<ResearchPaperExportModalProps> = ({
  isOpen,
  onClose,
  spark,
  world,
  allSparks,
}) => {
  if (!isOpen || !spark) return null;

  const [copiedFormat, setCopiedFormat] = useState<'markdown' | 'bibtex' | null>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'bibtex' | 'preview'>('preview');

  // Ancestral tree trace
  const lineageChain: Spark[] = [];
  let curr: Spark | undefined = spark;
  const visited = new Set<string>();

  while (curr && !visited.has(curr.id)) {
    lineageChain.unshift(curr);
    visited.add(curr.id);
    if (curr.parentSparkId) {
      curr = allSparks.find((s) => s.id === curr?.parentSparkId);
    } else {
      break;
    }
  }

  const generateMarkdown = () => {
    return `# ${spark.title}
**Domain**: ${world?.name || 'Open Collaborative Domain'}
**Author**: ${spark.author.name} (@${spark.author.handle})
**Status**: ${spark.status.toUpperCase()} | **Energy**: ${spark.energy} / 100
**Timestamp**: ${new Date(spark.createdAt).toUTCString()}
**Nexus Lineage ID**: \`${spark.id}\`

---

## 1. Abstract & Core Hypothesis
${spark.content}

## 2. Genealogical Lineage & Prior Art
This hypothesis evolved through ${lineageChain.length} generational iterations within the NEXUS Knowledge Graph:
${lineageChain
  .map(
    (node, idx) =>
      `- **Gen ${idx + 1}**: [${node.title}](https://nexus.world/sparks/${node.id}) by ${node.author.name} (${node.remixType || 'Genesis Node'})\n  > *${node.evolutionNote || 'Original foundational hypothesis.'}*`
  )
  .join('\n\n')}

## 3. Epistemic Peer Reactions & Empirical Verification
- **Paradigm Shift Conviction**: ${spark.reactions?.paradigmShift || 0} peer endorsements
- **Contrarian Tension Points**: ${spark.reactions?.contrarian || 0} counter-theses evaluated
- **Empirical Rigor Level**: ${spark.reactions?.empiricalRigor || 0} peer replications
- **Moonshot Audacity**: ${spark.reactions?.moonshot || 0} high-impact horizon index

## 4. Metadata & Tags
${spark.tags.map((t) => `\`#${t}\``).join(' ')}

---
*Synthesized via NEXUS Social Worlds & Idea Evolution Platform.*
`;
  };

  const generateBibTeX = () => {
    const key = `${spark.author.handle}_${spark.id.replace(/[^a-zA-Z0-9]/g, '')}`;
    return `@article{nexus_${key},
  author = {${spark.author.name}},
  title = {{${spark.title}}},
  journal = {NEXUS Idea Evolution Repository},
  year = {${new Date().getFullYear()}},
  url = {https://nexus.world/sparks/${spark.id}},
  note = {Lineage depth: ${lineageChain.length}, Domain: ${world?.name || 'General Science'}}
}`;
  };

  const handleCopy = (type: 'markdown' | 'bibtex') => {
    soundEffects.playSparkIgnite();
    const text = type === 'markdown' ? generateMarkdown() : generateBibTeX();
    navigator.clipboard.writeText(text);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = () => {
    soundEffects.playRemixBranch();
    const text = generateMarkdown();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEXUS-${spark.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paper-export-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="paper-export-title" className="text-lg font-bold font-display text-slate-900">
                  Export Academic Paper & Lineage Tree
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900">
                  Open Citation
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Generate citeable research artifacts with complete provenance for academia and grant DAOs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="px-6 py-2 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Formatted Abstract
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'markdown'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Raw Markdown (.md)
            </button>
            <button
              onClick={() => setActiveTab('bibtex')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'bibtex'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              BibTeX Citation
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeTab === 'bibtex' ? 'bibtex' : 'markdown')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedFormat ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 font-sans">
          {activeTab === 'preview' && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-bold">
                  {world?.name || 'Interdisciplinary Node'} • Gene Depth: {lineageChain.length}
                </span>
                <h1 className="text-xl font-bold font-display text-slate-900 mt-1">{spark.title}</h1>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  By {spark.author.name} (@{spark.author.handle}) • Published via NEXUS Lineage
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                  Hypothesis Statement
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {spark.content}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Evolutionary Provenance Chain ({lineageChain.length} Generations)</span>
                </h4>
                <div className="space-y-2">
                  {lineageChain.map((node, i) => (
                    <div
                      key={node.id}
                      className="text-xs p-3 rounded-xl border border-slate-100 bg-white flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-slate-800">{node.title}</span>
                          <span className="text-[10px] text-slate-500 block">by {node.author.name}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {node.remixType || 'Genesis'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'markdown' && (
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap selection:bg-indigo-500">
              {generateMarkdown()}
            </pre>
          )}

          {activeTab === 'bibtex' && (
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap selection:bg-indigo-500">
              {generateBibTeX()}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

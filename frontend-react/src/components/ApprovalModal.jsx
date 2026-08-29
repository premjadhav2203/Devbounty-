import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function ApprovalModal({ pending, onApprove, onReject }) {
  if (!pending) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-amber-500/10 p-6 flex items-center border-b border-amber-500/30">
            <ShieldAlert className="text-amber-400 mr-3 flex-shrink-0" size={28} />
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Human Approval Required</h2>
              <p className="text-amber-300/80 mt-1 text-sm">
                The agent wants to open a real Pull Request on <span className="font-semibold">{pending.repo}</span>. Review the fix before it goes out.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="mb-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Issue</div>
              <div className="font-bold text-white">{pending.issue_title}</div>
              <div className="text-xs text-slate-500 mt-1">Target file: <span className="font-mono text-slate-400">{pending.target_file_path}</span></div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Agent Analysis</h3>
              <div className="bg-slate-950 rounded-xl p-4 text-sm text-slate-300 font-mono border border-slate-800 shadow-inner">
                {pending.analysis}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2">Original Code</h3>
                <div className="bg-slate-950 rounded-xl p-4 text-xs font-mono text-red-300 overflow-x-auto border border-red-900/30 max-h-64 custom-scrollbar">
                  <pre>{pending.original_code}</pre>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">Proposed Fix</h3>
                <div className="bg-slate-950 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-900/30 max-h-64 custom-scrollbar">
                  <pre>{pending.fixed_code}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-800/50 p-6 border-t border-slate-700/50 flex justify-end gap-3">
            <button
              onClick={() => onReject(pending.run_id)}
              className="flex items-center bg-slate-800 hover:bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <X size={18} className="mr-2" /> Reject
            </button>
            <button
              onClick={() => onApprove(pending.run_id)}
              className="flex items-center bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            >
              <Check size={18} className="mr-2" /> Approve &amp; Submit PR
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

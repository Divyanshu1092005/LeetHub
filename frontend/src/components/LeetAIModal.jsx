import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles, Loader2, Code2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LeetAIModal = ({ isOpen, onClose, isLoading, feedback }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyFeedback = () => {
    if (!feedback) return;
    navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] transition-opacity"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-slate-950/95 border-l border-indigo-500/30 backdrop-blur-2xl shadow-2xl z-[120] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 border border-indigo-400/40 text-white shadow-lg shadow-indigo-500/25">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                    LeetAI Feedback <span className="text-indigo-400 font-mono text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">Mock Interviewer</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive code review, complexity analysis & dry run
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {feedback && !isLoading && (
                  <button
                    onClick={handleCopyFeedback}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                    title="Copy Markdown"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/20 animate-pulse">
                      <Sparkles className="w-10 h-10 text-indigo-400 animate-spin" style={{ animationDuration: "8s" }} />
                    </div>
                    <span className="absolute -bottom-2 -right-2 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                    </span>
                  </div>

                  <div className="text-center space-y-2 max-w-sm">
                    <h3 className="text-base font-semibold text-white flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                      Analyzing Code ...
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Evaluating logic, calculating time/space complexity, simulating testcases, and drafting Hinglish interviewer tips.
                    </p>
                  </div>

                  {/* Pulsing Skeleton Lines */}
                  <div className="w-full max-w-md space-y-3 pt-6">
                    <div className="h-4 bg-slate-800/80 rounded-lg animate-pulse w-3/4"></div>
                    <div className="h-4 bg-slate-800/60 rounded-lg animate-pulse w-full"></div>
                    <div className="h-4 bg-slate-800/80 rounded-lg animate-pulse w-5/6"></div>
                    <div className="h-20 bg-slate-800/40 rounded-xl animate-pulse w-full border border-slate-700/30 mt-4"></div>
                  </div>
                </div>
              ) : feedback ? (
                <div className="prose prose-invert prose-indigo max-w-none space-y-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 border-b border-slate-800 pb-2 mt-6 mb-3 flex items-center gap-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-slate-300 text-sm leading-relaxed font-normal my-2.5" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300 my-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-300 my-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-slate-300 text-sm leading-relaxed" {...props} />
                      ),
                      code: ({ node, inline, className, children, ...props }) => {
                        return inline ? (
                          <code
                            className="bg-indigo-950/80 text-indigo-300 px-1.5 py-0.5 rounded-md font-mono text-xs border border-indigo-800/50"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-lg">
                            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800/80 border-b border-slate-700/50 text-[11px] font-mono text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                                Code / Pseudocode
                              </span>
                            </div>
                            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                              <code {...props}>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-md">
                          <table className="table w-full text-xs text-slate-300" {...props} />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th className="bg-slate-800/90 text-indigo-300 font-semibold p-3 text-left border-b border-slate-700" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="p-3 border-b border-slate-800/60" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="text-white font-semibold" {...props} />
                      ),
                    }}
                  >
                    {feedback}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-center py-20 text-slate-400">
                  <p>No feedback available yet. Run or submit your solution and click the AI assistant button to generate feedback!</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(LeetAIModal);

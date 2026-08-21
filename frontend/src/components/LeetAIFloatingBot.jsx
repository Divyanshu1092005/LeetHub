import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, X } from "lucide-react";

const LeetAIFloatingBot = ({ isVisible, onClick, onDismiss }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{
            y: [0, -8, 0],
            opacity: 1,
            scale: 1,
            transition: {
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            },
          }}
          exit={{ y: 80, opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 group"
        >
          {/* Animated Glow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse pointer-events-none" />

          {/* Trigger Button */}
          <button
            onClick={onClick}
            type="button"
            className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800/95 border border-indigo-400/40 text-white shadow-2xl backdrop-blur-xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
              <Bot className="w-5 h-5 text-indigo-300 animate-bounce" style={{ animationDuration: "2s" }} />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent flex items-center gap-1">
                Ask LeetAI for Feedback <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Instant Mock Interviewer Review
              </span>
            </div>
          </button>

          {/* Dismiss button */}
          {onDismiss && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              type="button"
              className="relative p-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-all shadow-md"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(LeetAIFloatingBot);

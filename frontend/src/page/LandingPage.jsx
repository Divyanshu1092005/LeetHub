import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Terminal, BookOpen, BarChart2, Cpu } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-16 pb-28 text-slate-100 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 opacity-40 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/10 opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
      >
        <span className="badge badge-primary font-semibold tracking-wide text-xs px-3 py-1.5 mb-6 uppercase shadow-md shadow-primary/25">
          Elevate Your Preparation
        </span>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-primary bg-clip-text text-transparent">
          Master the algorithms.<br />Crush the interview.
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 font-medium mb-10 max-w-2xl leading-relaxed">
          Your ultimate <span className="text-primary font-semibold">CodingMate</span> for algorithmic mastery. Build collections, verify code sandboxes, and level up your software engineering career.
        </p>

        <Link to="/problems">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg font-bold text-white px-8 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 relative overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            Start Solving
          </motion.button>
        </Link>
      </motion.div>

      {/* AI INTERVIEW COACH (FEATURE SHOWCASE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="badge badge-outline badge-primary font-bold text-xs px-2.5 py-1">UPCOMING FEATURE</span>
            <span className="badge badge-warning font-extrabold text-[10px] px-1.5 py-0.5">PRO</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            <Sparkles className="text-warning size-7 animate-pulse" />
            AI Interview Coach
          </h2>
          
          <p className="text-neutral-400 leading-relaxed font-medium">
            Take the guesswork out of optimizations. After submitting code, our integrated AI Coach automatically breaks down your logic, highlights bottleneck statements, computes time/space complexity, and leads an interactive discussion simulated like a real FAANG interview.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-md text-primary mt-0.5"><Cpu className="size-4" /></div>
              <p className="text-sm font-semibold text-neutral-300">Interactive complexity dry-runs</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-md text-primary mt-0.5"><Cpu className="size-4" /></div>
              <p className="text-sm font-semibold text-neutral-300">Real-time mock interview transcripts</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-md text-primary mt-0.5"><Cpu className="size-4" /></div>
              <p className="text-sm font-semibold text-neutral-300">Alternate space O(1) suggestion engine</p>
            </div>
          </div>
        </div>

        {/* Floating CSS Chat Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            variants={{
              animate: {
                y: [0, -12, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              },
            }}
            animate="animate"
            className="w-full max-w-md bg-gradient-to-br from-base-300/80 to-base-200/80 border border-neutral-700/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md"
          >
            {/* Top Border Highlight Glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 mb-4">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-inner">
                🤖
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">LeetLab AI Assistant</h4>
                <p className="text-[10px] text-success font-medium flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-success animate-ping"></span> Online
                </p>
              </div>
            </div>

            {/* Simulated Chat Bubbles */}
            <div className="space-y-4 text-xs font-medium">
              {/* User message */}
              <div className="flex flex-col items-end">
                <div className="bg-neutral-800 text-slate-200 p-3 rounded-2xl rounded-tr-none max-w-[85%] border border-neutral-700/30">
                  <p className="leading-relaxed">
                    My dynamic programming solution passes, but is there a way to optimize space to O(1)?
                  </p>
                </div>
                <span className="text-[9px] text-neutral-500 mt-1 mr-1">You • 2m ago</span>
              </div>

              {/* Bot response */}
              <div className="flex flex-col items-start">
                <div className="bg-primary/10 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[85%] border border-primary/20 relative shadow-inner">
                  <p className="leading-relaxed">
                    Absolutely! Instead of keeping the full <code className="text-primary bg-neutral-900 px-1 py-0.5 rounded">dp</code> array of size <code className="text-primary bg-neutral-900 px-1 py-0.5 rounded">n</code>, you only need the last two states (<code className="text-warning">a</code> and <code className="text-warning">b</code>) to compute the next step. This reduces your space complexity from <span className="text-rose-400">O(N)</span> to <span className="text-emerald-400 font-semibold">O(1)</span>!
                  </p>
                </div>
                <span className="text-[9px] text-neutral-500 mt-1 ml-1">AI Coach • Just now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PLATFORM HIGHLIGHTS (3-COLUMN GRID) */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-8 text-center text-white">
          Engineered for Modern Engineers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-base-200 border border-base-300 rounded-2xl hover:border-primary/50 transition-colors shadow-lg hover:shadow-primary/5 cursor-default group"
          >
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
              <Terminal className="size-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Multi-language Sandbox</h4>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium">
              Write solutions in JavaScript, Java, or Python and dry-run them directly against secure execution sandboxes.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-base-200 border border-base-300 rounded-2xl hover:border-primary/50 transition-colors shadow-lg hover:shadow-primary/5 cursor-default group"
          >
            <div className="p-3 bg-indigo-500/10 text-indigo-400 w-fit rounded-xl mb-4 group-hover:bg-indigo-500/20 transition-colors">
              <BookOpen className="size-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Custom Playlists</h4>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium">
              Create and manage organized sets of coding problems to curate specific study structures for upcoming interviews.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-base-200 border border-base-300 rounded-2xl hover:border-primary/50 transition-colors shadow-lg hover:shadow-primary/5 cursor-default group"
          >
            <div className="p-3 bg-secondary/10 text-secondary w-fit rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors">
              <BarChart2 className="size-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Real-time Metrics</h4>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium">
              Visualize your progress using radial gauges and difficulty trackers to evaluate your algorithm competencies.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

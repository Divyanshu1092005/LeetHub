import React from "react";
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory, Award, AlertTriangle } from "lucide-react";

const SubmitSummaryView = ({ submission }) => {
  if (!submission) return null;

  const isAccepted = submission.status === "Accepted";
  const testCases = submission.testCases || [];
  const passedTests = testCases.filter((tc) => tc.passed).length;
  const totalTests = testCases.length;

  // Safe parse runtime and memory
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const memoryArr = safeParse(submission.memory).map((m) => parseFloat(m));
  const avgMemory = memoryArr.length ? memoryArr.reduce((a, b) => a + b, 0) / memoryArr.length : 0;

  const timeArr = safeParse(submission.time).map((t) => parseFloat(t));
  const avgTime = timeArr.length ? (timeArr.reduce((a, b) => a + b, 0) / timeArr.length) * 1000 : 0; // in ms

  // First failing test case if any
  const firstFailingCase = testCases.find((tc) => !tc.passed);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Prominent Status Banner */}
      <div
        className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg ${
          isAccepted
            ? "bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-base-200 border-emerald-500/40 text-emerald-300"
            : "bg-gradient-to-r from-rose-950/40 via-rose-900/20 to-base-200 border-rose-500/40 text-rose-300"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl border ${
              isAccepted
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/20 border-rose-500/30 text-rose-400"
            }`}
          >
            {isAccepted ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <XCircle className="w-8 h-8" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-wide">
              {isAccepted ? "Accepted" : submission.status || "Wrong Answer"}
            </h2>
            <p className="text-sm opacity-80 mt-0.5">
              {isAccepted
                ? "Congratulations! Your solution passed all test cases."
                : `Your code failed on test case ${firstFailingCase ? firstFailingCase.testCase || 1 : 1}.`}
            </p>
          </div>
        </div>

        {/* Solved Progress Counter */}
        <div className="flex items-center gap-2 bg-base-300/60 px-4 py-2 rounded-xl border border-base-300 font-mono text-sm text-base-content">
          <Award className="w-4 h-4 text-warning" />
          <span>
            {passedTests} / {totalTests} Test Cases Passed
          </span>
        </div>
      </div>

      {/* Metrics Row: Runtime & Memory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Runtime Metric */}
        <div className="card bg-base-200 border border-base-300 shadow-md p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> Runtime
            </span>
            <span className="font-mono font-bold text-lg text-base-content">
              {avgTime.toFixed(0)} ms
            </span>
          </div>
        </div>

        {/* Memory Metric */}
        <div className="card bg-base-200 border border-base-300 shadow-md p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <Memory className="w-4 h-4 text-secondary" /> Memory Usage
            </span>
            <span className="font-mono font-bold text-lg text-base-content">
              {(avgMemory / 1024).toFixed(2)} MB ({avgMemory.toFixed(0)} KB)
            </span>
          </div>
        </div>
      </div>

      {/* Failing Test Case Details if Not Accepted */}
      {!isAccepted && firstFailingCase && (
        <div className="card bg-base-200 border border-rose-800/40 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Failing Test Case (Case {firstFailingCase.testCase || 1})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Input */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-neutral-400">Input:</div>
              <div className="bg-base-300/70 border border-base-300 rounded-xl p-3 font-mono text-xs whitespace-pre-wrap select-text">
                {firstFailingCase.input !== undefined && firstFailingCase.input !== ""
                  ? firstFailingCase.input
                  : <span className="text-neutral-500 italic">No input</span>}
              </div>
            </div>

            {/* Expected Output */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-neutral-400">Expected Output:</div>
              <div className="bg-base-300/70 border border-base-300 rounded-xl p-3 font-mono text-xs whitespace-pre-wrap text-emerald-400 font-semibold select-text">
                {firstFailingCase.expected}
              </div>
            </div>

            {/* Actual Output */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-neutral-400">Your Output:</div>
              <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3 font-mono text-xs whitespace-pre-wrap text-rose-300 select-text">
                {firstFailingCase.stdout || firstFailingCase.compile_output || firstFailingCase.stderr || (
                  <span className="text-neutral-500 italic">No output</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitSummaryView;

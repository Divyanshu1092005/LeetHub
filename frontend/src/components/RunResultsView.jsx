import React, { useState } from "react";
import { CheckCircle2, XCircle, Terminal, AlertCircle } from "lucide-react";

const RunResultsView = ({ runResults }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  if (!runResults || !runResults.results || runResults.results.length === 0) {
    return null;
  }

  const results = runResults.results;
  const currentCase = results[selectedCaseIdx] || results[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Test Cases Tabs */}
      <div className="flex items-center gap-2 border-b border-base-300 pb-2 overflow-x-auto">
        {results.map((res, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCaseIdx(idx)}
            className={`btn btn-sm gap-2 rounded-lg font-medium transition-all ${
              selectedCaseIdx === idx
                ? "btn-primary text-white shadow-sm"
                : "btn-ghost bg-base-200 text-base-content/80 hover:bg-base-300"
            }`}
          >
            {res.passed ? (
              <span className="size-2 rounded-full bg-emerald-400"></span>
            ) : (
              <span className="size-2 rounded-full bg-rose-400"></span>
            )}
            Case {idx + 1}
          </button>
        ))}
      </div>

      {/* Selected Case Header with Status Badge */}
      <div className="flex items-center justify-between bg-base-200 p-3.5 rounded-xl border border-base-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm text-base-content">
            Test Case {selectedCaseIdx + 1}
          </span>
        </div>
        <div>
          {currentCase.passed ? (
            <span className="badge badge-success bg-emerald-600 border-none text-white font-semibold py-2 px-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Passed
            </span>
          ) : (
            <span className="badge badge-error bg-rose-600 border-none text-white font-semibold py-2 px-3 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              Failed ({currentCase.status || "Wrong Answer"})
            </span>
          )}
        </div>
      </div>

      {/* Detail Panels: Input, Expected Output, Actual Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-400">Input:</div>
          <div className="bg-base-300/60 border border-base-300 rounded-xl p-3.5 font-mono text-sm min-h-[70px] whitespace-pre-wrap text-base-content select-text">
            {currentCase.input !== undefined && currentCase.input !== null && currentCase.input !== ""
              ? currentCase.input
              : <span className="text-neutral-500 italic">No input</span>}
          </div>
        </div>

        {/* Expected Output */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-400">Expected Output:</div>
          <div className="bg-base-300/60 border border-base-300 rounded-xl p-3.5 font-mono text-sm min-h-[70px] whitespace-pre-wrap text-emerald-400 font-semibold select-text">
            {currentCase.expected !== undefined && currentCase.expected !== null
              ? currentCase.expected
              : <span className="text-neutral-500 italic">N/A</span>}
          </div>
        </div>

        {/* Actual Output */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-400">Actual Output:</div>
          <div className={`border rounded-xl p-3.5 font-mono text-sm min-h-[70px] whitespace-pre-wrap select-text ${
            currentCase.passed
              ? "bg-base-300/60 border-base-300 text-emerald-400 font-semibold"
              : "bg-rose-950/20 border-rose-800/40 text-rose-300"
          }`}>
            {currentCase.stdout !== undefined && currentCase.stdout !== null && currentCase.stdout !== ""
              ? currentCase.stdout
              : currentCase.compile_output || currentCase.stderr || <span className="text-neutral-500 italic">No output</span>}
          </div>
        </div>
      </div>

      {/* Errors or stderr if any */}
      {(currentCase.compile_output || currentCase.stderr) && !currentCase.passed && (
        <div className="alert alert-error bg-rose-900/30 border border-rose-700/50 text-rose-200 text-xs font-mono p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <div className="whitespace-pre-wrap">
            {currentCase.compile_output || currentCase.stderr}
          </div>
        </div>
      )}
    </div>
  );
};

export default RunResultsView;

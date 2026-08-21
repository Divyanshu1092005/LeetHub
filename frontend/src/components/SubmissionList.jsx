import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code2,
} from "lucide-react";
import Editor from "@monaco-editor/react";

const SubmissionsList = ({ submissions, isLoading }) => {
  const [expandedSubmissionId, setExpandedSubmissionId] = useState(null);

  // Helper to safely display JSON or string source code
  const getSourceCodeString = (code) => {
    if (!code) return "";
    if (typeof code === "string") return code;
    return JSON.stringify(code, null, 2);
  };

  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  const toggleExpand = (id) => {
    setExpandedSubmissionId((prevId) => (prevId === id ? null : id));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-base-content/70">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);
        const isExpanded = expandedSubmissionId === submission.id;

        return (
          <div
            key={submission.id}
            className={`card bg-base-200 shadow-md hover:shadow-lg transition-all rounded-xl border ${
              isExpanded
                ? "border-primary/60 shadow-primary/5"
                : "border-base-300 hover:border-base-content/20"
            }`}
          >
            {/* Clickable Header Row */}
            <div
              onClick={() => toggleExpand(submission.id)}
              className="card-body p-4 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between">
                {/* Left Section: Status, Language */}
                <div className="flex items-center gap-3">
                  {submission.status === "Accepted" ? (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span className="font-semibold text-sm">Accepted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-error">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <span className="font-semibold text-sm">{submission.status}</span>
                    </div>
                  )}
                  <div className="badge badge-neutral text-xs">{submission.language}</div>
                </div>

                {/* Right Section: Runtime, Memory, Date, and Chevron */}
                <div className="flex items-center gap-4 text-xs text-base-content/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-3.5 h-3.5" />
                    <span>{avgMemory.toFixed(0)} KB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-base-content/50 ml-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Inline Accordion Expanded Code Block */}
            {isExpanded && (
              <div className="border-t border-base-300 p-4 bg-base-300/30 rounded-b-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-400">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>Submitted Source Code ({submission.language}):</span>
                </div>
                <div className="border border-base-300 rounded-lg overflow-hidden shadow-inner">
                  <Editor
                    height="320px"
                    language={
                      submission.language === "C++" || submission.language === "CPP"
                        ? "cpp"
                        : submission.language?.toLowerCase()
                    }
                    value={getSourceCodeString(submission.sourceCode)}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      fontFamily: "Fira Code, Courier New, monospace",
                      scrollBeyondLastLine: false,
                      lineNumbers: "on",
                      wordWrap: "on",
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
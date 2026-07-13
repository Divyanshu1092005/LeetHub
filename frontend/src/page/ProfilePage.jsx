import React, { useEffect, useState } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { Loader, User, BookOpen, Code2, FolderHeart, Calendar, CheckCircle, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { profileData, isLoading, fetchProfileData } = useProfileStore();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (isLoading && !profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-neutral-400">Failed to load profile data.</p>
        <button className="btn btn-primary mt-4" onClick={fetchProfileData}>
          Retry
        </button>
      </div>
    );
  }

  const { user, stats, submissions, playlists } = profileData;

  // Calculate stats percentage for radial progress
  const easyPercentage = stats.total.EASY > 0 ? Math.round((stats.solved.EASY / stats.total.EASY) * 100) : 0;
  const mediumPercentage = stats.total.MEDIUM > 0 ? Math.round((stats.solved.MEDIUM / stats.total.MEDIUM) * 100) : 0;
  const hardPercentage = stats.total.HARD > 0 ? Math.round((stats.solved.HARD / stats.total.HARD) * 100) : 0;
  const totalPercentage = stats.total.total > 0 ? Math.round((stats.solved.total / stats.total.total) * 100) : 0;

  // Helper to safely display JSON or string source code
  const getSourceCodeString = (code) => {
    if (!code) return "";
    if (typeof code === "string") return code;
    return JSON.stringify(code, null, 2);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-14 px-4 pb-20 relative">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary/10 opacity-30 blur-3xl rounded-md pointer-events-none"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-secondary/10 opacity-20 blur-3xl rounded-md pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: User Card & Playlists */}
        <div className="space-y-8 lg:col-span-1">
          {/* User info card */}
          <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-6 relative overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <div className="relative size-24 rounded-full border-2 border-primary overflow-hidden bg-slate-100 flex items-center justify-center mb-4">
                {user.image ? (
                  <img src={user.image} alt="Avatar" className="object-cover w-full h-full" />
                ) : (
                  <User className="size-12 text-slate-500" />
                )}
              </div>
              
              <h2 className="text-xl font-bold text-base-content">{user.name || "Coder"}</h2>
              <p className="text-sm text-neutral-400 mb-3">{user.email}</p>
              
              <span className={`badge ${user.role === "ADMIN" ? "badge-primary" : "badge-secondary"} font-semibold`}>
                {user.role}
              </span>
            </div>
          </div>

          {/* User Playlists */}
          <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-base-300 pb-2">
              <FolderHeart className="size-5 text-primary" />
              <h3 className="text-lg font-bold">My Playlists</h3>
            </div>

            {playlists.length > 0 ? (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="p-3 bg-base-300/40 border border-base-300 rounded-xl hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm line-clamp-1">{playlist.name}</h4>
                      <span className="badge badge-sm badge-outline text-[10px] px-1.5 py-0.5">
                        {playlist._count.problems} {playlist._count.problems === 1 ? "problem" : "problems"}
                      </span>
                    </div>
                    {playlist.description && (
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{playlist.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 text-center py-4">No playlists created yet.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & Submissions */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Solved Stats card */}
          <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-base-300 pb-2">
              <BookOpen className="size-5 text-primary" />
              <h3 className="text-lg font-bold">Solved Problems Progress</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Overall Radial Progress */}
              <div className="flex flex-col items-center shrink-0">
                <div 
                  className="radial-progress text-primary font-bold shadow-md bg-base-300" 
                  style={{ 
                    "--value": totalPercentage, 
                    "--size": "7rem", 
                    "--thickness": "8px" 
                  }} 
                  role="progressbar"
                >
                  <div className="text-center">
                    <span className="text-2xl font-extrabold text-base-content">{stats.solved.total}</span>
                    <span className="text-[10px] block text-neutral-400">/ {stats.total.total}</span>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 mt-3 font-semibold">Total Solved ({totalPercentage}%)</span>
              </div>

              {/* Breakdown Bars */}
              <div className="flex-1 w-full space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-success">Easy</span>
                    <span className="text-neutral-400">{stats.solved.EASY} / {stats.total.EASY} ({easyPercentage}%)</span>
                  </div>
                  <progress className="progress progress-success w-full h-2.5 bg-base-300" value={stats.solved.EASY} max={stats.total.EASY || 1}></progress>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-warning">Medium</span>
                    <span className="text-neutral-400">{stats.solved.MEDIUM} / {stats.total.MEDIUM} ({mediumPercentage}%)</span>
                  </div>
                  <progress className="progress progress-warning w-full h-2.5 bg-base-300" value={stats.solved.MEDIUM} max={stats.total.MEDIUM || 1}></progress>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-error">Hard</span>
                    <span className="text-neutral-400">{stats.solved.HARD} / {stats.total.HARD} ({hardPercentage}%)</span>
                  </div>
                  <progress className="progress progress-error w-full h-2.5 bg-base-300" value={stats.solved.HARD} max={stats.total.HARD || 1}></progress>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Card */}
          <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-base-300 pb-2">
              <Code2 className="size-5 text-primary" />
              <h3 className="text-lg font-bold">Recent Submissions</h3>
            </div>

            {submissions.length > 0 ? (
              <div className="overflow-x-auto rounded-xl">
                <table className="table table-zebra table-md w-full bg-base-300/30 text-base-content">
                  <thead>
                    <tr className="bg-base-300">
                      <th>Problem</th>
                      <th>Status</th>
                      <th>Language</th>
                      <th>Submitted At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => {
                      const isAccepted = sub.status === "Accepted";
                      return (
                        <tr key={sub.id} className="hover:bg-base-300/50 transition-colors">
                          <td>
                            {sub.problem ? (
                              <Link 
                                to={`/problem/${sub.problemId}`} 
                                className="font-semibold text-primary hover:underline block max-w-[200px] truncate"
                              >
                                {sub.problem.title}
                              </Link>
                            ) : (
                              <span className="text-neutral-500 font-semibold italic">Deleted Problem</span>
                            )}
                          </td>
                          <td>
                            <span 
                              className={`badge badge-sm font-semibold flex items-center gap-1 py-2 px-2.5 text-white ${
                                isAccepted ? "badge-success bg-emerald-600 border-none" : "badge-error bg-rose-600 border-none"
                              }`}
                            >
                              {isAccepted ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                              {sub.status}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-outline badge-md font-medium text-xs">
                              {sub.language}
                            </span>
                          </td>
                          <td className="text-xs text-neutral-400">
                            {new Date(sub.createdAt).toLocaleString()}
                          </td>
                          <td>
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="btn btn-xs btn-primary font-bold text-white rounded-md"
                            >
                              View Code
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 text-center py-6">No submissions recorded yet.</p>
            )}
          </div>

        </div>

      </div>

      {/* CODE VIEWER MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-3xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-base-300 bg-base-300/40 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
                  Code Submission for {selectedSubmission.problem?.title || "Deleted Problem"}
                </h3>
                <div className="flex gap-3 items-center mt-1">
                  <span className={`badge badge-sm font-semibold text-white ${selectedSubmission.status === "Accepted" ? "bg-emerald-600 border-none" : "bg-rose-600 border-none"}`}>
                    {selectedSubmission.status}
                  </span>
                  <span className="text-xs text-neutral-400">Language: {selectedSubmission.language}</span>
                  <span className="text-xs text-neutral-400">|</span>
                  <span className="text-xs text-neutral-400">{new Date(selectedSubmission.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-sm btn-circle btn-ghost text-neutral-400 hover:text-base-content"
              >
                ✕
              </button>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 p-4 bg-black/20">
              <div className="border border-base-300 rounded-xl overflow-hidden shadow-inner">
                <Editor
                  height="450px"
                  language={selectedSubmission.language?.toLowerCase()}
                  value={getSourceCodeString(selectedSubmission.sourceCode)}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "Fira Code, Courier New, monospace",
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    wordWrap: "on",
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-base-300 bg-base-300/40 flex justify-end">
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-sm px-6 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;

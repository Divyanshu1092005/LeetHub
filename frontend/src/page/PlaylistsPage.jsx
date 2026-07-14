import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { Loader, FolderHeart, Plus, Trash2, ChevronDown, ChevronUp, BookOpen, Link2 } from "lucide-react";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import { Link } from "react-router-dom";

const PlaylistsPage = () => {
  const { 
    playlists, 
    isLoading, 
    getAllPlaylists, 
    createPlaylist, 
    deletePlaylist, 
    removeProblemFromPlaylist 
  } = usePlaylistStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleDeletePlaylist = async (e, id) => {
    e.stopPropagation(); // prevent expanding the card when clicking delete
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      await deletePlaylist(id);
      if (expandedPlaylistId === id) {
        setExpandedPlaylistId(null);
      }
    }
  };

  const handleRemoveProblem = async (e, playlistId, problemId) => {
    e.stopPropagation();
    if (window.confirm("Remove this problem from this playlist?")) {
      await removeProblemFromPlaylist(playlistId, [problemId]);
      // Refetch playlists to update local state problem counts and problem lists
      await getAllPlaylists();
    }
  };

  const toggleExpand = (id) => {
    setExpandedPlaylistId(expandedPlaylistId === id ? null : id);
  };

  if (isLoading && playlists.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-14 px-4 pb-20 relative">
      {/* Background blurs */}
      <div className="absolute top-16 left-0 w-80 h-80 bg-indigo-600/10 opacity-30 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-800/80 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FolderHeart className="size-8 text-indigo-400" />
            My Playlists
          </h2>
          <p className="text-gray-400 text-sm mt-1">Organize and manage lists of coding problems for study focus.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn bg-indigo-600 hover:bg-indigo-500 border-none gap-2 rounded-xl text-white font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-indigo-600/10"
        >
          <Plus className="size-4" />
          Create Playlist
        </button>
      </div>

      {/* Playlists Grid */}
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {playlists.map((playlist) => {
            const problemRelations = playlist.problems || [];
            const problemCount = problemRelations.length;
            const isExpanded = expandedPlaylistId === playlist.id;

            return (
              <div 
                key={playlist.id} 
                className={`card bg-gray-800/80 border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-all duration-200 h-fit hover:scale-[1.01] ${
                  isExpanded ? "md:col-span-2 lg:col-span-3 border-indigo-500/40 ring-1 ring-indigo-500/20" : "hover:border-gray-600/50"
                }`}
              >
                {/* Playlist Summary Card Body */}
                <div 
                  onClick={() => toggleExpand(playlist.id)}
                  className="p-6 cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors pr-2">
                        {playlist.name}
                      </h3>
                      <span className="badge badge-sm bg-gray-700 text-gray-300 border-gray-600 shrink-0 font-semibold px-2 py-2 text-[10px]">
                        {problemCount} {problemCount === 1 ? "problem" : "problems"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-medium line-clamp-3 mb-6">
                      {playlist.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-700/30 pt-4 mt-2">
                    <button
                      className="text-xs font-bold text-gray-400 flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="size-4 text-indigo-400" />
                          Hide Problems
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-4 text-indigo-400" />
                          View Problems
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleDeletePlaylist(e, playlist.id)}
                      className="btn btn-ghost btn-xs text-rose-400 hover:bg-rose-500/10 rounded-md p-1 transition-colors duration-150"
                      title="Delete Playlist"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Playlist Detail (List of problems) */}
                {isExpanded && (
                  <div className="bg-gray-900/40 border-t border-gray-700/50 p-6 animate-in fade-in duration-300">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <BookOpen className="size-4 text-indigo-400" />
                      Problems List ({problemCount})
                    </h4>
                    
                    {problemCount > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-gray-700/30">
                        <table className="table table-md w-full bg-gray-900/20 text-gray-200">
                          <thead>
                            <tr className="bg-gray-900 text-gray-400 border-b border-gray-700/50">
                              <th>Title</th>
                              <th>Difficulty</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {problemRelations.map(({ problem }) => {
                              if (!problem) return null;
                              return (
                                <tr key={problem.id} className="hover:bg-gray-800/40 border-b border-gray-800/80 transition-colors duration-150">
                                  <td className="font-semibold text-white">
                                    <Link 
                                      to={`/problem/${problem.id}`}
                                      className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                                    >
                                      <Link2 className="size-3.5" />
                                      {problem.title}
                                    </Link>
                                  </td>
                                  <td>
                                    <span 
                                      className={`badge badge-sm font-bold border ${
                                        problem.difficulty === "EASY"
                                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-500/20"
                                          : problem.difficulty === "MEDIUM"
                                          ? "text-amber-400 bg-amber-400/10 border-amber-500/20"
                                          : "text-rose-400 bg-rose-400/10 border-rose-500/20"
                                      }`}
                                    >
                                      {problem.difficulty}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      onClick={(e) => handleRemoveProblem(e, playlist.id, problem.id)}
                                      className="btn btn-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all duration-200 rounded-lg font-bold px-3 py-1.5 h-auto min-h-0"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-neutral-500 mb-2">No problems in this playlist yet.</p>
                        <Link to="/problems" className="text-xs text-primary font-bold hover:underline">
                          Go solve problems to add them to this playlist!
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-200 border border-dashed border-base-300 rounded-2xl relative z-10">
          <FolderHeart className="size-12 mx-auto text-neutral-500 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-white mb-2">No Playlists Yet</h3>
          <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-6">
            Create your first custom collection to organize coding problems for future practice.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary font-bold text-white rounded-xl"
          >
            Create First Playlist
          </button>
        </div>
      )}

      {/* Playlist Creation Modal */}
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default PlaylistsPage;

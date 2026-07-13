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
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary/10 opacity-30 blur-3xl rounded-md pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-base-300 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FolderHeart className="size-8 text-primary" />
            My Playlists
          </h2>
          <p className="text-neutral-400 text-sm mt-1">Organize and manage lists of coding problems for study focus.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary gap-2 rounded-xl text-white font-bold cursor-pointer"
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
                className={`card bg-base-200 border border-base-300 shadow-xl rounded-2xl overflow-hidden transition-all duration-200 h-fit ${
                  isExpanded ? "md:col-span-2 lg:col-span-3 border-primary/40 ring-1 ring-primary/20" : "hover:border-neutral-700"
                }`}
              >
                {/* Playlist Summary Card Body */}
                <div 
                  onClick={() => toggleExpand(playlist.id)}
                  className="p-6 cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors pr-2">
                        {playlist.name}
                      </h3>
                      <span className="badge badge-sm badge-outline shrink-0 font-semibold px-2 py-2 text-[10px]">
                        {problemCount} {problemCount === 1 ? "problem" : "problems"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 font-medium line-clamp-3 mb-6">
                      {playlist.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-neutral-800/40 pt-4 mt-2">
                    <button
                      className="text-xs font-bold text-neutral-400 flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="size-4 text-primary" />
                          Hide Problems
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-4 text-primary" />
                          View Problems
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleDeletePlaylist(e, playlist.id)}
                      className="btn btn-ghost btn-xs text-error hover:bg-error/10 rounded-md p-1"
                      title="Delete Playlist"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Playlist Detail (List of problems) */}
                {isExpanded && (
                  <div className="bg-base-300/30 border-t border-base-300 p-6 animate-in fade-in duration-300">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <BookOpen className="size-4 text-primary" />
                      Problems List ({problemCount})
                    </h4>
                    
                    {problemCount > 0 ? (
                      <div className="overflow-x-auto rounded-xl">
                        <table className="table table-zebra table-md w-full bg-base-300/50">
                          <thead>
                            <tr className="bg-base-300">
                              <th>Title</th>
                              <th>Difficulty</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {problemRelations.map(({ problem }) => {
                              if (!problem) return null;
                              return (
                                <tr key={problem.id} className="hover:bg-base-300/80 transition-colors">
                                  <td className="font-semibold text-white">
                                    <Link 
                                      to={`/problem/${problem.id}`}
                                      className="flex items-center gap-2 hover:text-primary hover:underline"
                                    >
                                      <Link2 className="size-3.5" />
                                      {problem.title}
                                    </Link>
                                  </td>
                                  <td>
                                    <span 
                                      className={`badge badge-sm font-bold text-white ${
                                        problem.difficulty === "EASY"
                                          ? "badge-success"
                                          : problem.difficulty === "MEDIUM"
                                          ? "badge-warning"
                                          : "badge-error"
                                      }`}
                                    >
                                      {problem.difficulty}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      onClick={(e) => handleRemoveProblem(e, playlist.id, problem.id)}
                                      className="btn btn-xs btn-error btn-outline font-bold rounded-md"
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

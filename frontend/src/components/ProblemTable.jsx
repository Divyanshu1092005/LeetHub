import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from "lucide-react";
import { useActions } from "../store/useAction";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { usePlaylistStore } from "../store/usePlaylistStore";


const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      {/* Header with Create Playlist Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-white">Problems</h2>
        <button
          className="btn bg-indigo-600 hover:bg-indigo-500 text-white font-bold border-none gap-2 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-indigo-600/10"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-1/3 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 rounded-xl"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 rounded-xl"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-700/50 shadow-2xl bg-gray-850">
        <table className="table table-lg text-gray-200 w-full">
          <thead className="bg-gray-900/60 text-gray-400 border-b border-gray-700/50">
            <tr>
              <th className="font-semibold text-sm">Solved</th>
              <th className="font-semibold text-sm">Title</th>
              <th className="font-semibold text-sm">Tags</th>
              <th className="font-semibold text-sm">Difficulty</th>
              <th className="font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/20">
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <tr key={problem.id} className="border-b border-gray-800/80 hover:bg-gray-800/40 transition-colors duration-150">
                    <td>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm checkbox-primary border-gray-600 focus:ring-offset-0 focus:ring-0"
                      />
                    </td>
                    <td>
                      <Link to={`/problem/${problem.id}`} className="font-semibold text-white hover:text-indigo-400 transition-colors duration-150">
                        {problem.title}
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-800 text-gray-400 border border-gray-700/50 text-xs px-2.5 py-1 rounded-lg font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge font-bold text-xs px-2.5 py-1.5 rounded-lg border ${
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
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="btn btn-sm bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-505 hover:bg-rose-600 hover:text-white transition-all duration-200 rounded-lg"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                            <Link 
                              to={`/admin/edit-problem/${problem.id}`} 
                              className="btn btn-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-600 hover:text-white transition-all duration-200 rounded-lg"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                        <button
                          className="btn btn-sm btn-outline border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 rounded-lg flex gap-2 items-center"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">Save to Playlist</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
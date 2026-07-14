import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });

      const res = await axiosInstance.get("/problems/get-all-problems");

      set({ problems: res.data.problems });
    } catch (error) {
      console.log("Error getting all problems", error);
      toast.error("Error in getting problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });

      const res = await axiosInstance.get(`/problems/get-problem/${id}`);

      set({ problem: res.data.problem });
    } catch (error) {
      console.log("Error getting all problems", error);
      toast.error("Error in getting problems");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems"); // note: in controller it is get-solved-problems

      set({ solvedProblems: res.data.problems });
    } catch (error) {
      console.log("Error getting solved problems", error);
      toast.error("Error getting solved problems");
    }
  },

  isUpdatingProblem: false,

  fetchProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      return res.data.problem;
    } catch (error) {
      console.log("Error fetching problem by id", error);
      toast.error("Error in fetching problem details");
      throw error;
    } finally {
      set({ isProblemLoading: false });
    }
  },

  updateProblem: async (id, problemData) => {
    try {
      set({ isUpdatingProblem: true });
      const res = await axiosInstance.put(`/problems/update-problem/${id}`, problemData);
      toast.success(res.data.message || "Problem updated successfully⚡");
      return res.data.problem;
    } catch (error) {
      console.log("Error updating problem", error);
      toast.error(error.response?.data?.error || "Error in updating problem");
      throw error;
    } finally {
      set({ isUpdatingProblem: false });
    }
  }
}));

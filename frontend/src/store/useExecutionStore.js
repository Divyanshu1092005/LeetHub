import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const useExecutionStore = create((set)=>({
    isExecuting: false,
    isRunning: false,
    isSubmitting: false,
    submission: null,
    runResults: null,
    activeOutputView: null, // "run" | "submit" | null

    runCode: async (source_code, language_id, problemId) => {
        try {
            set({ isRunning: true, runResults: null, activeOutputView: "run" });
            const res = await axiosInstance.post("/code/run", { source_code, language_id, problemId });
            
            set({ runResults: res.data });
            toast.success(res.data.message || "Code run completed!");
            return res.data;
        } catch (error) {
            console.log("Error running code", error);
            toast.error(error.response?.data?.error || "Error running code");
            return null;
        } finally {
            set({ isRunning: false });
        }
    },

    submitCode: async (source_code, language_id, problemId) => {
        try {
            set({ isSubmitting: true, submission: null, activeOutputView: "submit" });
            const res = await axiosInstance.post("/code/submit", { source_code, language_id, problemId });

            set({ submission: res.data.submission });
            toast.success(res.data.message || "Code submitted successfully!");
            return res.data.submission;
        } catch (error) {
            console.log("Error submitting code", error);
            toast.error(error.response?.data?.error || "Error submitting code");
            return null;
        } finally {
            set({ isSubmitting: false });
        }
    }
}));
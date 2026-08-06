import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const useExecutionStore = create((set)=>({
    isExecuting: false,
    isRunning: false,
    isSubmitting: false,
    submission: null,

    runCode: async (source_code, language_id, problemId) => {
        try {
            set({ isRunning: true, submission: null });
            const res = await axiosInstance.post("/code/run", { source_code, language_id, problemId });
            
            const runResults = res.data.results || [];
            const allPassed = res.data.allPassed;
            
            const pseudoSubmission = {
                status: allPassed ? "Accepted" : "Wrong Answer",
                memory: JSON.stringify(runResults.map(r => r.memory || "0 KB")),
                time: JSON.stringify(runResults.map(r => r.time || "0 s")),
                testCases: runResults.map((r, i) => ({
                    id: i,
                    passed: r.passed,
                    expected: r.expected,
                    stdout: r.stdout,
                    memory: r.memory,
                    time: r.time
                }))
            };

            set({ submission: pseudoSubmission });
            toast.success(res.data.message || "Code run completed!");
        } catch (error) {
            console.log("Error running code", error);
            toast.error(error.response?.data?.error || "Error running code");
        } finally {
            set({ isRunning: false });
        }
    },

    submitCode: async (source_code, language_id, problemId) => {
        try {
            set({ isSubmitting: true, submission: null });
            const res = await axiosInstance.post("/code/submit", { source_code, language_id, problemId });

            set({ submission: res.data.submission });
            toast.success(res.data.message || "Code submitted successfully!");
        } catch (error) {
            console.log("Error submitting code", error);
            toast.error(error.response?.data?.error || "Error submitting code");
        } finally {
            set({ isSubmitting: false });
        }
    }
}));
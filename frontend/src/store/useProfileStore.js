import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProfileStore = create((set) => ({
  profileData: null,
  isLoading: false,
  error: null,

  fetchProfileData: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/profile");
      if (res.data.success) {
        set({ profileData: res.data.profile });
      } else {
        set({ error: "Failed to load profile data" });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      const errMsg = error.response?.data?.error || "Error loading profile data";
      set({ error: errMsg });
      toast.error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },
}));

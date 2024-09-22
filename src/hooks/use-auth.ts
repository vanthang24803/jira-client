import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

import { toast } from "sonner";
import _http from "@/libs/http";
import type { LoginFormSchema } from "@/components/LoginForm";

import { Profile } from "@/types";

type Store = {
  profile: Profile | null;
  isLogin: boolean;
  login: (data: LoginFormSchema) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: () => void;
};

const useAuth = create(
  persist<Store>(
    (set, _) => ({
      profile: null,
      isLogin: false,
      notifications: null,
      login: async (data: LoginFormSchema) => {
        try {
          const response = await _http.post(`/auth/login`, data);

          if (response.status == 200) {
            toast.success("Login successfully!");
            set({
              isLogin: true,
            });

            Cookies.set("ac_token", response.data.result.ac_token);
            Cookies.set("rf_token", response.data.result.rf_token);
          }
        } catch (error: any) {
          console.error("Login failed:", error);
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.error);
          }
          if (error.response && error.response.status === 403) {
            toast.error(error.response.data.error);
          }
          throw error;
        }
      },

      getProfile: async () => {
        try {
          const response = await _http.get(`/me`);

          if (response.status === 200) {
            set({
              profile: response.data.result,
            });
          }
        } catch (error: any) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            set({
              isLogin: false,
            });
          }
        }
      },

      logout: async () => {
        try {
          const response = await _http.post("/auth/logout", {
            token: Cookies.get("ac_token"),
          });
          if (response.status === 200) {
            set({ profile: null, isLogin: false });
            Cookies.set("ac_token", "");
            Cookies.set("rf_token", "");

            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      },

      verifyEmail: () => {
        set({
          isLogin: true,
        });
      },
    }),
    {
      name: "jira-authentication",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;

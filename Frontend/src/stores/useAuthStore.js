import React from 'react'
import { create } from "zustand"
import { useNavigate } from 'react-router';
import axios from 'axios';
const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  loading: true,

  initAuth: async () => {
    try {
      const isToken = window.localStorage.getItem("accessToken");
      if (!isToken) {
        set({ accessToken: null, loading: false })
        return null
      }
      const response = await axios.post("http://localhost:3002/api/v1/users/referesh", null, {
        withCredentials: true
      });

      if (response?.data?.data?.accessToken) {
        window.localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        set({
          accessToken: response?.data?.data?.accessToken,
          user: response?.data?.data?.isUser?.id
        })
        return response?.data?.data?.accessToken;
      } else {

        localStorage.removeItem("accessToken");
        set({ accessToken: null, user: null });
        return null;
      }
    } catch (error) {
      console.error("Auth init failed:", error);
      localStorage.removeItem("accessToken");
      set({ accessToken: null, user: null });
      return null;
    } finally {
      set({ loading: false })
    }
  }
}))

export default useAuthStore

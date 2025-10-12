import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      getAccessToken: () => get().accessToken,
      logout: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: 'access-token-storage', // localStorage key
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);

export const setAccessToken = (token: string) => useAuthStore.getState().setAccessToken(token);
export const getAccessToken = () => useAuthStore.getState().getAccessToken();
export const logout = () => useAuthStore.getState().logout();

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    name: string;
    memberId: number | null;
    setAuth: (data: {accessToken: string; name: string; memberId: number}) => void;
    getAuth: () => {accessToken: string | null; name: string; memberId: number | null};
    getAccessToken: () => string | null;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            name: '',
            memberId: null,
            setAuth: (data) => set({accessToken: data.accessToken, name: data.name, memberId: data.memberId}),
            getAuth: () => {
                return {accessToken: get().accessToken, name: get().name, memberId: get().memberId};
            },
            getAccessToken: () => {
                return get().accessToken;
            },
            logout: () => {
                set({accessToken: null, name: '', memberId: null});
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({accessToken: state.accessToken, name: state.name, memberId: state.memberId}),
        }
    )
);

export const setAuth = (data: {accessToken: string; name: string; memberId: number}) => useAuthStore.getState().setAuth(data);
export const getAuth = () => useAuthStore.getState().getAuth();
export const getAccessToken = () => useAuthStore.getState().getAccessToken();
export const logout = () => useAuthStore.getState().logout();

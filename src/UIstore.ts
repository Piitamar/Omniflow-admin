import { create } from "zustand";

export interface LoginUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
}

interface UIStore {
    loginUser: LoginUser | null;
    setLoginUser: (user: LoginUser) => void;
    clearLoginUser: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    loginUser: null,

    setLoginUser: (user) => {
        set({ loginUser: user });
    },

    clearLoginUser: () => {
        set({ loginUser: null });
    },
}));

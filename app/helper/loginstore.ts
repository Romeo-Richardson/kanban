import { create } from "zustand";
import axios from "axios";
import { redirect } from "next/navigation";

interface loginStore {
  isVerified: boolean;
  username: string | null;
  email: string | null;
  password: string | null;
  connectionName: string | null;
  loginEmail: string | null;
  loginPassword: string | null;
  setIsVerified: (data: boolean) => void;
  setUsername: (data: string) => void;
  setLoginEmail: (data: string) => void;
  setLoginPassword: (data: string) => void;
  setEmail: (data: string) => void;
  setPassword: (data: string) => void;
  createUser: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
}

export const useLoginStore = create<loginStore>((set, get) => ({
  isVerified: false,
  username: null,
  email: null,
  password: null,
  loginEmail: null,
  loginPassword: null,
  connectionName: null,
  setIsVerified: (data: boolean) => set({ isVerified: data }),
  setUsername: (data: string) => set({ username: data }),
  setEmail: (data: string) => set({ email: data }),
  setPassword: (data: string) => set({ password: data }),
  setLoginEmail: (data: string) => {
    set({ loginEmail: data });
  },
  setLoginPassword: (data: string) => {
    set({ loginPassword: data });
  },
  createUser: async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:3000/api/createuser", {
        username: get().username,
        email: get().email,
        password: get().password,
      });
      console.log(user);
      console.log(user.data.newUser.verificationid);
      set({ connectionName: user.data.newUser.verificationid });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  login: async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/login", {
        email: get().loginEmail,
        password: get().loginPassword,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}));

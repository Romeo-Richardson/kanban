import { create } from "zustand";
import axios from "axios";

interface loginStore {
  isVerified: boolean;
  setIsVerified: (data: boolean) => void;
  username: string | null;
  setUsername: (data: string) => void;
  email: string | null;
  setEmail: (data: string) => void;
  password: string | null;
  setPassword: (data: string) => void;
  loginEmail: string | null;
  setLoginEmail: (data: string) => void;
  loginPassword: string | null;
  setLoginPassword: (data: string) => void;

  connectionName: string | null;

  createUser: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
}

export const useLoginStore = create<loginStore>((set, get) => ({
  isVerified: false,
  setIsVerified: (data: boolean) => set({ isVerified: data }),
  username: null,
  setUsername: (data: string) => set({ username: data }),
  email: null,
  setEmail: (data: string) => set({ email: data }),
  password: null,
  setPassword: (data: string) => set({ password: data }),
  loginEmail: null,
  setLoginEmail: (data: string) => {
    set({ loginEmail: data });
  },
  loginPassword: null,
  setLoginPassword: (data: string) => {
    set({ loginPassword: data });
  },
  connectionName: null,

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
      const { data } = await axios.post("/api/login", {
        email: get().loginEmail,
        password: get().loginPassword,
      });
      set({ isVerified: true });
      set({ connectionName: data.id });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}));

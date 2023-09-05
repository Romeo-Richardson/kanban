import { create } from "zustand";
import axios from "axios";

interface loginStore {
  isVerified: boolean;
  setIsVerified: (data: boolean) => void;

  connectionName: string | null;

  createUser: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<unknown>;
}

export const useLoginStore = create<loginStore>((set, get) => ({
  isVerified: false,
  setIsVerified: (data: boolean) => set({ isVerified: data }),
  username: null,

  connectionName: null,

  createUser: async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const user = await axios.post("http://localhost:3000/api/createuser", {
        username: form.get("Username"),
        email: form.get("Email"),
        password: form.get("Password"),
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
    const form = new FormData(e.currentTarget);
    try {
      const { data } = await axios.post("/api/login", {
        email: form.get("Email"),
        password: form.get("Password"),
      });
      set({ isVerified: true });
      set({ connectionName: data.id });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}));

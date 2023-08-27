"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const QueryWrapper = ({ children }: Props) => (
  <>
    <Toaster position="top-center"></Toaster>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </>
);

import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

type props = {
  children: React.ReactNode;
};

const Modal = ({ children }: props): React.ReactNode => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      console.log("Unmounted");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    };
  }, []);
  return (
    <div className="min-h-screen w-screen absolute top-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;

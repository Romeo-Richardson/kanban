import React from "react";

type props = {
  children: React.ReactNode;
};

const Modal = ({ children }: props): React.ReactNode => {
  return (
    <div className="min-h-screen w-screen absolute top-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;

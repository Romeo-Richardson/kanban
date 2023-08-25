import React from "react";

interface props {
  children: React.ReactNode;
  name: string;
}

const Pillar = ({ children }: props): React.ReactNode => {
  return (
    <div className="h-[90%] w-72 bg-slate-700 flex flex-col gap-4 rounded-md mx-6 opacity-25">
      {children}
    </div>
  );
};

export default Pillar;

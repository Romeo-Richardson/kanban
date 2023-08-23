import React from "react";

type containerType = {
  children: React.ReactNode;
  name: string;
};

const PillarTitle = ({ children, name }: containerType): React.ReactNode => {
  return (
    <div className="h-[90%] w-72 flex flex-col items-center gap-4">
      <p className="text-white">{`${name}`}</p>
      {children}
    </div>
  );
};

export default PillarTitle;

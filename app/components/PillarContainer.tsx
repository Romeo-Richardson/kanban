import React from "react";

type containerProps = {
  children: React.ReactNode;
};

const PillarContainer = (props: containerProps): React.ReactNode => {
  return (
    <div className="flex-grow min-w-full relative flex items-center overflow-auto justify-around">
      <div className="absolute h-full top-0 left-0 flex">{props.children}</div>
    </div>
  );
};

export default PillarContainer;

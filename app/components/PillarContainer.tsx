import React from "react";

type containerProps = {
  children: React.ReactNode;
};

const PillarContainer = (props: containerProps): React.ReactNode => {
  return (
    <div className="flex-grow min-w-full flex items-center justify-around">
      {props.children}
    </div>
  );
};

export default PillarContainer;

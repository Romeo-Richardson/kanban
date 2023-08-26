import React from "react";
import { useKanbanstore } from "../helper/kanbanstore";

type containerProps = {
  children: React.ReactNode;
};

const PillarContainer = (props: containerProps): React.ReactNode => {
  const { selectedBoard } = useKanbanstore();

  return (
    <div className="flex-grow min-w-full relative flex items-center justify-center overflow-auto">
      {selectedBoard ? (
        <>
          <div className="absolute h-full top-0 left-0 flex">
            {props.children}
          </div>
        </>
      ) : (
        <p className=" text-slate-700 opacity-50  text-4xl">
          Select or Create a Board
        </p>
      )}
    </div>
  );
};

export default PillarContainer;

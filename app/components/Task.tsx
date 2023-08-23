import React, { useEffect } from "react";

const Task = (): React.ReactNode => {
  useEffect(() => {
    console.log("Task Mounted");
  }, []);
  return (
    <div className=" w-full h-[10%] bg-slate-900 border-gray-300 border-[1px] rounded-md p-4 text-white">
      <p>This is a New Task</p>
    </div>
  );
};

export default Task;

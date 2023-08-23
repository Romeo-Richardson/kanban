import React, { useEffect } from "react";
import { task } from "@prisma/client";

interface props {
  task: task;
}

const Task = ({ task }: props): React.ReactNode => {
  return (
    <div className=" w-full h-[10%] bg-slate-900 border-gray-300 border-[1px] rounded-md p-4 text-white">
      <p>This is a New Task</p>
    </div>
  );
};

export default Task;

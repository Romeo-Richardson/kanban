import React, { useEffect } from "react";
import { task } from "@prisma/client";

interface props {
  task: task;
}

const Task = ({ task }: props): React.ReactNode => {
  const captureId = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("Task", task.id);
    console.log(task.id);
  };

  return (
    <div
      draggable
      className=" w-full bg-slate-900 border-gray-300 border-[1px] rounded-md p-4 text-white"
      onDragStart={(e) => {
        captureId(e);
      }}
    >
      <p>{task.task}</p>
    </div>
  );
};

export default Task;

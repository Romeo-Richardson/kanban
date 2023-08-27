import React, { useEffect } from "react";
import { task } from "@prisma/client";
import Image from "next/image";
import close from "../assets/close.png";
import details from "../assets/expand-arrows.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useKanbanstore } from "../helper/kanbanstore";

interface props {
  task: task;
}

const Task = ({ task }: props): React.ReactNode => {
  const { refetch } = useQuery(["user"]);
  const { setEditTaskModal, setSelectedTask } = useKanbanstore();

  const captureId = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("Task", task.id);
    console.log(task.id);
  };

  const deleteTask = async () => {
    try {
      await axios.post("/api/deletetask", {
        id: task.id,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    console.log(task);
  }, []);

  return (
    <div
      draggable
      className=" w-full relative hover:cursor-grab bg-slate-900 border-gray-300 border-[1px] rounded-md p-4 text-white"
      onDragStart={(e) => {
        captureId(e);
      }}
    >
      <Image
        height={12}
        width={12}
        alt="close"
        src={details}
        className=" hover:cursor-pointer text-slate-300 absolute top-[5px] right-6"
        onClick={() => {
          setSelectedTask(task);
          setEditTaskModal(true);
        }}
      ></Image>
      <Image
        height={10}
        width={10}
        alt="close"
        src={close}
        className=" hover:cursor-pointer text-slate-300 absolute top-[6px] right-2"
        onClick={async () => {
          await toast.promise(deleteTask(), {
            loading: "Deleting Task",
            success: "Task Deleted",
            error: "Failed to delete task",
          });
          refetch();
        }}
      ></Image>
      <p>{task.name}</p>
    </div>
  );
};

export default Task;

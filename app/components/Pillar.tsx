import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useKanbanstore } from "../helper/kanbanstore";
import { board, task } from "@prisma/client";
import toast from "react-hot-toast";

interface props {
  children: React.ReactNode;
  name: string;
}

const Pillar = ({ children, name }: props): React.ReactNode => {
  const { selectedBoard } = useKanbanstore();

  const queryClient = useQueryClient();

  const updateTask = async (taskId: string) => {
    await axios.post("/api/updatetask", {
      id: taskId,
      status: name,
    });
    await queryClient.cancelQueries(["user"]);
    const prevData: any = await queryClient.getQueryData(["user"]);
    const findBoard = prevData.boards.filter((board: board) => {
      return board.id === selectedBoard;
    })[0];
    const boardIndex = prevData.boards.indexOf(findBoard);
    const findTask: task = findBoard.tasks.filter((task: task) => {
      return task.id === taskId;
    })[0];
    const taskIndex = prevData.boards[boardIndex].tasks.indexOf(findTask);
    prevData.boards[boardIndex].tasks[taskIndex] = taskId;
    queryClient.setQueryData(["user"], { ...prevData });
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <div
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        const data = e.dataTransfer.getData("Task");
        toast.promise(updateTask(data), {
          loading: "Updating",
          success: "Updated",
          error: "Updated Failed",
        });
      }}
      className="h-[90%] w-72 bg-slate-700 flex flex-col gap-4 rounded-md mx-6 opacity-25"
    >
      {children}
    </div>
  );
};

export default Pillar;

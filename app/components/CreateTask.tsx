import React, { useRef, useState } from "react";
import { useKanbanstore } from "../helper/kanbanstore";
import { useClickOutside } from "@react-hookz/web";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { board } from "@prisma/client";

interface props {
  user: {
    name: string;
    email: string;
    verificationId: string;
    id: string;
    boards: board[];
  };
  show: boolean;
}

const CreateTask = ({ user, show }: props): React.ReactNode => {
  const [taskInput, setTaskInput] = useState<string | null>(null);
  const [taskNameInput, setTaskNameInput] = useState<string | null>(null);
  const { setTaskModal, selectedBoard } = useKanbanstore();
  const createTaskRef = useRef(null);
  useClickOutside(createTaskRef, () => {
    setTaskModal(false);
  });

  const { refetch } = useQuery(["user"]);

  const queryClient = useQueryClient();

  const createTask = async () => {
    try {
      await axios.post("/api/createtask", {
        name: taskNameInput,
        task: taskInput,
        board: selectedBoard,
      });
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const prev: any = queryClient.getQueryData(["user"]);
      const findBoard = prev.boards.filter((board: board) => {
        return board.id === selectedBoard;
      })[0];
      const boardIndex = prev.boards.indexOf(findBoard);
      prev.boards[boardIndex].tasks.push({
        name: taskNameInput,
        task: taskInput,
      });
      queryClient.setQueryData(["user"], prev);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      {show ? (
        <Modal>
          <form
            className="p-4 w-[450px] flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={createTaskRef}
            onSubmit={async (e) => {
              e.preventDefault();
              setTaskModal(false);
              await toast.promise(createTask(), {
                loading: "Creating Task",
                success: "Task Created",
                error: "Unable to create task",
              });
              refetch();
            }}
          >
            <p className="text-white">Create New Task</p>
            <input
              type="text"
              placeholder="Task Name"
              className="text-black w-full px-2"
              onChange={(e) => {
                setTaskNameInput(e.target.value);
              }}
            />
            <textarea
              name="Task"
              id="createTask"
              placeholder="Task Details"
              className="text-black w-full p-2"
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
              cols={30}
              rows={10}
            ></textarea>
            <button
              className="text-green-900 w-full p-2 bg-green-300 rounded hover:bg-green-400 active:bg-green-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default CreateTask;

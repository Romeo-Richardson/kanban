import React, { useRef, useState } from "react";
import { useKanbanstore } from "../helper/kanbanstore";
import { useClickOutside } from "@react-hookz/web";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface board {
  name: string;
}

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
  const [board, setBoard] = useState<string | null>(null);
  const { setTaskModal, selectedBoard } = useKanbanstore();
  const createTaskRef = useRef(null);
  useClickOutside(createTaskRef, () => {
    setTaskModal(false);
  });

  const { refetch } = useQuery(["user"]);

  const createTask = async () => {
    try {
      await axios.post("/api/createtask", {
        name: taskNameInput,
        task: taskInput,
        board: selectedBoard,
      });
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
            onSubmit={async () => {
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
            <select
              defaultValue={"Select Board"}
              onChange={(e) => {
                setBoard(e.target.value);
              }}
              className="text-white w-full hover:cursor-pointer bg-slate-900 border-gray-800 rounded-sm border-[1px]"
            >
              {user.boards.map((item, key) => {
                return (
                  <option className=" text-left bg-slate-900" key={key}>
                    {item.name}
                  </option>
                );
              })}
            </select>
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

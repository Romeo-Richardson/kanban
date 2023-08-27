import { useClickOutside } from "@react-hookz/web";
import React, { useEffect, useRef, useState } from "react";
import { useKanbanstore } from "../helper/kanbanstore";
import Modal from "./Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface props {
  show: boolean;
}

const EditTask = ({ show }: props) => {
  const { setEditTaskModal, selectedTask } = useKanbanstore();
  const [taskNameInput, setTaskNameInput] = useState<string | undefined>(
    undefined
  );
  const [taskInput, setTaskInput] = useState<string | undefined>(undefined);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const { refetch } = useQuery(["user"]);

  const editTaskRef = useRef(null);
  useClickOutside(editTaskRef, () => {
    setIsEditable(true);
    setEditTaskModal(false);
  });

  const editTask = async () => {
    await axios.post("/api/edittask", {
      id: selectedTask?.id,
      name: taskNameInput,
      task: taskInput,
    });
  };

  useEffect(() => {
    setTaskInput(selectedTask?.task);
    setTaskNameInput(selectedTask?.name);
  }, [selectedTask]);

  return (
    <>
      {show ? (
        <Modal>
          <form
            className="p-4 w-[450px] flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={editTaskRef}
            onSubmit={async (e) => {
              e.preventDefault();
              await toast.promise(editTask(), {
                loading: "Update Task",
                success: "Task Updated",
                error: "Update Failed",
              });
              setEditTaskModal(false);
              refetch();
            }}
          >
            <input
              type="text"
              placeholder="Task Name"
              disabled={isEditable}
              className="text-slate-300 w-full px-2 bg-slate-900"
              onChange={(e) => {
                setTaskNameInput(e.target.value);
              }}
              defaultValue={taskNameInput || ""}
            />
            <textarea
              name="Task"
              id="createTask"
              disabled={isEditable}
              placeholder="Task Details"
              className={`text-slate-300 w-full p-2 bg-slate-900`}
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
              defaultValue={taskInput || ""}
              cols={30}
              rows={10}
            ></textarea>
            <button
              className={`text-slate-700 ${isEditable ? null : "opacity-25"} ${
                isEditable ? "bg-slate-300" : "bg-slate-400"
              } w-full p-2 rounded hover:bg-slate-400 duration-300`}
              disabled={!isEditable}
              onClick={(e) => {
                e.preventDefault();
                setIsEditable(false);
              }}
            >
              Edit
            </button>
            <button
              className="text-green-900 duration-300 w-full p-2 bg-green-300 rounded hover:bg-green-400 active:bg-green-600"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default EditTask;

import React, { FC, useRef, useState } from "react";
import { useKanbanstore } from "../helper/kanbanstore";
import { useClickOutside } from "@react-hookz/web";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";

interface props {
  user: {
    name: string;
    email: string;
    verificationId: string;
    id: string;
  };
  show: boolean;
}

const CreateBoard = ({ user, show }: props): React.ReactNode => {
  const [boardInput, setBoardInput] = useState<string | null>(null);
  const { setBoardModal } = useKanbanstore();
  const createBoardRef = useRef(null);
  useClickOutside(createBoardRef, () => {
    setBoardModal(false);
  });

  const createBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios.post("/api/createboard", {
        name: boardInput,
        id: user.id,
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
            className="w-[450px]  p-4 flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={createBoardRef}
            onSubmit={async (e) => {
              await toast.promise(createBoard(e), {
                loading: "Creating Board",
                success: "Board Created",
                error: "Failed to create board",
              });
              setBoardModal(false);
            }}
          >
            <label htmlFor="createTask">Create Board</label>
            <input
              name="Task"
              id="createTask"
              className="text-black"
              placeholder="Board Name"
              onChange={(e) => {
                setBoardInput(e.target.value);
              }}
            ></input>
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

export default CreateBoard;

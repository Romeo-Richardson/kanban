import React, { FC, useRef, useState } from "react";
import { useKanbanstore } from "../helper/kanbanstore";
import { useClickOutside } from "@react-hookz/web";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { user } from "@prisma/client";

interface props {
  user: user;
  show: boolean;
}

const CreateBoard = ({ user, show }: props): React.ReactNode => {
  const [boardInput, setBoardInput] = useState<string>("");
  const { setBoardModal } = useKanbanstore();
  const createBoardRef = useRef(null);
  useClickOutside(createBoardRef, () => {
    setBoardModal(false);
  });

  const queryClient = useQueryClient();

  const createBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await axios.post("/api/createboard", {
        name: boardInput,
        id: user.id,
      });
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const prev: any = queryClient.getQueryData(["user"]);
      prev.boards.push({ name: boardInput });
      queryClient.setQueryData(["user"], prev);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setBoardModal(false);
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
              e.preventDefault();
              await toast.promise(createBoard(e), {
                loading: "Creating Board",
                success: "Board Created",
                error: "Failed to create board",
              });
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

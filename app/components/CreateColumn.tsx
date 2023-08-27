import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { useClickOutside } from "@react-hookz/web";
import { useKanbanstore } from "../helper/kanbanstore";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { board } from "@prisma/client";

interface props {
  show: boolean;
  columns: string[];
}

const CreateColumn = ({ show, columns }: props): React.ReactNode => {
  const { setColumnModal, selectedBoard } = useKanbanstore();
  const [columnInput, setColumnInput] = useState<string>("");

  const { refetch } = useQuery(["user"]);

  const createColumnRef = useRef(null);

  const queryClient = useQueryClient();

  useClickOutside(createColumnRef, () => {
    setColumnModal(false);
  });

  const newColumn = async () => {
    try {
      await axios.post("/api/createcolumn", {
        name: columnInput,
        id: selectedBoard,
      });
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const current: any = queryClient.getQueryData(["user"]);
      const prev = { ...current };
      const findBoard = prev.boards.filter((board: board) => {
        return board.id === selectedBoard;
      })[0];
      const boardIndex = prev.boards.indexOf(findBoard);
      prev.boards[boardIndex].columns.push(columnInput);
      console.log(prev);
      queryClient.setQueryData(["user"], prev);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setColumnModal(false);
    }
  };

  return (
    <>
      {show ? (
        <Modal>
          <form
            className="p-4 w-[275px] flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={createColumnRef}
            onSubmit={async (e) => {
              e.preventDefault();
              const checkColumns = columns.includes(columnInput);
              if (!selectedBoard) {
                toast.error("Please select a board");
              } else if (checkColumns) {
                toast.error("Duplicate Column");
              } else {
                await toast.promise(newColumn(), {
                  loading: "Creating Column",
                  success: "Column Created",
                  error: "Failed to create column",
                });
                refetch();
              }
            }}
          >
            <input
              name="Task"
              id="createTask"
              className="text-black p-2"
              placeholder="Column Name"
              onChange={(e) => {
                setColumnInput(e.target.value);
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

export default CreateColumn;

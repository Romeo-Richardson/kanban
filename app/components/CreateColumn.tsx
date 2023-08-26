import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { useClickOutside } from "@react-hookz/web";
import { useKanbanstore } from "../helper/kanbanstore";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface props {
  show: boolean;
}

const CreateColumn = ({ show }: props): React.ReactNode => {
  const { setColumnModal, selectedBoard } = useKanbanstore();
  const [columnInput, setColumnInput] = useState<string | null>(null);

  const { refetch } = useQuery(["user"]);

  const createColumnRef = useRef(null);

  useClickOutside(createColumnRef, () => {
    setColumnModal(false);
  });

  const newColumn = async () => {
    try {
      await axios.post("/api/createcolumn", {
        name: columnInput,
        id: selectedBoard,
      });
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
            className="p-4 w-[450px] flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={createColumnRef}
            onSubmit={async (e) => {
              e.preventDefault();
              if (selectedBoard) {
                await toast.promise(newColumn(), {
                  loading: "Creating Column",
                  success: "Column Created",
                  error: "Failed to create column",
                });
                refetch();
              } else {
                toast.error("Please select a board");
              }
            }}
          >
            <input
              name="Task"
              id="createTask"
              className="text-black"
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

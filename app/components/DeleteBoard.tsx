import React, { useRef } from "react";
import Modal from "./Modal";
import { useClickOutside } from "@react-hookz/web";
import { useKanbanstore } from "../helper/kanbanstore";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface props {
  show: boolean;
}

const DeleteBoard = ({ show }: props) => {
  const { setDeleteBoardModal, selectedBoard, setSelectedBoard } =
    useKanbanstore();

  const { refetch } = useQuery(["user"]);

  const deleteBoardRef = useRef(null);
  useClickOutside(deleteBoardRef, () => {
    setDeleteBoardModal(false);
  });

  const deleteBoard = async () => {
    try {
      await axios.post("/api/deleteboard", {
        id: selectedBoard,
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setDeleteBoardModal(false);
    }
  };

  return (
    <>
      {show ? (
        <Modal>
          <div
            className="w-[275px]  p-4 flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={deleteBoardRef}
          >
            <p>Are you sure you want to delete the current board?</p>
            <button
              className="text-slate-700 bg-slate-300 w-full p-2 rounded hover:bg-slate-400 active:bg-slate-600"
              onClick={() => {
                setDeleteBoardModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-red-900 w-full p-2 bg-red-300 rounded hover:bg-red-400 active:bg-red-600"
              onClick={async (e) => {
                e.preventDefault();
                if (selectedBoard) {
                  await toast.promise(deleteBoard(), {
                    loading: "Deleting Board",
                    success: "Board Deleted",
                    error: "Failed to delete board",
                  });
                  setSelectedBoard(null);
                  refetch();
                } else {
                  toast.error("No board selected");
                }
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteBoard;

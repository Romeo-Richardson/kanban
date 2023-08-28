import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useClickOutside } from "@react-hookz/web";
import { useKanbanstore } from "../helper/kanbanstore";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface props {
  show: boolean;
  columns: string[];
}

const DeleteColumn = ({ show, columns }: props) => {
  const { setDeleteColumnModal, selectedBoard } = useKanbanstore();
  const { refetch } = useQuery(["user"]);
  const deleteColumnRef = useRef(null);
  useClickOutside(deleteColumnRef, () => {
    setDeleteColumnModal(false);
  });

  const deleteColumn = async (column: FormDataEntryValue | null) => {
    const copy = [...columns];
    const findColumn = copy.filter((item) => {
      return item === column;
    })[0];
    const columnIndex = copy.indexOf(findColumn);
    console.log(selectedBoard);
    console.log(column);
    copy.splice(columnIndex, 1);
    console.log(copy);
    await axios.post("/api/deletecolumn", {
      id: selectedBoard,
      name: column,
      columns: copy,
    });
  };

  return (
    <>
      {show ? (
        <Modal>
          <form
            className="w-[275px]  p-4 flex flex-col items-center bg-slate-900 rounded-md border-gray-600 gap-4 border-[1px] text-white"
            ref={deleteColumnRef}
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              await toast.promise(deleteColumn(data.get("column")), {
                loading: "Deleting Column",
                success: "Column Deleted",
                error: "Delete Failed",
              });
              refetch();
              setDeleteColumnModal(false);
            }}
          >
            <p>Select Column</p>
            <select
              name="column"
              className=" bg-slate-900 w-full border-gray-800 p-2 border-[1px]"
            >
              {columns.map((column, key) => {
                return <option key={key}>{column}</option>;
              })}
            </select>
            <button
              className="text-slate-700 bg-slate-300 w-full p-2 rounded hover:bg-slate-400 active:bg-slate-600"
              onClick={() => {
                setDeleteColumnModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-red-900 w-full p-2 bg-red-300 rounded hover:bg-red-400 active:bg-red-600"
              type="submit"
            >
              Delete
            </button>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteColumn;

import { task } from "@prisma/client";
import { create } from "zustand";

interface kanban {
  taskModal: boolean;
  setTaskModal: (data: boolean) => void;
  boardModal: boolean;
  setBoardModal: (data: boolean) => void;
  columnModal: boolean;
  setColumnModal: (data: boolean) => void;
  selectedBoard: string | null;
  setSelectedBoard: (data: string | null) => void;
  deleteBoardModal: boolean;
  setDeleteBoardModal: (data: boolean) => void;
  editTaskModal: boolean;
  setEditTaskModal: (data: boolean) => void;
  selectedTask: task | null;
  setSelectedTask: (data: task | null) => void;
  deleteColumnModal: boolean;
  setDeleteColumnModal: (data: boolean) => void;
}

export const useKanbanstore = create<kanban>((set, get) => ({
  taskModal: false,
  setTaskModal: (data: boolean) => {
    console.log("Task");
    set({ taskModal: data });
  },
  boardModal: false,
  setBoardModal: (data: boolean) => {
    console.log("Board");
    set({ boardModal: data });
  },
  selectedBoard: null,
  setSelectedBoard: (data: string | null) => {
    set({ selectedBoard: data });
  },
  columnModal: false,
  setColumnModal: (data: boolean) => {
    set({ columnModal: data });
  },
  deleteBoardModal: false,
  setDeleteBoardModal: (data: boolean) => {
    set({ deleteBoardModal: data });
  },
  editTaskModal: false,
  setEditTaskModal: (data: boolean) => {
    set({ editTaskModal: data });
  },
  selectedTask: null,
  setSelectedTask: (data: task | null) => {
    set({ selectedTask: data });
  },
  deleteColumnModal: false,
  setDeleteColumnModal: (data: boolean) => {
    set({ deleteColumnModal: data });
  },
}));

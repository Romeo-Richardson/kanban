import { create } from "zustand";

interface kanban {
  taskModal: boolean;
  setTaskModal: (data: boolean) => void;
  boardModal: boolean;
  setBoardModal: (data: boolean) => void;
  columnModal: boolean;
  setColumnModal: (data: boolean) => void;
  selectedBoard: string | null;
  setSelectedBoard: (data: string) => void;
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
  setSelectedBoard: (data: string) => {
    set({ selectedBoard: data });
  },
  columnModal: false,
  setColumnModal: (data: boolean) => {
    set({ columnModal: data });
  },
}));

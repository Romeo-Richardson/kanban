import dots from "../assets/dots.png";
import Image from "next/image";
import { useKanbanstore } from "../helper/kanbanstore";
import { board } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useClickOutside } from "@react-hookz/web";

type props = {
  name: string;
  boards: board[];
};

const Topnav = ({ name, boards }: props): React.ReactNode => {
  const { setTaskModal, selectedBoard, setColumnModal } = useKanbanstore();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const { data: user }: any = useQuery(["user"]);

  const dropRef = useRef(null);
  useClickOutside(dropRef, () => {
    setDropdown(false);
  });

  const currentBoard = user.boards.filter((board: board) => {
    return board.id === selectedBoard;
  })[0]?.name;

  console.log(boards, currentBoard);

  return (
    <div className="h-24 min-w-full flex items-center border-b-[1px] border-gray-800 px-4">
      <h1 className="text-2xl text-white flex-grow">
        <strong>{name}</strong> - <strong>{currentBoard}</strong>
      </h1>
      <div className="flex gap-2">
        <div
          className=" bg-purple-500 hover:cursor-pointer hover:bg-purple-600 duration-300 rounded-3xl flex items-center justify-end px-4"
          onClick={() => {
            setTaskModal(true);
          }}
        >
          <p className="text-white">+ Add New Task</p>
        </div>
        <div
          className="h-10 w-10 hover:bg-slate-700 opacity-25 rounded-full hover:cursor-pointer duration-500 flex items-center justify-center"
          onClick={() => {
            setDropdown(true);
          }}
        >
          <Image height={20} width={20} src={dots} alt={"Menu"}></Image>
        </div>
        {dropdown ? (
          <>
            <div
              className=" bg-slate-900 text-white border-gray-800 border-[1px] w-32 z-10 absolute rounded top-20 right-8"
              ref={dropRef}
            >
              <div
                className=" hover:bg-slate-700 p-2 hover:cursor-pointer duration-300"
                onClick={() => {
                  setColumnModal(true);
                  setDropdown(false);
                }}
              >
                <p>New Column</p>
              </div>
              <div className="hover:bg-slate-700 p-2 hover:cursor-pointer duration-300">
                <p>Logout</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Topnav;

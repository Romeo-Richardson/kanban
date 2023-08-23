import React, { FC } from "react";
import Image from "next/image";
import kanban from "../assets/kanbanicon8.png";
import board from "../assets/bulletin-board.png";
import { useKanbanstore } from "../helper/kanbanstore";

interface board {
  name: string;
}

interface props {
  boards: board[];
}

const Sidenav = ({ boards }: props): React.ReactNode => {
  const { setBoardModal } = useKanbanstore();
  const rBoards = boards.reverse();
  return (
    <div className=" min-h-full w-64 relative flex flex-col border-r-[1px] border-solid border-gray-800">
      <div className="m-w-full flex h-24 items-center">
        <Image
          src={kanban}
          height={55}
          width={55}
          alt="Logo"
          className="ml-4 hover:cursor-pointer"
        ></Image>
        <h1 className="  text-4xl text-white">
          <strong>Kanban</strong>
        </h1>
      </div>
      <div className="h-16 m-w-full flex items-center ml-8">
        <p className=" tracking-wider text-gray-600">{`All BOARDS(${boards.length})`}</p>
      </div>
      <div className=" w-full flex-grow-0"></div>
      <div className="mw-full h-14">
        <div
          className="w-[90%] h-full duration-300 my-2 bg-purple-500 hover:cursor-pointer hover:bg-purple-600 flex items-center gap-2 rounded-tr-[2rem] rounded-br-[2rem]"
          onClick={() => {
            setBoardModal(true);
          }}
        >
          <Image
            height={20}
            width={20}
            src={board}
            alt="Create new board"
            className="ml-8"
          ></Image>
          <p className="text-white">Create New Board</p>
        </div>
        {rBoards.map((item, key) => {
          return (
            <div
              className="w-[90%] h-full my-2 bg-slate-700 opacity-25 duration-300 hover:cursor-pointer hover:bg-purple-600 flex items-center gap-2 rounded-tr-[2rem] rounded-br-[2rem]"
              key={key}
            >
              <Image
                height={20}
                width={20}
                src={board}
                alt="Create new board"
                className="ml-8"
              ></Image>
              <p className="text-white">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenav;

import React, { FC } from "react";
import Image from "next/image";
import kanban from "../assets/kanbanicon8.png";
import boardImg from "../assets/bulletin-board.png";
import { useKanbanstore } from "../helper/kanbanstore";
import { board } from "@prisma/client";

interface props {
  boards: board[];
}

const Sidenav = ({ boards }: props): React.ReactNode => {
  const { setBoardModal, selectedBoard, setSelectedBoard } = useKanbanstore();

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
          className="w-[90%] h-full duration-300 my-2 bg-green-600 hover:cursor-pointer hover:bg-green-700 flex items-center gap-2 rounded-tr-[2rem] rounded-br-[2rem]"
          onClick={() => {
            setBoardModal(true);
          }}
        >
          <p className="text-white ml-8">Create New Board</p>
        </div>
        {boards.map((item, key) => {
          return (
            <div
              className={`w-[90%] h-full my-2 ${
                selectedBoard === item.id ? null : "opacity-25"
              } duration-300 hover:cursor-pointer ${
                selectedBoard === item.id ? "bg-purple-500" : "bg-slate-700"
              } ${
                selectedBoard === item.id
                  ? "hover:bg-purple-600"
                  : "hover:bg-purple-500"
              } flex items-center gap-2 rounded-tr-[2rem] rounded-br-[2rem]`}
              key={key}
              onClick={() => {
                setSelectedBoard(item.id);
              }}
            >
              <Image
                height={20}
                width={20}
                src={boardImg}
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

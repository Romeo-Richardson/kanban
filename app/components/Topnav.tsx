import React, { ComponentProps } from "react";
import dots from "../assets/dots.png";
import Image from "next/image";
import { useKanbanstore } from "../helper/kanbanstore";

type props = {
  name: string;
};

const Topnav = ({ name }: props): React.ReactNode => {
  const { setTaskModal } = useKanbanstore();
  return (
    <div className="h-24 min-w-full flex items-center border-b-[1px] border-gray-800 px-4">
      <h1 className="text-2xl text-white flex-grow">
        <strong>{name}</strong>
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
        <div className="h-10 w-10 hover:bg-gray-400 opacity-70 rounded-full hover:cursor-pointer duration-500 flex items-center justify-center">
          <Image height={20} width={20} src={dots} alt={"Menu"}></Image>
        </div>
      </div>
    </div>
  );
};

export default Topnav;

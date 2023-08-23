import React, { FC } from "react";
import Image from "next/image";
import kanban from "../assets/kanbanicon9.png";

const KanbanLoading: FC = () => {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center">
      <span>
        <Image
          height={225}
          quality={100}
          width={225}
          src={kanban}
          alt={"Logo"}
          className={" bg-transparent animate-spin duration-400"}
        ></Image>
      </span>
      <p className="text-white">Loading Kanban Board Data...</p>
    </div>
  );
};

export default KanbanLoading;

"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import KanbanLoading from "../components/KanbanLoading";
import Sidenav from "../components/Sidenav";
import Main from "../components/Main";
import Topnav from "../components/Topnav";
import Pillar from "../components/Pillar";
import PillarContainer from "../components/PillarContainer";
import PllarTitle from "../components/PillarTitle";
import Modal from "../components/Modal";
import CreateTask from "../components/CreateTask";
import { useKanbanstore } from "../helper/kanbanstore";
import CreateBoard from "../components/CreateBoard";
import Task from "../components/Task";

const page: FC = ({ params }: Params) => {
  const { taskModal, boardModal, selectedBoard } = useKanbanstore();
  const {
    data: user,
    isFetched,
    isLoading,
  } = useQuery(["user"], async () => {
    const user = await axios.post("/api/currentuser", { id: params.id });
    console.log(user);
    return user.data.user;
  });

  const columns = ["Todo", "Doing", "Complete"];

  if (isFetched) {
    console.log(user.username);
  }

  return (
    <main
      className={`flex min-h-screen ${isLoading ? "justify-center" : null}`}
    >
      {isLoading ? (
        <KanbanLoading></KanbanLoading>
      ) : (
        <>
          <Sidenav boards={user.boards}></Sidenav>
          <Main>
            <Topnav name={user.username}></Topnav>
            <PillarContainer>
              {columns.map((item, key) => {
                return (
                  <PllarTitle key={key} name={item}>
                    <Pillar>
                      <Task></Task>
                    </Pillar>
                  </PllarTitle>
                );
              })}
            </PillarContainer>
          </Main>
          <CreateTask user={user} show={taskModal}></CreateTask>
          <CreateBoard user={user} show={boardModal}></CreateBoard>
        </>
      )}
    </main>
  );
};

export default page;

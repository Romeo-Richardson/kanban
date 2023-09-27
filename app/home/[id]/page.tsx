"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import KanbanLoading from "../../components/KanbanLoading";
import Sidenav from "../../components/Sidenav";
import Main from "../../components/Main";
import Topnav from "../../components/Topnav";
import Pillar from "../../components/Pillar";
import PillarContainer from "../../components/PillarContainer";
import PllarTitle from "../../components/PillarTitle";
import CreateTask from "../../components/CreateTask";
import { useKanbanstore } from "../../helper/kanbanstore";
import CreateBoard from "../../components/CreateBoard";
import Task from "../../components/Task";
import { task, board } from "@prisma/client";
import CreateColumn from "../../components/CreateColumn";
import DeleteBoard from "../../components/DeleteBoard";
import EditTask from "../../components/EditTask";
import DeleteColumn from "../../components/DeleteColumn";

interface Tboard extends board {
  tasks: task[];
}

const MainDashboard = ({ params }: { params: { id: string } }) => {
  const {
    taskModal,
    boardModal,
    columnModal,
    selectedBoard,
    deleteBoardModal,
    editTaskModal,
    deleteColumnModal,
  } = useKanbanstore();
  const { data: user, isLoading } = useQuery(["user"], async () => {
    const user = await axios.post("/api/currentuser", { id: params.id });
    console.log(user);
    return user.data.user;
  });

  const getColumns = user?.boards.filter((board: board) => {
    return board.id === selectedBoard;
  })[0]?.columns;
  console.log(getColumns?.columns);

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
            <Topnav name={user.username} boards={user.boards}></Topnav>
            <PillarContainer>
              {selectedBoard ? (
                <>
                  {getColumns?.map((item: string, key: number) => {
                    return (
                      <PllarTitle key={key} name={item}>
                        <Pillar name={item}>
                          {user.boards
                            .filter((board: Tboard) => {
                              return board.id === selectedBoard;
                            })[0]
                            .tasks.map((task: task, secondKey: number) => {
                              if (task.status === item) {
                                return (
                                  <Task key={secondKey} task={task}></Task>
                                );
                              }
                            })}
                        </Pillar>
                      </PllarTitle>
                    );
                  })}
                </>
              ) : null}
            </PillarContainer>
          </Main>
          {taskModal && <CreateTask user={user}></CreateTask>}
          {boardModal && <CreateBoard user={user}></CreateBoard>}
          {columnModal && <CreateColumn columns={getColumns}></CreateColumn>}
          {deleteBoardModal && <DeleteBoard></DeleteBoard>}
          {editTaskModal && <EditTask></EditTask>}
          <DeleteColumn
            show={deleteColumnModal}
            columns={getColumns}
          ></DeleteColumn>
        </>
      )}
    </main>
  );
};

export default MainDashboard;

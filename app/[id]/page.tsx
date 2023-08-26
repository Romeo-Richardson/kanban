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
import CreateTask from "../components/CreateTask";
import { useKanbanstore } from "../helper/kanbanstore";
import CreateBoard from "../components/CreateBoard";
import Task from "../components/Task";
import { task, board } from "@prisma/client";

interface Tboard extends board {
  tasks: task[];
}

const page: FC = ({ params }: Params) => {
  const [columns, setColumns] = useState<string[] | null>(null);
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

  useEffect(() => {
    if (isFetched && selectedBoard) {
      const getColumns = user.boards.filter((board: board) => {
        return board.id === selectedBoard;
      })[0];
      console.log(getColumns.columns);
      setColumns((prev) => (prev = [...getColumns.columns]));
    }
  }, [selectedBoard]);

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
                  {columns?.map((item, key) => {
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
          <CreateTask user={user} show={taskModal}></CreateTask>
          <CreateBoard user={user} show={boardModal}></CreateBoard>
        </>
      )}
    </main>
  );
};

export default page;

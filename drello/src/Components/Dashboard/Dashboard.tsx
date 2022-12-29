import { nanoid } from "nanoid";
import React from "react";
import Board from "./Board";

interface boardHandle {
  boardItems: any;
  deleteBoard: any;
  updateLS: any;
  updateBoardTitle: any;
}

export default function Dashboard(props: boardHandle) {
  const allBoards = props.boardItems.map((board: any) => {
    return (
      <Board
        name={board.title}
        list={["test"]}
        key={board.id}
        id={board.id}
        deleteBoard={props.deleteBoard}
        updateLS={props.updateLS}
        updateBoardTitle={props.updateBoardTitle}
      />
    );
  });

  const listItems = [
    {
      title: "Task 1",
      description: "Description",
      tags: "URGENT",
    },
    {
      title: "Task 2",
      description: "Description2",
      tags: "URGENT",
    },
  ];

  return <div>{allBoards}</div>;
}

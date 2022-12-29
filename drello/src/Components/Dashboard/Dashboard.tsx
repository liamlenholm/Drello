import { nanoid } from "nanoid";
import React from "react";
import Board from "./Board";

interface boardHandle {
  boardItems: any;
  deleteBoard: any;
  updateLS: any;
  updateBoardTitle: any;
  addListItems: any;
}

export default function Dashboard(props: boardHandle) {
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

  const [itemsBoard, setItemsBoard] = React.useState();

  const allBoards = props.boardItems.map((board: any) => {
    return (
      <Board
        name={board.title}
        list={listItems}
        key={board.id}
        id={board.id}
        deleteBoard={props.deleteBoard}
        updateLS={props.updateLS}
        updateBoardTitle={props.updateBoardTitle}
        addListItems={props.addListItems}
      />
    );
  });

  return <div>{allBoards}</div>;
}

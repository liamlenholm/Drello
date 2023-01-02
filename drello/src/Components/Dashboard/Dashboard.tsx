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
  const [itemsBoard, setItemsBoard] = React.useState();

  function addListItems(list: any) {
    props.addListItems(list);
    console.log("ADD listitems in Dashboard Ran");
  }

  const allBoards = props.boardItems.map((board: any) => {
    console.log(board, "BOARDD");
    return (
      <Board
        name={board.title}
        listTasks={board.list}
        key={board.id}
        id={board.id}
        deleteBoard={props.deleteBoard}
        updateLS={props.updateLS}
        updateBoardTitle={props.updateBoardTitle}
        addListItems={addListItems}
      />
    );
  });

  return <div>{allBoards}</div>;
}

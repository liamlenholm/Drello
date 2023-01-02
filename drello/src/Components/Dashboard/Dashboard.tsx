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
  const [itemsBoard, setItemsBoard] = React.useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(itemsBoard));
  }, [itemsBoard]);

  function addListItems(list: any) {
    setItemsBoard(itemsBoard.concat(list));
  }

  function deleteTask(TaskID: string) {
    setItemsBoard((oldItemsBoard: any) =>
      oldItemsBoard.filter((items: any) => items.id2 !== TaskID)
    );
  }

  function saveChanges(taskId: string, taskName: string, taskDesc: string) {
    setItemsBoard((oldItems: any) =>
      oldItems.map((item: any) => {
        return item.id2 === taskId
          ? { ...item, taskName: taskName, taskDescription: taskDesc }
          : item;
      })
    );
  }

  const allBoards = props.boardItems.map((board: any) => {
    return (
      <Board
        name={board.title}
        listTasks={itemsBoard}
        key={board.id}
        id={board.id}
        deleteBoard={props.deleteBoard}
        updateLS={props.updateLS}
        updateBoardTitle={props.updateBoardTitle}
        addListItems={addListItems}
        deleteTask={deleteTask}
        saveChanges={saveChanges}
      />
    );
  });

  return <div>{allBoards}</div>;
}

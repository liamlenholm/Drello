import React from "react";
import Board from "./Board";

interface boardHandle {
  boardItems: any;
  deleteBoard: any;
  updateBoardTitle: any;
  addListItems: any;
  moveRight: any;
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

  //Delete Task - TaskID recieved from Board
  function deleteTask(TaskID: string) {
    setItemsBoard((oldItemsBoard: any) =>
      oldItemsBoard.filter((items: any) => items.id2 !== TaskID)
    );
  }

  //Save Changes after Editing in EditListItemModal
  function saveChanges(
    taskId: string,
    taskName: string,
    taskDesc: string,
    taskColor: string
  ) {
    setItemsBoard((oldItems: any) =>
      oldItems.map((item: any) => {
        return item.id2 === taskId
          ? {
              ...item,
              taskName: taskName,
              taskDescription: taskDesc,
              taskColor: taskColor,
            }
          : item;
      })
    );
  }

  //Move task to diffrent board
  function changeTaskLocation(taskId: string, boardId: string) {
    setItemsBoard((oldItems: any) =>
      oldItems.map((item: any) => {
        if (item.id2 === taskId) {
          return { ...item, id: boardId };
        } else {
          return item;
        }
      })
    );
  }

  function getAllBoards() {
    return props.boardItems;
  }

  const allBoards = props.boardItems.map((board: any, index: number) => {
    return (
      <Board
        name={board.title}
        //TASKS
        listTasks={itemsBoard}
        key={board.id}
        id={board.id}
        //FUNCTIONS
        deleteBoard={props.deleteBoard}
        updateBoardTitle={props.updateBoardTitle}
        addListItems={addListItems}
        deleteTask={deleteTask}
        saveChanges={saveChanges}
        getAllBoards={getAllBoards}
        changeTaskLocation={changeTaskLocation}
        moveRight={props.moveRight}
        //Index for sorting
        currIndex={index}
      />
    );
  });

  return <div>{allBoards}</div>;
}

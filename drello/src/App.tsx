import React from "react";
import Header from "./Components/Navbar/Header";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateBoardModal from "./Components/Dashboard/CreateBoardModal";

function App() {
  const [boardItems, setBoardItems] = React.useState(() =>
    JSON.parse(localStorage.getItem("boards") || "[]")
  );
  console.log(boardItems);

  React.useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boardItems));
  }, [boardItems]);

  function createNewBoard(boardItem: any) {
    setBoardItems((prevBoards: any) => [boardItem, ...prevBoards]);
    console.log(boardItems);
  }

  function deleteBoard(boardId: string) {
    setBoardItems((oldBoardItems: any) =>
      oldBoardItems.filter((board: any) => board.id !== boardId)
    );
  }

  function updateLS() {
    console.log("funkar");
  }

  function updateBoardTitle(boardId: string, boardName: string) {
    setBoardItems((oldBoard: any) =>
      oldBoard.map((board: any) => {
        console.log(board, "TEST");
        return board.id === boardId ? { ...board, title: boardName } : board;
      })
    );
  }

  function addListItems() {
    console.log("test");
  }

  function updateBoardName() {}

  return (
    <div>
      <Header createBoard={createNewBoard} />
      <Dashboard
        boardItems={boardItems}
        deleteBoard={deleteBoard}
        updateLS={updateLS}
        updateBoardTitle={updateBoardTitle}
        addListItems={addListItems}
      />
    </div>
  );
}

export default App;

import React from "react";
import Header from "./Components/Navbar/Header";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";

import CreateBoardModal from "./Components/Dashboard/Modals/CreateBoardModal";

function App() {
  const [boardItems, setBoardItems] = React.useState(() =>
    JSON.parse(localStorage.getItem("boards") || "[]")
  );
  React.useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boardItems));
  }, [boardItems]);

  function createNewBoard(boardItem: any) {
    setBoardItems((prevBoards: any) => [boardItem, ...prevBoards]);
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
        return board.id === boardId ? { ...board, title: boardName } : board;
      })
    );
  }

  function addListItems(listOfTasks: any) {
    setBoardItems((oldBoard: any) =>
      oldBoard.map((board: any) => {
        return board.id === listOfTasks.id
          ? { ...board, list: listOfTasks }
          : board;
      })
    );
  }

  //Darkmode switch
  const [darkMode, setDarkMode] = React.useState(() =>
    JSON.parse(localStorage.getItem("theme") || "[]")
  );

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#1b2431";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    }
  }, [darkMode]);

  function darkModeSwitch() {
    setDarkMode((prevMode: any) => !prevMode);
  }
  React.useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div>
      <Header createBoard={createNewBoard} darkModeSwitch={darkModeSwitch} />
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

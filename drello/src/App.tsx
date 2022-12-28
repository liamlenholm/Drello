import React from "react";
import Header from "./Components/Navbar/Header";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateBoardModal from "./Components/Dashboard/CreateBoardModal";

function App() {
  const [boardItems, setBoardItems] = React.useState(() =>
    JSON.parse(localStorage.getItem("boards") || "[]")
  );

  React.useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boardItems));
  }, [boardItems]);

  function createNewBoard(boardItem: any) {
    setBoardItems((prevBoards: any) => [boardItem, ...prevBoards]);
    console.log(boardItems);
  }

  function updateBoardName() {}

  return (
    <div>
      <Header createBoard={createNewBoard} />
      <Dashboard boardItems={boardItems} />
    </div>
  );
}

export default App;

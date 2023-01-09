import React from "react";
import { Navbar, Button } from "flowbite-react";
import Contact from "./Contact";
import About from "./About";
import CreateBoardModal from "../Dashboard/Modals/CreateBoardModal";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

interface boardHandle {
  createBoard: any;
  darkModeSwitch: any;
  boardItemsLenght: any;
}

export default function Header(props: boardHandle) {
  const [showContactModal, setShowContactModal] = React.useState(false);
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = React.useState(false);

  function toggleContactModal() {
    setShowContactModal((prevModalState) => !prevModalState);
  }

  function toggleAboutModal() {
    setShowAboutModal((prevModalState) => !prevModalState);
  }

  function toggleCreateBoardModal() {
    setShowCreateBoardModal((prevModalState) => !prevModalState);
  }

  function createNewBoard() {
    props.createBoard();
  }

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://github.com/liamlenholm/Drello">
        <img
          src="https://www.vectorlogo.zone/logos/trello/trello-tile.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Drello"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Drello
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2 gap-3 align-middle">
        <FontAwesomeIcon
          icon={faMoon}
          size="xl"
          color="#1a56db"
          style={{ paddingTop: "10px", cursor: "pointer" }}
          onClick={props.darkModeSwitch}
        />

        <Button onClick={() => setShowCreateBoardModal(true)}>
          Create Board
        </Button>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link
          style={{ cursor: "pointer" }}
          onClick={() => setShowAboutModal(true)}
        >
          About
        </Navbar.Link>

        <Navbar.Link
          style={{ cursor: "pointer" }}
          onClick={() => setShowContactModal(true)}
        >
          Contact
        </Navbar.Link>
        {showContactModal && (
          <Contact
            modalVisable={showContactModal}
            toggleModal={toggleContactModal}
          />
        )}

        {showAboutModal && (
          <About modalVisable={showAboutModal} toggleModal={toggleAboutModal} />
        )}

        {showCreateBoardModal && (
          <CreateBoardModal
            modalVisable={showCreateBoardModal}
            toggleModal={toggleCreateBoardModal}
            //Sending the function as a prop
            createNewBoard={createNewBoard}
          />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

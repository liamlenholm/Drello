import React from "react";
import { Navbar, Button } from "flowbite-react";
import Contact from "./Contact";

export default function Header() {
  const [showModal, setShowModal] = React.useState(false);

  function toggleModal() {
    setShowModal((prevModal) => !prevModal);
  }

  React.useEffect(() => {
    console.log(showModal);
  }, [showModal]);

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
      <div className="flex md:order-2">
        <Button>Create Board</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link onClick={() => setShowModal(true)}>Contact</Navbar.Link>
        {showModal && (
          <Contact modalVisable={showModal} toggleModal={toggleModal} />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

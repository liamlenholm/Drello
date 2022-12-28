import React from "react";
import { Navbar, Button } from "flowbite-react";

export default function Header() {
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
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

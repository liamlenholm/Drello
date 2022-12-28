import React from "react";
import { Modal, Button } from "flowbite-react";

interface ModalVisable {
  modalVisable: boolean;
  toggleModal: any;
}

export default function About(props: ModalVisable) {
  return (
    <Modal
      show={props.modalVisable}
      size="2xl"
      onClose={() => props.toggleModal()}
    >
      <Modal.Header>About</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Drello
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            A Trello Clone
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

import React from "react";
import { Modal, Button } from "flowbite-react";

interface ModalVisable {
  modalVisable: boolean;
  toggleModal: any;
}

export default function Contact(props: ModalVisable) {
  return (
    <Modal
      show={props.modalVisable}
      size="2xl"
      onClose={() => props.toggleModal()}
    >
      <Modal.Header>Contact</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            liam@lenholm.se
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            https://github.com/liamlenholm
            <br />
            https://liam.lenholm.se
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

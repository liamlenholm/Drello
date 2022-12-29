import React from "react";
import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";

interface ModalVisable {
  modalVisable: boolean;
  toggleModal: any;
}

export default function CreateListItemModal(props: ModalVisable) {
  function createBoard() {
    props.toggleModal();
  }
  return (
    <Modal
      show={props.modalVisable}
      size="md"
      popup={true}
      onClose={() => props.toggleModal()}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            New Task
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="taskName" value="Task Name:" />
            </div>
            <TextInput
              name="taskName"
              id="taskName"
              placeholder="Task 1"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="taskDescription" value="Description:" />
            </div>
            <TextInput
              name="taskDescription"
              id="taskDescription"
              placeholder="Finnish Drello"
              required={true}
            />
          </div>
          <div className="w-full">
            <Button onClick={() => createBoard()}>Create Task</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

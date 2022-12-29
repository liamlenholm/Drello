import React from "react";
import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";

interface ModalVisable {
  modalVisable: boolean;
  toggleModal: any;
  createNewBoard: any;
}

export default function CreateBoardModal(props: ModalVisable) {
  const [formData, setFormData] = React.useState({
    boardName: "",
  });

  function handleChange(event: any) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //Close the Modal and run the function createNewBoard which was sent via Header
  function createBoard() {
    props.toggleModal();

    //If you create a board without a name the name will be set to Default
    if (formData.boardName) {
      return props.createNewBoard(formData.boardName);
    } else {
      return props.createNewBoard("Default");
    }
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
            New Board
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="boardName" value="Board Name:" />
            </div>
            <TextInput
              name="boardName"
              id="boardName"
              placeholder="Board 1"
              required={true}
              onChange={handleChange}
              value={formData.boardName}
            />
          </div>
          <div className="w-full">
            <Button onClick={() => createBoard()}>Create board</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

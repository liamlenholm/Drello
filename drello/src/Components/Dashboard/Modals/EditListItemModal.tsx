import React from "react";
import {
  Modal,
  Button,
  Label,
  TextInput,
  Textarea,
  Dropdown,
} from "flowbite-react";

interface ModalVisable {
  modalVisable: boolean;
  toggleModal: any;
  taskName: string;
  taskDesc: string;
  taskId: string;
  saveChanges: any;
  getAllBoards: any;
  changeTaskLocation: any;
}

export default function EditListItemModal(props: ModalVisable) {
  const [formData, setFormData] = React.useState({
    taskName: "",
    taskDescription: "",
    taskId: "",
  });

  function handleChange(event: any) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  React.useEffect(() => {
    setFields();
  }, []);

  function setFields() {
    setFormData({
      taskName: props.taskName,
      taskDescription: props.taskDesc,
      taskId: props.taskId,
    });
  }
  const allBoards = props.getAllBoards();
  const renderAllBoards = allBoards.map((data: any) => {
    return (
      //Sends TaskID and choosen board ID
      <Dropdown.Item
        onClick={() => {
          props.changeTaskLocation(formData.taskId, data.id);
          props.toggleModal();
        }}
      >
        {data.title}
      </Dropdown.Item>
    );
  });

  return (
    <Modal
      show={props.modalVisable}
      size="2xl"
      popup={true}
      onClose={() => props.toggleModal()}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Task
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
              value={formData.taskName}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="taskDescription" value="Description:" />
            </div>
            <Textarea
              name="taskDescription"
              id="taskDescription"
              placeholder="Finnish Drello"
              required={true}
              value={formData.taskDescription}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex justify-between">
            <Button
              onClick={() => {
                props.saveChanges(
                  formData.taskId,
                  formData.taskName,
                  formData.taskDescription
                );
                props.toggleModal();
              }}
            >
              Save Changes
            </Button>

            <div className="">
              <Dropdown label="Move to">{renderAllBoards}</Dropdown>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

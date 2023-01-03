import React from "react";
import { Card, Dropdown, Button } from "flowbite-react";
import Editable from "react-editable-title";
import CreateListItemModal from "./Modals/CreateListItemModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import EditListItemModal from "./Modals/EditListItemModal";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface BoardSettings {
  id: string;
  name: string;
  listTasks: Array<any>;
  deleteBoard: any;
  updateLS: any;
  updateBoardTitle: any;
  addListItems: any;
  deleteTask: any;
  saveChanges: any;
  getAllBoards: any;
  changeTaskLocation: any;
  currIndex: number;
}

export default function Board(props: BoardSettings) {
  const [boardTitle, setBoardTitle] = React.useState(props);

  //List that will be stored in localstorage
  const [list, setList] = React.useState([
    {
      taskName: "",
      taskDescription: "",
      taskTags: "",
      id: "",
    },
  ]);

  const [taskInfo, setTaskInfo] = React.useState({
    taskId: "",
    taskName: "",
    taskDesc: "",
  });

  const [showCreateListItemModal, setShowCreateListItemModal] =
    React.useState(false);

  const [showEditListItemModal, setShowEditListItemModal] =
    React.useState(false);

  function renderEditModal(taskId: string, taskName: string, taskDesc: string) {
    setTaskInfo({
      taskId: taskId,
      taskName: taskName,
      taskDesc: taskDesc,
    });

    setShowEditListItemModal((prevState) => !prevState);
  }

  function toggleCreateBoardModal() {
    setShowCreateListItemModal((prevModalState) => !prevModalState);
  }

  function toggleEditListItemModal() {
    setShowEditListItemModal((prevModalState) => !prevModalState);
  }

  function addListItems(newTask: any) {
    setList((oldTasks: any) =>
      oldTasks.map((tasks: any) => {
        return {
          ...oldTasks,
          ...tasks,
          taskName: newTask.taskName,
          taskDescription: newTask.taskDescription,
          taskTags: "none",
          id: boardTitle.id,
          key: boardTitle.id,
          //ID2 is for the deleteTask func
          id2: nanoid(),
        };
      })
    );
  }

  function deleteTask(taskId: string) {
    props.deleteTask(taskId);
  }

  React.useEffect(() => {
    //Stops it from saving an empty task every site refresh
    if (list[0]["taskName"] !== "") {
      props.addListItems(list);
    }
  }, [list]);

  React.useEffect(() => {
    return () => props.updateLS;
  }, [boardTitle]);

  const listItemsContent = props.listTasks.map((data, index) => {
    //Without this if statement it will render an empty array which makes a gap between the board title and the second task becuase task1 is invincible
    if (data.taskName.length > 0) {
      if (boardTitle.id == data.id) {
        return (
          <div key={data.id2}>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0"></div>
                <div
                  className="min-w-0 flex-1"
                  onClick={() =>
                    renderEditModal(
                      data.id2,
                      data.taskName,
                      data.taskDescription
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {data.taskName}
                  </p>
                  <p className="text-ellipsis truncate text-sm max-w-xs text-gray-500 dark:text-gray-400">
                    {data.taskDescription}
                  </p>
                </div>
                <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                  <Button
                    size="xs"
                    className="mr-1"
                    color="failure"
                    onClick={() => deleteTask(data.id2)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </li>
            {showEditListItemModal && (
              <EditListItemModal
                modalVisable={showEditListItemModal}
                toggleModal={toggleEditListItemModal}
                taskName={taskInfo.taskName}
                taskDesc={taskInfo.taskDesc}
                taskId={taskInfo.taskId}
                saveChanges={props.saveChanges}
                getAllBoards={props.getAllBoards}
                changeTaskLocation={props.changeTaskLocation}
              />
            )}
          </div>
        );
      }
    }
  });

  const handleNameUpdate = (current: string) => {
    setBoardTitle({
      ...boardTitle,
      name: current,
    });
    props.updateBoardTitle(boardTitle.id, current);
  };

  const handleNameValidationFail = () => {
    console.log("Rename has failed");
  };

  return (
    <DragDropContext onDragEnd={() => console.log("loaded")}>
      <Droppable droppableId="boards">
        {(provided) => (
          <div
            className="max-w-fit inline-grid mx-3 mt-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Draggable
              key={boardTitle.id}
              draggableId={boardTitle.id}
              index={props.currIndex}
            >
              {(provided) => (
                <div ref={provided.innerRef}>
                  <Card
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        <Editable
                          text={boardTitle.name}
                          seamlessInput
                          placeholder="Board Name"
                          cb={handleNameUpdate}
                          onValidationFail={handleNameValidationFail}
                        />
                      </h5>
                      <div className="items-end">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowCreateListItemModal(true)}
                          className="mx-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Add Task
                        </a>
                        {showCreateListItemModal && (
                          <CreateListItemModal
                            modalVisable={showCreateListItemModal}
                            toggleModal={toggleCreateBoardModal}
                            addListItems={addListItems}
                          />
                        )}
                        <div className="inline-flex mx-1">
                          <Dropdown
                            label={<FontAwesomeIcon icon={faPen} />}
                            dismissOnClick={false}
                            size="xs"
                          >
                            <Dropdown.Item>Color</Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => props.deleteBoard(boardTitle.id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <div className="flow-root">
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {listItemsContent.length > 0 && listItemsContent}
                      </ul>
                    </div>
                    {/* JUST FOR DEBUGGING */}
                    <span style={{ fontSize: "10px", opacity: "50%" }}>
                      JUST FOR DEBUGGIN
                      <br />
                      {boardTitle.id}
                    </span>
                  </Card>
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

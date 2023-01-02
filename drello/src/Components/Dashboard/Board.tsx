import React from "react";
import { Card, Dropdown } from "flowbite-react";
import Editable from "react-editable-title";
import { nanoid } from "nanoid";
import CreateListItemModal from "./CreateListItemModal";
import { ListFormat } from "typescript";

interface BoardSettings {
  id: string;
  name: string;
  listTasks: Array<any>;
  deleteBoard: any;
  updateLS: any;
  updateBoardTitle: any;
  addListItems: any;
}

export default function Board(props: BoardSettings) {
  const [boardTitle, setBoardTitle] = React.useState(props);

  //List that will be stored in localstorage
  const [list, setList] = React.useState([
    {
      taskName: "",
      taskDescription: "",
      taskTags: "",
      id: boardTitle.id,
    },
  ]);

  const [showCreateListItemModal, setShowCreateListItemModal] =
    React.useState(false);

  function toggleCreateBoardModal() {
    setShowCreateListItemModal((prevModalState) => !prevModalState);
  }

  function addListItems(newTask: any) {
    console.log(newTask);
    setList((oldTasks: any) =>
      oldTasks.map((tasks: any) => {
        console.log(tasks, "TASK");
        return {
          ...oldTasks,
          ...tasks,
          taskName: newTask.taskName,
          taskDescription: newTask.taskDescription,
          taskTags: "none",
          id: boardTitle.id,
        };
      })
    );
  }

  React.useEffect(() => {
    props.addListItems(list);
  }, [list]);

  React.useEffect(() => {
    return () => props.updateLS;
  }, [boardTitle]);

  console.log(props.listTasks, "list in board.tsx");

  const listItemsContent = props.listTasks.map((data) => {
    //Without this if statement it will render an empty array which makes a gap between the board title and the second task becuase task1 is invincible
    if (data.taskName.length > 0) {
      if (boardTitle.id == data.id) {
        return (
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {data.taskName}
                </p>
                <p className="text-ellipsis truncate text-sm max-w-xs text-gray-500 dark:text-gray-400">
                  {data.taskDescription}
                </p>
              </div>
              <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                {data.taskTags}
              </div>
            </div>
          </li>
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
  const handleEditCancel = () => {
    console.log("Edit has been canceled");
  };

  const handleNameValidationFail = () => {
    console.log("Rename has failed");
  };

  return (
    <div className="max-w-fit inline-grid mx-3 mt-2" key={boardTitle.id}>
      <Card>
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
              <Dropdown label="Edit" dismissOnClick={false} size="xs">
                <Dropdown.Item>Color</Dropdown.Item>
                <Dropdown.Item onClick={() => props.deleteBoard(boardTitle.id)}>
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
      </Card>
    </div>
  );
}

import React from "react";
import { Card } from "flowbite-react";
import Editable from "react-editable-title";

interface BoardSettings {
  id: number;
  name: string;
  key: number;
  list: Array<any>;
}

export default function Board(props: BoardSettings) {
  const [boardTitle, setBoardTitle] = React.useState(props.name);
  //Checks if board is in focus for the handleName functions
  const [focused, setFocused] = React.useState(false);

  //List that will be stored in localstorage
  const [list, setList] = React.useState(props.list);

  const listItemsContent = list.map((data) => {
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="shrink-0"></div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {data.title}
            </p>
            <p className="text-ellipsis truncate text-sm max-w-xs text-gray-500 dark:text-gray-400">
              {data.description}
            </p>
          </div>
          <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
            {data.tags}
          </div>
        </div>
      </li>
    );
  });

  const handleNameUpdate = (current: string) => {
    setBoardTitle(current);
  };
  const handleEditCancel = () => {
    console.log("Edit has been canceled");
  };

  const handleNameValidationFail = () => {
    console.log("Rename has failed");
  };

  return (
    <div className="max-w-fit inline-grid mx-3 mt-2">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            <Editable
              text={boardTitle}
              seamlessInput
              placeholder="Board Name"
              cb={handleNameUpdate}
              onValidationFail={handleNameValidationFail}
            />
          </h5>
          <div className="items-end">
            <a
              href="#"
              className="mx-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Add Task
            </a>
            <a
              href="#"
              className="mx-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Edit
            </a>
          </div>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {listItemsContent}
          </ul>
        </div>
      </Card>
    </div>
  );
}

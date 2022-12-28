import React from "react";
import { Card } from "flowbite-react";

export default function Board() {
  return (
    <div className="max-w-fit inline-grid mx-3 mt-2">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Board 1
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
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Task 1
                  </p>
                  <p className="text-ellipsis truncate text-sm max-w-xs text-gray-500 dark:text-gray-400">
                    Information
                    sfnasfjanfkjnjafanjafjnjnjnjnjnjnjnjnjasadasdaqwenqjkwewqjkenwqjkenj
                  </p>
                </div>
                <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                  TAGS
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Task 2
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    Information
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  TAGS
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

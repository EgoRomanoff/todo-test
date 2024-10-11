import { TASK_LIST_STORAGE_KEY } from "../constants";
import { Task } from "../types";
import { updateTaskListInStorage } from "./updateTaskListInStorage";

export const getTaskListFromStorage = (storageKey: string = TASK_LIST_STORAGE_KEY): Task[] => {
  const curList = localStorage.getItem(storageKey);

  if (!curList) {
    updateTaskListInStorage([]);
  }

  return curList ? JSON.parse(curList) : [];
};
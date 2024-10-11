import { TASK_LIST_STORAGE_KEY } from "../constants";
import { Task } from "../types";

export const updateTaskListInStorage = (taskList: Task[], storageKey: string = TASK_LIST_STORAGE_KEY) => {
  localStorage.setItem(storageKey, JSON.stringify(taskList));
};
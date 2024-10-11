import { TASK_LIST_STORAGE_KEY } from "../constants";
import { Task } from "../types";

export const getTaskListFromStorage = (storageKey: string = TASK_LIST_STORAGE_KEY): Task[] => {
  const curList = localStorage.getItem(storageKey);

  if (!curList) {
    localStorage.setItem(storageKey, JSON.stringify([]));
    return []
  }

  return JSON.parse(curList);
};
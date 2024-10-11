import { Task } from "../types";
import { getTaskListFromStorage } from "./getTaskListFromStorage";
import { updateTaskListInStorage } from "./updateTaskListInStorage";

export const addTask = (task: Task) => {
  const newList = getTaskListFromStorage();
  newList.push(task);

  updateTaskListInStorage(newList);

  return newList;
};
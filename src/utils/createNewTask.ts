import { Task } from "../types";

export const createNewTask = (text: Task["text"]): Task => ({
  id: String(Date.now()),
  text,
  completed: false,
});

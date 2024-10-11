import { TASK_GROUPS } from "../constants";

export const getActiveTaskGroup = (index: number) => {
  return TASK_GROUPS.find(group => group.order === index) || null;
};
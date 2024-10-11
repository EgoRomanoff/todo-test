import { TaskGroup } from "./types";

export const TASK_LIST_STORAGE_KEY = "todos_task-list";

export const TASK_GROUPS: TaskGroup[] = [
  {
    order: 0,
    label: "Все",
    filterFn: () => true,
  },
  {
    order: 1,
    label: "Активные",
    filterFn: ({ completed }) => !completed,
  },
  {
    order: 2,
    label: "Выполненные",
    filterFn: ({ completed }) => completed,
  },
];

export const TAB_ARIA_PREFIX = "task-group-tab";
export const TABPANEL_ARIA_PREFIX = "task-group-tabpanel";
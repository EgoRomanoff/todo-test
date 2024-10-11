export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskGroup {
  order: number;
  label: string;
  filterFn: (task: Task) => boolean;
}
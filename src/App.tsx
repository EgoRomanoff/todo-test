import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Checkbox from "@mui/material/Checkbox";

import "./App.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type TaskList = Task[];
type TaskGroupKey = "all" | "active" | "completed";

interface TaskGroup {
  order: number;
  label: string;
  key: TaskGroupKey;
  filterFn: (task: Task) => boolean;
}

const TASK_LIST_STORAGE_KEY = "todos_task-list";
const TASK_GROUPS: TaskGroup[] = [
  {
    order: 0,
    label: "Все",
    key: "all",
    filterFn: () => true,
  },
  {
    order: 1,
    label: "Активные",
    key: "active",
    filterFn: ({ completed }) => !completed,
  },
  {
    order: 2,
    label: "Выполненные",
    key: "completed",
    filterFn: ({ completed }) => completed,
  },
];
const TAB_ARIA_PREFIX = "task-group-tab";
const TABPANEL_ARIA_PREFIX = "task-group-tabpanel";

const updateTaskListInStorage = (taskList: TaskList) => {
  localStorage.setItem(TASK_LIST_STORAGE_KEY, JSON.stringify(taskList));
};

const getTaskListFromStorage = (): TaskList => {
  const curList = localStorage.getItem(TASK_LIST_STORAGE_KEY);

  if (!curList) {
    updateTaskListInStorage([]);
  }

  return curList ? JSON.parse(curList) : [];
};

const addTask = (task: Task) => {
  const newList = getTaskListFromStorage();
  newList.push(task);

  updateTaskListInStorage(newList);

  return newList;
};

const toggleTask = (taskID: string) => {
  const tasks = getTaskListFromStorage();
  tasks.forEach(task => {
    if (task.id === taskID) {
      task.completed = !task.completed;
    }
  });

  updateTaskListInStorage(tasks);
};

const createNewTask = (text: Task["text"]): Task => ({
  id: String(Date.now()),
  text,
  completed: false,
});

const a11yTabProps = (key: number) => {
  return {
    id: `${TAB_ARIA_PREFIX}-${key}`,
    "aria-controls": `${TABPANEL_ARIA_PREFIX}-${key}`,
  };
};

const App = () => {
  const [taskList, setTaskList] = useState<TaskList>(getTaskListFromStorage);
  const [taskText, setTaskText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [activeGroup, setActiveGroup] = useState<TaskGroup>(TASK_GROUPS[0]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaskText(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = createNewTask(taskText);

    addTask(newTask);
    setTaskText("");
    setTaskList(getTaskListFromStorage);
  };

  const handleTabChange = (_: SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
    setActiveGroup(TASK_GROUPS[newTab]);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const taskID = e.target.id;
    toggleTask(taskID);
    setTaskList(getTaskListFromStorage);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="task-input"
          name="task"
          label="Что сделать?"
          variant="standard"
          value={taskText}
          onChange={handleInputChange}
        />
      </form>

      <Paper
        variant="elevation"
        elevation={6}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Списки задач"
        >
          {TASK_GROUPS.map(({ label, key, order }) => (
            <Tab
              key={key}
              label={label}
              {...a11yTabProps(order)}
            />
          ))}
        </Tabs>

        <ul>
          {taskList.filter(activeGroup.filterFn).map(({ id, text, completed }) => {
            return (
              <li key={id}>
                <Checkbox
                  id={id}
                  defaultChecked={completed}
                  onChange={handleCheckbox}
                />
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      </Paper>
    </ThemeProvider>
  );
};

export default App;

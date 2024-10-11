import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import "./App.css";
import TaskForm from "./components/TaskForm";
import { getTaskListFromStorage } from "./utils/getTaskListFromStorage";
import { updateTaskListInStorage } from "./utils/updateTaskListInStorage";
import { Task, TaskGroup } from "./types";
import { TASK_GROUPS } from "./constants";
import TaskList from "./components/TaskList";
import TaskTabs from "./components/TaskTabs";
import TaskCounters from "./components/TaskCounters";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const getActiveTaskGroup = (index: number) => {
  return TASK_GROUPS.find(group => group.order === index) || null;
};

const App = () => {
  const initialTab = 0;

  const [taskList, setTaskList] = useState<Task[]>(getTaskListFromStorage);
  const [groupTaskList, setGroupTaskList] = useState<Task[]>([]);
  const [activeTaskGroup, setActiveTaskGroup] = useState<TaskGroup | null>(
    getActiveTaskGroup(initialTab)
  );

  useEffect(() => {
    updateTaskListInStorage(taskList);
  }, [taskList]);

  useEffect(() => {
    setGroupTaskList(activeTaskGroup ? taskList.filter(activeTaskGroup.filterFn) : []);
  }, [taskList, activeTaskGroup]);

  const changeTaskGroup = (index: number) => {
    const group = getActiveTaskGroup(index);

    if (group) {
      setActiveTaskGroup(group);
    }
  };

  const addNewTask = (newTask: Task) => {
    setTaskList(prev => [...prev, newTask]);
  };

  const toggleTask = (taskID: Task["id"]) => {
    setTaskList(prev =>
      prev.map(task => (task.id === taskID ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={1}>
        <TaskForm onSubmit={addNewTask} />
        <TaskCounters
          taskList={taskList}
          activeGroup={activeTaskGroup}
          groupTasks={groupTaskList}
        />
        <TaskList
          taskList={groupTaskList}
          onTaskToggle={toggleTask}
        />
        <TaskTabs
          initialTab={0}
          onTabChange={changeTaskGroup}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default App;

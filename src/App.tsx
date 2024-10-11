import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import TaskForm from "./components/TaskForm";
import { getTaskListFromStorage } from "./utils/getTaskListFromStorage";
import { updateTaskListInStorage } from "./utils/updateTaskListInStorage";
import { Task, TaskGroup } from "./types";
import TaskList from "./components/TaskList";
import TaskTabs from "./components/TaskTabs";
import TaskCounters from "./components/TaskCounters";
import { getActiveTaskGroup } from "./utils/getActiveTaskGroup";

const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: {
    fontFamily: ["Rubic", "Roboto", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  },
});

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
      <CssBaseline />
      <main>
        <Container
          maxWidth="sm"
          sx={{
            height: "100%",
          }}
        >
          <Stack
            spacing={1}
            sx={{ height: "100%", maxHeight: "100vh", py: 3 }}
            useFlexGap
          >
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
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { Task } from "../../types";
import TaskItem from "../TaskItem";

const TaskList = ({
  taskList,
  onTaskToggle,
}: {
  taskList: Task[];
  onTaskToggle?: (taskID: Task["id"]) => void;
}) => {
  if (!taskList.length) {
    return <Typography>Задач нет</Typography>;
  }

  return (
    <Paper component={List}>
      {taskList.map(task => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onTaskToggle}
          />
        );
      })}
    </Paper>
  );
};

export default TaskList;

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { Task } from "../../types";
import TaskItem from "../TaskItem";
import CustomPaper from "../ui/CustomPaper";

const TaskList = ({
  taskList,
  onTaskToggle,
}: {
  taskList: Task[];
  onTaskToggle?: (taskID: Task["id"]) => void;
}) => {
  return (
    <CustomPaper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      {taskList.length ? (
        <List>
          {taskList.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onTaskToggle}
            />
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: "center", m: "auto" }}>Задач нет</Typography>
      )}
    </CustomPaper>
  );
};

export default TaskList;

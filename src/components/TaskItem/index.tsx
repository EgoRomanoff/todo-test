import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";

import { Task } from "../../types";

const TaskItem = ({ task, onToggle }: { task: Task; onToggle?: (taskID: Task["id"]) => void }) => {
  const { id, text, completed } = task;

  const handleCheckbox = () => {
    onToggle?.(id);
  };

  return (
    <ListItem key={id} sx={{ p: 0 }}>
      <Checkbox
        defaultChecked={completed}
        onChange={handleCheckbox}
      />
      <span>{text}</span>
    </ListItem>
  );
};

export default TaskItem;

/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import type { Task } from "@/types";

const TaskItem = ({ task, onToggle }: { task: Task; onToggle?: (taskID: Task["id"]) => void }) => {
  const { id, text, completed } = task;

  const handleCheckbox = () => {
    onToggle?.(id);
  };

  return (
    <ListItem
      key={id}
      sx={{ p: 0 }}
    >
      <Checkbox
        defaultChecked={completed}
        onChange={handleCheckbox}
        inputProps={{
          'data-testid': `test-task-checkbox-${id}`,
        } as any}
      />
      <Typography
        sx={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {text}
      </Typography>
    </ListItem>
  );
};

export default TaskItem;

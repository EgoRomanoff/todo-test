import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";

import { createNewTask } from "../../utils/createNewTask";
import { Task } from "../../types";

const TaskForm = ({ onSubmit }: { onSubmit?: (newTask: Task) => void }) => {
  const [taskText, setTaskText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createdTaskText = taskText.trim();

    if (!createdTaskText || createdTaskText.length > 100) return;

    onSubmit?.(createNewTask(createdTaskText));
    setTaskText("");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      data-testid="test-task-form"
    >
      <TextField
        id="task-input"
        name="task"
        label="Что сделать?"
        variant="outlined"
        fullWidth
        value={taskText}
        onChange={handleInputChange}
        slotProps={{
          htmlInput: {
            "data-testid": "test-task-input",
          },
        }}
      />
    </form>
  );
};

export default TaskForm;

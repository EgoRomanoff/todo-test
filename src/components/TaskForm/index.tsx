import { ChangeEvent, FormEvent, useState } from "react";
import Paper from "@mui/material/Paper";
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

    setTaskText("");
    onSubmit?.(createNewTask(taskText));
  };

  return (
    <Paper
      component="form"
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="task-input"
        name="task"
        label="Что сделать?"
        variant="standard"
        value={taskText}
        onChange={handleInputChange}
      />
    </Paper>
  );
};

export default TaskForm;

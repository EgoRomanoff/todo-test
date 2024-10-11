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

    setTaskText("");
    onSubmit?.(createNewTask(taskText));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        id="task-input"
        name="task"
        label="Что сделать?"
        variant="outlined"
        fullWidth 
        value={taskText}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default TaskForm;

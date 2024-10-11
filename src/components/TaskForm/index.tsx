import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";

import { createNewTask } from "../../utils/createNewTask";
import { Task } from "../../types";
import CustomPaper from "../ui/CustomPaper";

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
    <CustomPaper
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        py: 2,
      }}
    >
      <TextField
        id="task-input"
        name="task"
        label="Что сделать?"
        variant="standard"
        value={taskText}
        onChange={handleInputChange}
      />
    </CustomPaper>
  );
};

export default TaskForm;

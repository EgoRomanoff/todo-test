import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

interface Task {
  text: string;
  completed: boolean;
}

type TaskList = Task[];

const TASK_LIST_STORAGE_KEY = "todos_task-list";

const getTaskListFromStorage = (): TaskList => {
  const curList = localStorage.getItem(TASK_LIST_STORAGE_KEY);

  if (!curList) {
    localStorage.setItem(TASK_LIST_STORAGE_KEY, JSON.stringify([]));
  }

  return curList ? JSON.parse(curList) : [];
};

const updateTaskListInStorage = (task: Task) => {
  const curList = getTaskListFromStorage();
  curList.push(task);

  localStorage.setItem(TASK_LIST_STORAGE_KEY, JSON.stringify(curList));

  return curList;
};

const createNewTask = (text: Task["text"]): Task => ({
  text,
  completed: false,
});

const App = () => {
  const [taskList, setTaskList] = useState<TaskList>(getTaskListFromStorage);
  const [taskText, setTaskText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTaskText(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = createNewTask(taskText);

    updateTaskListInStorage(newTask);
    setTaskText("");
    setTaskList(getTaskListFromStorage);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="task"
          placeholder="Что сделать?"
          value={taskText}
          onChange={handleInputChange}
        />
      </form>

      <ul>
        {taskList.map(({ text, completed }) => (
          <li key={text}>
            <span>{text}</span>
            {completed}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;

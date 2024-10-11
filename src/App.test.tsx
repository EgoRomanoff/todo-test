import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/App";
import { TASK_LIST_STORAGE_KEY } from "@/constants";
import type { Task } from "@/types";

const TEST_TASK_TEXT: string = "Новая тестовая задача";
const EXISTING_DATA = JSON.stringify([
  {
    id: "1",
    text: "Задача 1",
    completed: false,
  },
  {
    id: "2",
    text: "Задача 2",
    completed: true,
  },
  {
    id: "3",
    text: "Задача 3",
    completed: false,
  },
]);

describe("Компонент App", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("должен запрашивать данные из localStorage при первом рендере", () => {
    render(<App />);

    expect(localStorage.getItem).toHaveBeenCalledWith(TASK_LIST_STORAGE_KEY);
  });

  it("должен устанавливать пустой массив в localStorage, если данных нет", () => {
    render(<App />);

    expect(localStorage.setItem).toHaveBeenCalledWith(TASK_LIST_STORAGE_KEY, JSON.stringify([]));
  });

  it("не должен устанавливать данные в localStorage, если они уже есть", () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(EXISTING_DATA);

    render(<App />);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("должен добавлять новую задачу и отображать её в TaskList, а также сохранять в localStorage", () => {
    render(<App />);

    const form = screen.getByTestId<HTMLFormElement>("test-task-form");
    const input = screen.getByTestId<HTMLInputElement>("test-task-input");

    fireEvent.change(input, { target: { value: TEST_TASK_TEXT } });
    fireEvent.submit(form);

    const currentTaskList = localStorage.getItem(TASK_LIST_STORAGE_KEY);

    expect(screen.getByText(TEST_TASK_TEXT)).toBeInTheDocument();
    expect(currentTaskList).not.toBeFalsy();
    expect(JSON.parse(currentTaskList!)).toEqual(
      expect.arrayContaining<Task[]>([expect.objectContaining({ text: TEST_TASK_TEXT })])
    );
    expect(input.value).toBe("");
  });

  it("должен менять статус конкретной задачи и корректно отображать её в TaskList и localStorage", () => {
    localStorage.setItem(TASK_LIST_STORAGE_KEY, EXISTING_DATA);

    render(<App />);

    const taskCheckbox1 = screen.getByTestId<HTMLInputElement>("test-task-checkbox-1");
    const taskCheckbox2 = screen.getByTestId<HTMLInputElement>("test-task-checkbox-2");

    fireEvent.click(taskCheckbox1);
    fireEvent.click(taskCheckbox2);

    const currentTaskList = JSON.parse(localStorage.getItem(TASK_LIST_STORAGE_KEY)!);
    const task1 = currentTaskList.find((task: Task) => task.id === "1");
    const task2 = currentTaskList.find((task: Task) => task.id === "2");

    expect(taskCheckbox1.checked).toBe(true);
    expect(taskCheckbox2.checked).toBe(false);
    expect(task1!.completed).toBe(true);
    expect(task2!.completed).toBe(false);
  });
});

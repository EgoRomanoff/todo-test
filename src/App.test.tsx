import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/App";
import { TASK_LIST_STORAGE_KEY } from "@/constants";
import type { Task } from "@/types";

const TEST_TASK_TEXT: string = "Новая тестовая задача";

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
    const existingData = JSON.stringify([1, 2, 3]);
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(existingData);

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
});

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '@/components/TaskForm';

describe('TaskForm', () => {
  it('не должно отправляться, если инпут пустой', () => {
    const addNewTask = jest.fn();

    render(<TaskForm onSubmit={addNewTask}/>);

    const form = screen.getByTestId<HTMLFormElement>("test-task-form");
    const input = screen.getByTestId<HTMLInputElement>("test-task-input");

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form);

    expect(addNewTask).not.toHaveBeenCalled();
  });

  it('не должно отправляться, если длина инпута больше 100', () => {
    const addNewTask = jest.fn();

    render(<TaskForm onSubmit={addNewTask}/>);

    const form = screen.getByTestId<HTMLFormElement>("test-task-form");
    const input = screen.getByTestId<HTMLInputElement>("test-task-input");
    const longString = 'a'.repeat(101);

    fireEvent.change(input, { target: { value: longString } });
    fireEvent.submit(form);

    expect(addNewTask).not.toHaveBeenCalled();
  });

  it('корректно отображает вводимое значение', () => {
    render(<TaskForm />);

    const input = screen.getByTestId<HTMLInputElement>("test-task-input");
    const longString = 'b'.repeat(30);

    fireEvent.change(input, { target: { value: longString } });

    expect(input.value).toBe(longString);
  });
});

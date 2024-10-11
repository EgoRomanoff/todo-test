import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '@/App';
import { TASK_LIST_STORAGE_KEY } from './constants';

describe('Компонент App', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('должен запрашивать данные из localStorage при первом рендере', () => {
    render(<App />);

    expect(localStorage.getItem).toHaveBeenCalledWith(TASK_LIST_STORAGE_KEY);
  });

  it('должен устанавливать пустой массив в localStorage, если данных нет', () => {
    render(<App />);

    expect(localStorage.setItem).toHaveBeenCalledWith(TASK_LIST_STORAGE_KEY, JSON.stringify([]));
  });

  it('не должен устанавливать данные в localStorage, если они уже есть', () => {
    const existingData = JSON.stringify([1, 2, 3]);
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(existingData);

    render(<App />);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

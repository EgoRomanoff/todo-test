export const getDeclension = (
  number: number,
  [one, few, many]: [string, string, string]
): string => {
  const absNumber = Math.abs(number) % 100;
  const lastDigit = absNumber % 10;

  if (absNumber > 10 && absNumber < 20) {
    return many;
  }

  if (lastDigit > 1 && lastDigit < 5) {
    return few;
  }

  if (lastDigit === 1) {
    return one;
  }

  return many;
};

// // Пример использования:
// const apples = (count: number) => `${count} ${getNounDeclension(count, 'яблоко', 'яблока', 'яблок')}`;

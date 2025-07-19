export const getPercentage = (current: number, max: number): number =>
  (100 * current) / max;

export const getLeft = (percentage: string): string =>
  `calc(${percentage}% - 5px)`;

export const getValue = (percentage: number, max: number): number =>
  (max / 100) * percentage;

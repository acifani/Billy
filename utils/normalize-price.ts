import { FrequencyUnit } from '../types';

export function normalizePrice(
  fromAmount: number,
  fromFrequency: number,
  fromUnit: FrequencyUnit,
  to: FrequencyUnit
): number {
  const amountInDays = toDays(fromAmount, fromUnit) / fromFrequency;
  switch (to) {
    case 'day':
      return amountInDays;
    case 'week':
      return amountInDays * 7;
    case 'month':
      return amountInDays * 30;
    case 'year':
      return amountInDays * 360;
  }
}

function toDays(amount: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'day':
      return amount;
    case 'week':
      return amount / 7;
    case 'month':
      return amount / 30;
    case 'year':
      return amount / 360;
  }
}

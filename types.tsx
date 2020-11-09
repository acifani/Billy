export type RootStackParamList = {
  Subscriptions: undefined;
  Details: undefined;
  NotFound: undefined;
};

export type FrequencyUnit = 'day' | 'week' | 'month' | 'year';

export interface Subscription {
  id: string;
  name: string;
  description?: string;
  amount: number;
  startDate?: number;
  frequencyAmount?: number;
  frequencyUnit?: FrequencyUnit;
}

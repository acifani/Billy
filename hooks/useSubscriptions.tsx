import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Subscription } from '../types';

const defaultSubs: Subscription[] = __DEV__
  ? [
      {
        id: '1',
        name: 'Spotify',
        amount: 9.99,
        frequencyAmount: 1,
        frequencyUnit: 'month',
      },
      {
        id: '2',
        name: 'Netflix',
        description: 'UHD plan',
        amount: 15.99,
        frequencyAmount: 1,
        frequencyUnit: 'month',
      },
      {
        id: '3',
        name: 'Disney+',
        amount: 6.99,
        frequencyAmount: 1,
        frequencyUnit: 'month',
      },
      {
        id: '4',
        name: 'Google Drive',
        description: '100GB plan',
        amount: 19.99,
        frequencyAmount: 1,
        frequencyUnit: 'year',
      },
      {
        id: '5',
        name: 'Vodafone',
        amount: 65,
        frequencyAmount: 2,
        frequencyUnit: 'month',
      },
    ]
  : [];

const SubscriptionsContext = createContext<{
  subscriptions: Subscription[];
  updateSubscription: (s: Subscription) => void;
  addSubscription: (s: Subscription) => void;
  deleteSubscription: (s: string) => void;
}>({
  subscriptions: defaultSubs,
  updateSubscription: () => {},
  addSubscription: () => {},
  deleteSubscription: () => {},
});

export const useSubscriptions = () => useContext(SubscriptionsContext);

export const SubscriptionsContextProvider: React.FC = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    defaultSubs
  );

  const updateSubscription = useCallback(
    (sub: Subscription) => {
      const subIndex = subscriptions.findIndex((s) => s.id === sub.id);
      setSubscriptions([
        ...subscriptions.slice(0, subIndex),
        sub,
        ...subscriptions.slice(subIndex + 1),
      ]);
    },
    [subscriptions, setSubscriptions]
  );

  const addSubscription = useCallback(
    (sub: Subscription) => {
      setSubscriptions([...subscriptions, sub]);
    },
    [subscriptions, setSubscriptions]
  );

  const deleteSubscription = useCallback(
    (subId: string) => {
      setSubscriptions(subscriptions.filter((s) => s.id !== subId));
    },
    [subscriptions, setSubscriptions]
  );

  useEffect(() => {
    AsyncStorage.setItem('@Subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    AsyncStorage.getItem('@Subscriptions').then((value) => {
      if (value) {
        setSubscriptions(JSON.parse(value));
      }
    });
  }, []);

  return (
    <SubscriptionsContext.Provider
      value={{
        subscriptions,
        updateSubscription,
        addSubscription,
        deleteSubscription,
      }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
};

SubscriptionsContextProvider.displayName = 'SubscriptionsContextProvider';

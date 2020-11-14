import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View as NativeView,
} from 'react-native';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { FrequencyUnit, Subscription } from '../types';
import { normalizePrice } from '../utils/normalize-price';
import { SwipeableRow } from './Swipeable';
import { Text } from './Themed';

export function SubscriptionList() {
  const { subscriptions } = useSubscriptions();
  const [unit, nextUnit] = useFrequencyUnits();
  const theme = useTheme();

  const renderItem: ListRenderItem<Subscription> = ({ item }) => (
    <Item
      item={item}
      formatAmount={(item: Subscription) =>
        normalizePrice(
          item.amount,
          item.frequencyAmount || 1,
          item.frequencyUnit || 'month',
          unit
        ).toFixed(2)
      }
    />
  );

  const amount = useMemo(
    () =>
      subscriptions.reduce(
        (acc, sub) =>
          acc +
          normalizePrice(
            sub.amount,
            sub.frequencyAmount || 1,
            sub.frequencyUnit || 'month',
            unit
          ),
        0
      ),
    [subscriptions, unit]
  );

  return (
    <>
      <FlatList
        data={subscriptions}
        renderItem={renderItem}
        keyExtractor={({ name }) => name}
      />
      <Pressable
        style={{ ...styles.footer, backgroundColor: theme.colors.card }}
        onPress={nextUnit}
      >
        <Text style={styles.footerTotal}>
          Total <Text style={styles.footerUnit}>per {unit}</Text>
        </Text>
        <Text style={styles.footerAmount}>{amount.toFixed(2)} €</Text>
      </Pressable>
    </>
  );
}

const nextUnit: Record<FrequencyUnit, FrequencyUnit> = {
  day: 'week',
  week: 'month',
  month: 'year',
  year: 'day',
};

function useFrequencyUnits(): [FrequencyUnit, () => void] {
  const [unit, setUnit] = useState<FrequencyUnit>('month');
  const moveToNextUnit = () => setUnit((unit) => nextUnit[unit]);

  return [unit, moveToNextUnit];
}

interface ItemProps {
  item: Subscription;
  formatAmount: (s: Subscription) => string;
}

function Item({ item, formatAmount }: ItemProps) {
  const { deleteSubscription } = useSubscriptions();
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <SwipeableRow
      leftAction={{
        text: 'Delete',
        backgroundColor: 'red',
        callback: () =>
          Alert.alert(
            'Confirm deletion',
            'Are you sure you want to delete the subscription?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteSubscription(item.id),
              },
            ]
          ),
      }}
      rightActions={[]}
    >
      <Pressable
        style={({ pressed }) => ({
          ...styles.itemContainer,
          backgroundColor: pressed
            ? theme.colors.card
            : theme.colors.background,
        })}
        onPress={() => navigation.navigate('Details', { item, type: 'edit' })}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatAmount(item)} €</Text>
      </Pressable>
    </SwipeableRow>
  );
}

const styles = StyleSheet.create({
  item: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemPrice: {
    fontSize: 20,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  footerTotal: {
    fontSize: 25,
    fontWeight: '500',
  },
  footerUnit: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  footerAmount: {
    fontSize: 20,
  },
});

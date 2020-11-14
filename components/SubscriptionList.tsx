import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View as NativeView,
} from 'react-native';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Subscription } from '../types';
import { SwipeableRow } from './Swipeable';
import { Text } from './Themed';

export function SubscriptionList() {
  const { subscriptions } = useSubscriptions();
  const renderItem: ListRenderItem<Subscription> = ({ item }) => (
    <Item item={item} />
  );

  return (
    <FlatList
      data={subscriptions}
      renderItem={renderItem}
      keyExtractor={({ name }) => name}
    />
  );
}

interface ItemProps {
  item: Subscription;
}

function Item({ item }: ItemProps) {
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
          padding: 20,
          backgroundColor: pressed
            ? theme.colors.card
            : theme.colors.background,
        })}
        onPress={() => navigation.navigate('Details', { item, type: 'edit' })}
      >
        <NativeView style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.amount} €</Text>
        </NativeView>
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
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemPrice: {
    fontSize: 18,
  },
});

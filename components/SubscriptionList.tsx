import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { Subscription } from '../types';
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
    <Swipeable
      containerStyle={{ ...styles.item, borderColor: theme.colors.border }}
      renderLeftActions={() => <Text style={styles.leftAction}>Delete</Text>}
      onSwipeableLeftOpen={() =>
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
        )
      }
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
        <Text style={styles.itemName}>{item.name}</Text>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftAction: {
    textAlignVertical: 'center',
    height: '100%',
    fontSize: 20,
    color: 'red',
    marginHorizontal: 12,
    paddingVertical: 20,
  },
});

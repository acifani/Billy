import React from 'react';
import { StyleSheet } from 'react-native';
import { SubscriptionList } from '../components/SubscriptionList';
import { View } from '../components/Themed';

export default function SubscriptionsScreen() {
  return (
    <View style={styles.container}>
      <SubscriptionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

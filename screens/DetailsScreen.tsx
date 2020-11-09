import React from 'react';
import { StyleSheet } from 'react-native';
import SubscriptionDetails from '../components/SubscriptionDetails';
import { View } from '../components/Themed';

export default function Details() {
  return (
    <View style={styles.container}>
      <SubscriptionDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
});

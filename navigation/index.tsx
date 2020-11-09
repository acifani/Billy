import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, ColorSchemeName, View } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={({ navigation }) => ({
          title: 'My Subscriptions',
          headerRight: () => {
            return (
              <View style={{ marginRight: 8 }}>
                <Button
                  title="Add"
                  onPress={() =>
                    navigation.navigate('Details', { type: 'create' })
                  }
                />
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerBackTitle: 'Subs' }}
      />
    </Stack.Navigator>
  );
}

import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { TABNAVIGATOR } from '../utils/routes';
import TabNavigator from './tabNavigator';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
   
      <Stack.Navigator
      screenOptions={
        {
          headerShown:false
        }
      }
      >
        <Stack.Screen name={TABNAVIGATOR} component={TabNavigator} />
      </Stack.Navigator>

  );
};

export default RootNavigator;

const styles = StyleSheet.create({});

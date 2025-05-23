import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ADDNEWCONTACT, CONTACTS, FAVORITES, RESENTS} from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';
import TabBarIcon from '../components/router/tabBarIcon';
import Icon from '@react-native-vector-icons/ionicons';
import Colors from '../theme/colors';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
     initialRouteName={CONTACTS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => (
          <TabBarIcon name={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#344CB7',
        tabBarInactiveTintColor: '#cccc',
      })}>
      <Tab.Screen name={RESENTS} component={Resents} />
      <Tab.Screen
     
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              style={{marginRight: 15}}
              onPress={() => navigation.navigate(ADDNEWCONTACT)}>
              <Icon name="add" size={30} color={Colors.GREEN} />
            </Pressable>
          ),
        })}
        name={CONTACTS}
        component={Contacts}
      />
      <Tab.Screen name={FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

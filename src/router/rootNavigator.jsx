import { Alert, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDNEWCONTACT,
  CALLING,
  CONTACTDETAIL,
  TABNAVIGATOR,
  UPDATECONTACT,
} from '../utils/routes';
import TabNavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import Colors from '../theme/colors';
import Calling from '../screens/calling';
import AddContact from '../screens/contacts/addContact';
import Icon from '@react-native-vector-icons/ionicons';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../store/actions/contactActions';
import UpdateContact from '../screens/contacts/updateContact';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch =useDispatch()

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Geri',
        headerTintColor: Colors.BLACK,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TABNAVIGATOR}
        component={TabNavigator}
      />
      <Stack.Screen
        options={({navigation,route}) => ({
          headerRight: () => (
            <View style={{flexDirection:"row"}}>
              <Pressable
                style={{marginRight: 15}}
                onPress={() => {
                  dispatch(deleteContact(route.params.contact.id));
                  Alert.alert("Kişi Rehberden Silindi")
                  navigation.goBack()
                  }}>
                <Icon name="trash" size={25} color={Colors.RED} />
              </Pressable>
              <Pressable
                style={{marginRight: 15}}
                onPress={() => navigation.navigate(UPDATECONTACT,{contact:route.params.contact})}>
                <Icon name="create" size={25} color={Colors.BLUE} />
              </Pressable>
            </View>
          ),
        })}
        name={CONTACTDETAIL}
        component={ContactDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={CALLING}
        component={Calling}
      />
      <Stack.Screen name={ADDNEWCONTACT} component={AddContact} />
      <Stack.Screen name={UPDATECONTACT} component={UpdateContact} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});

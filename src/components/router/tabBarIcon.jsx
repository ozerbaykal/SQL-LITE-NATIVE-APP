import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CONTACTS, FAVORITES, RESENTS} from '../../utils/routes';
import Icon from '@react-native-vector-icons/ionicons';

const TabBarIcon = ({name, focused, size, color}) => {
  switch (name) {
    case RESENTS:
      return <Icon name="time" size={size} color={color}/>;
    case CONTACTS:
      return <Icon name="person" size={size}  color={color} />;
    case FAVORITES:
      return <Icon name="star" size={size}  color={color} />;

    default:
      return <Icon name="heart" size={size}  color={color}/>;
  }
};

export default TabBarIcon;

const styles = StyleSheet.create({});

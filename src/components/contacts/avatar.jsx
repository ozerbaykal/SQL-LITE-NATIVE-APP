import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getInitials} from '../../utils/functions';
import {Colors} from '../../theme/colors';

const Avatar = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{getInitials(item.name, item.surname)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 55,
    backgroundColor: '#44d421',
    height: 55,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.WHİTE,
  },
});

import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { convertFullName } from '../../utils/functions';
import { Colors } from '../../theme/colors';
import Avatar from './avatar';

const ContactItem = ({item}) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar item={item}/>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {convertFullName(item.name,item.surname)}
        </Text>
        <Text style={styles.job}>{item.job}</Text>
      </View>
    </Pressable>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    marginTop:5
    
    
  },
  name:{
    fontSize:18,
    fontWeight:"700",
    margin:5,
    color:Colors.BLACK

  },
  job:{
    fontSize:14,

    fontWeight:"700",
    color:Colors.GRAY,
    margin:5,

  },
  infoContainer:{
    flex:4
  },
  avatarContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});

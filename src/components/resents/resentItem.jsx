import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {convertFullName} from '../../utils/functions';
import Colors from '../../theme/colors';
import Avatar from '../contacts/avatar';
import {sizes} from '../../utils/constants';
import Icon from '@react-native-vector-icons/ionicons';

const ResentItem = ({item}) => {
  const [user, setUser] = useState();

  const db = SQLite.openDatabase({
    name: 'ContactsDataBase',
    location: 'default',
  });

  const getUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM users WHERE id = ${item.resent_id}`,
        [],
  (sqlTxn, res) => {
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
            setUser(item)
            }
          }else{
            setUser(undefined)
          }
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        {user && <Avatar item={user} size={sizes.SMALL} />}
        
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {user ? convertFullName(user?.name, user?.surname) : null}
        </Text>
        <Text style={styles.job}>{item.date}</Text>
      </View>

      <View style={styles.callTypeContainer}>
        {item?.callType == 'incoming' ? (
          <Icon name="arrow-undo-outline" size={30} color={Colors.RED} />
        ) : (
          <Icon name="arrow-redo-outline" size={30} color={Colors.GREEN} />
        )}
      </View>
    </Pressable>
  );
};

export default ResentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    margin: 5,
    color: Colors.BLACK,
  },
  job: {
    fontSize: 14,

    fontWeight: '700',
    color: Colors.GRAY,
    margin: 5,
  },
  infoContainer: {
    flex: 4,
    marginHorizontal: 10,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callTypeContainer: {
    marginHorizontal: 10,
  },
});

import {View, Text} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const Contacts = () => {
  useEffect(() => {
    const createContactsTable = async () => {
      try {
        const db = await SQLite.openDatabase({name: 'ContactsDataBase', location: 'default'});
        await db.transaction(async txn => {
          await txn.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name VARCHAR(100),
              surname VARCHAR(100),
              phone INTEGER,
              email VARCHAR(50),
              job VARCHAR(500)
            );`
          );
          console.log('Tablo oluşturuldu');
        });
      } catch (error) {
        console.log('SQLite Hatası:', error);
      }
    };

    console.log('Contacts mount oldu');
    createContactsTable();
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <Text>Contacts</Text>
    </View>
  );
};

export default Contacts;

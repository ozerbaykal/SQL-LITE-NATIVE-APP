import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import ContactItem from '../../components/contacts/contactItem';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts, setPending} from '../../store/slice/contactSlice';
import Colors from '../../theme/colors';
import { CONTACTDETAIL } from '../../utils/routes';
import { useIsFocused } from '@react-navigation/native';

SQLite.enablePromise(false);

const db = SQLite.openDatabase({
  name: 'ContactsDataBase',
  location: 'default',
});

const Contacts = () => {
  const {contacts, pending} = useSelector(state => state.contacts);
  const dispatch = useDispatch();
    const isFocused = useIsFocused();

  //tablo columbları değişirse
  // const dropTable = () => {
  //   db.transaction(txn => {
  //     txn.executeSql(
  //       'DROP TABLE IF EXISTS resents',
  //       [],
  //       () => {
  //         console.log('users tablosu silindi');
  //       },
  //       error => {
  //         console.log('Drop Hatası:', error.message);
  //       },
  //     );
  //   });
  // };
  const createContactsTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), surname VARCHAR(100), phone INTEGER, email VARCHAR(50),adress VARCHAR(500), job VARCHAR(30))',
        [],
        (sqlTxn, res) => {
          console.log('Tablo oluşturuldu');
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };
  const createResentsTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS calls(id INTEGER PRIMARY KEY AUTOINCREMENT,date VARCHAR(100),resent_id INTEGER,callType VARCHAR(20))',
        [],
        (sqlTxn, res) => {
          console.log('Calls tablosu oluşturuldu');
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };

  const getContacts = () => {
    dispatch(setPending(true))
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users',
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            const temp = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              temp.push(item);
            }
            dispatch(setContacts(temp));
          } 
          dispatch(setPending(false))

        },
        error => {
          console.log('Hata:', error.message)
          dispatch(setPending(false))
        },
      );
    });
  };

   useEffect(() => {
    if (isFocused) {
      createContactsTable();
      createResentsTable();
      getContacts();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   //dropTable()
  //   createContactsTable();
  //   createResentsTable();
  //   getContacts();
  // }, []);

  return (
    <View style={defaultScreenStyle.container}>
      {pending ? (
        <ActivityIndicator color={Colors.GRAY} />
      ) : (
        <FlatList
          ListEmptyComponent={<Text>Henüz bit kayıt yok </Text>}
          data={contacts}
          renderItem={({item}) => <ContactItem item={item} />}
        />
      )}

      
    </View>
  );
};
export default Contacts;

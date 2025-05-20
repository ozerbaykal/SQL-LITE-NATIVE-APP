import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import Icon from '@react-native-vector-icons/ionicons';
import ContactItem from '../../components/contacts/contactItem';
import { getResents } from '../resents/getResentHelper';

SQLite.enablePromise(false);

const db = SQLite.openDatabase({
  name: 'ContactsDataBase',
  location: 'default',
});

const Contacts = () => {
  const [users, setUsers] = useState([]);

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
            setUsers(temp);
          } else {
            setUsers([]);
          }
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };

  const addNewContact = (name, surname, phone, email, adress, job) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (name,surname,phone,email,adress,job) VALUES(?,?,?,?,?,?)',
        [name, surname, phone, email, adress, job],
        (sqlTxn, res) => {
          console.log('kişi eklendi');
          getContacts();
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };

  useEffect(() => {
    //dropTable()
    createContactsTable();
    createResentsTable()
    getContacts();
  
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={users}
        renderItem={({item}) => <ContactItem item={item} />}
      />
      <TouchableOpacity
        onPress={() =>
          addNewContact(
            'demir',
            'baykal',
            '5084888d',
            'baykal@gmail.com',
            'istanbul',
            'mobile developer',
          )
        }
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: 'green',
          padding: 20,
          borderRadius: 100,
        }}>
        <Icon name="add" size={30} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};
export default Contacts;

import {View, Text, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {useEffect, useState} from 'react';
import ResentItem from '../../components/resents/resentItem';

const Resents = () => {
  const db = SQLite.openDatabase({
    name: 'ContactsDataBase',
    location: 'default',
  });
  const [resents, setResents] = useState([]);

  const getResents = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM calls',
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            const temp = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              temp.push(item);
            }
            setResents(temp);
          } else {
            setResents([]);
          }
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };

  useEffect(() => {
    getResents();
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={resents}
        renderItem={({item}) => <ResentItem item={item}/>}
      />
    </View>
  );
};

export default Resents;

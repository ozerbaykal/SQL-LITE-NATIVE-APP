import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import Avatar from '../../components/contacts/avatar';
import {convertFullName} from '../../utils/functions';
import {height, size, sizes, width} from '../../utils/constants';
import Colors from '../../theme/colors';
import CircleIconButton from '../../components/ui/circleIconButton';
import Icon from '@react-native-vector-icons/ionicons';
import {CALLING} from '../../utils/routes';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {setContacts, setPending} from '../../store/slice/contactSlice';
import {useDispatch, useSelector} from 'react-redux';

const ContactDetail = ({route, navigation}) => {
  // const route = useRoute()
  //      const {contact} = route.params
  const {contacts, pending} = useSelector(state => state.contacts);

  const [currentContact, setCurrentContact] = useState(contact); // ilk hali route'tan gelsin

  const {contact} = route.params;

  const db = SQLite.openDatabase({
    name: 'ContactsDataBase',
    location: 'default',
  });
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const addNewCall = (date, resent_id, callType) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO calls (date,resent_id,callType) VALUES(?,?,?)',
        [date, resent_id, callType],
        (sqlTxn, res) => {
          console.log('arama eklendi');
        },
        error => {
          console.log('Hata:', error.message);
        },
      );
    });
  };
  const getContacts = () => {
    dispatch(setPending(true));
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
          dispatch(setPending(false));
        },
        error => {
          console.log('Hata:', error.message);
          dispatch(setPending(false));
        },
      );
    });
  };

  const handleCall = () => {
    const now = new Date().toDateString();
    addNewCall(now, currentContact.id, 'outcoming');
    navigation.navigate(CALLING, {contact: currentContact});
  };
  useEffect(() => {
    if (isFocused) {
      const updated = contacts.find(item => item.id === contact.id);
      if (updated) {
        setCurrentContact(updated); // 👈 güncel bilgi buraya geliyor
      }
    }
  }, [contacts, isFocused]);

  if (!currentContact) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar item={currentContact} size={sizes.MEDIUM} />
          <Text style={styles.fullName}>
            {convertFullName(currentContact?.name, currentContact?.surname)}
          </Text>
          <Text style={styles.job}>{currentContact?.job}</Text>
        </View>

        <Pressable style={styles.buttonContainer}>
          <CircleIconButton
            color={Colors.GREEN}
            icon={
              <Icon name="chatbox-ellipses" size={30} color={Colors.WHITE} />
            }
          />
          <CircleIconButton
            color={Colors.PURPLE}
            icon={<Icon name="chatbubble" size={30} color={Colors.WHITE} />}
          />
          <CircleIconButton
            onPress={handleCall}
            color={Colors.BLUE}
            icon={<Icon name="call" size={30} color={Colors.WHITE} />}
          />
        </Pressable>

        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.info}>{currentContact?.name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Surname</Text>
            <Text style={styles.info}>{currentContact?.surname}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={styles.info}>{currentContact?.phone}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.info}>{currentContact?.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Adress</Text>
            <Text style={styles.info}>{currentContact?.adress}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Job</Text>
            <Text style={styles.info}>{currentContact?.job}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    height: height * 0.2,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fullName: {
    fontSize: 16,
    fontWeight: '700',
  },
  job: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  infoContainer: {
    backgroundColor: Colors.SOFTGRAY,
    borderRadius: 8,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    height: height * 0.08,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.GRAY,
  },
  info: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
    color: Colors.BLACK,
  },
});

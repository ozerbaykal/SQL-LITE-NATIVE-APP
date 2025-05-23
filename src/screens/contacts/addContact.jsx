import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {Formik} from 'formik';
import {Input, Button} from '@ui-kitten/components';
import {newContactSchema} from '../../utils/schemas';
import Colors from '../../theme/colors';
import SQLite from 'react-native-sqlite-storage';
import { setContacts, setPending } from '../../store/slice/contactSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CONTACTS } from '../../utils/routes';


const AddContact = () => {
  const db = SQLite.openDatabase({
    name: 'ContactsDataBase',
    location: 'default',
  });
  
 const dispatch=  useDispatch()

   const addNewContact = (values) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (name,surname,phone,email,adress,job) VALUES(?,?,?,?,?,?)',
        [values.name, values.surname, values.phone, values.email, values.adress, values.job],
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
  
   const navigation = useNavigation()
 
  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <Formik
          initialValues={{
            name: 'Can',
            surname: 'Gürdal',
            email: 'can@gmail.com',
            phone: '55555555554',
            adress: 'istanbul/Tuzla',
            job: 'Vilada mop üreticisi',
          }}
          validationSchema={newContactSchema}
          onSubmit={values => addNewContact(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.name ? 'danger' : 'basic'}
                caption={errors.name}
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                size="medium"
                placeholder="Name"
                label="Name"
              />
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.surname ? 'danger' : 'basic'}
                caption={errors.surname}
                style={styles.input}
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                value={values.surname}
                size="medium"
                placeholder="Surname"
                label="Surname"
              />
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.email ? 'danger' : 'basic'}
                caption={errors.email}
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                size="medium"
                placeholder="Email"
                label="Email"
              />
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.phone ? 'danger' : 'basic'}
                caption={errors.phone}
                style={styles.input}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                size="medium"
                placeholder="Phone"
                label="Phone"
              />
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.adress ? 'danger' : 'basic'}
                caption={errors.adress}
                style={styles.input}
                onChangeText={handleChange('adress')}
                onBlur={handleBlur('adress')}
                value={values.adress}
                size="medium"
                placeholder="Adress"
                label="Adress"
              />
              <Input
                textStyle={{color: Colors.BLACK}}
                status={errors.job ? 'danger' : 'basic'}
                caption={errors.job}
                style={styles.input}
                onChangeText={handleChange('job')}
                onBlur={handleBlur('job')}
                value={values.job}
                size="medium"
                placeholder="Job"
                label="Job"
              />
              <Button style={styles.button} onPress={()=>{
                handleSubmit();
                navigation.goBack()
                Alert.alert("Kiş Eklendi")
              }}>
                Save
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: 'none',
  },
  button: {
    marginVertical: 30,
  },
});

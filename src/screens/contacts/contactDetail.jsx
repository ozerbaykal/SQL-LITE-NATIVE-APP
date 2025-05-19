import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import Avatar from '../../components/contacts/avatar';
import {convertFullName} from '../../utils/functions';
import {height, size, sizes, width} from '../../utils/constants';
import Colors from '../../theme/colors';
import CircleIconButton from '../../components/ui/circleIconButton';
import Icon from '@react-native-vector-icons/ionicons';
import { CALLING } from '../../utils/routes';

const ContactDetail = ({route,navigation}) => {
  // const route = useRoute()
  //      const {contact} = route.params

  const {contact} = route.params;

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar item={contact} size={sizes.MEDIUM} />
          <Text style={styles.fullName}>
            {convertFullName(contact.name, contact.surname)}
          </Text>
          <Text style={styles.job}>{contact.job}</Text>
        </View>

        <Pressable style={styles.buttonContainer} >
          <CircleIconButton
            color={Colors.GREEN}
            icon={<Icon name="chatbox-ellipses" size={30} color={Colors.WHITE} />}
          />
          <CircleIconButton
            color={Colors.PURPLE}
            icon={<Icon name="chatbubble" size={30} color={Colors.WHITE}  />}
          />
          <CircleIconButton
            onPress={()=>navigation.navigate(CALLING,{contact:contact})}
            color={Colors.BLUE}
            icon={<Icon name="call" size={30} color={Colors.WHITE}  />}
          />
        </Pressable>
        <View >
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Name</Text>
                <Text style={styles.info}>{contact.name}</Text>

            </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Surname</Text>
                <Text style={styles.info}>{contact.surname}</Text>

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Phone</Text>
                <Text style={styles.info}>{contact.phone}</Text>

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Email</Text>
                <Text style={styles.info}>{contact.email}</Text>

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Adress</Text>
                <Text style={styles.info}>{contact.adress}</Text>

            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Job</Text>
                <Text style={styles.info}>{contact.job}</Text>

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
  infoContainer:{
    backgroundColor:Colors.SOFTGRAY,
    borderRadius:8,
    margin:5,
    padding:10,
    justifyContent:"center",
    height:height*0.08


  },
  infoTitle:{
    fontSize:16,
    fontWeight:"500",
    color:Colors.GRAY
  },
  info:{
    fontSize:16,
    marginTop:5,
    fontWeight:"500",
    color:Colors.BLACK

  }
});

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {useRoute} from '@react-navigation/native';
import Avatar from '../../components/contacts/avatar';
import {convertFullName} from '../../utils/functions';
import { height, size, sizes, width } from '../../utils/constants';
import Colors from '../../theme/colors';
import CircleIconButton from '../../components/ui/circleIconButton';

const ContactDetail = ({route}) => {
  // const route = useRoute()
  //      const {contact} = route.params

  const {contact} = route.params;

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar item={contact} size={sizes.MEDIUM} />
          <Text style={styles.fullName}>{convertFullName(contact.name, contact.surname)}</Text>
          <Text style={styles.job}>{contact.job}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
            <CircleIconButton color='red'/>
            <CircleIconButton color='green'/>
            <CircleIconButton color='blue'/>

        </View>
      </ScrollView>
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
    userContainer:{
        alignItems:"center",
        height:height*0.2,
        justifyContent:"center",

        
        

    },
     buttonContainer:{
        alignItems:"center",
        height:height*0.1,
        flexDirection:"row",
        justifyContent:"space-evenly",
   

    },
    fullName:{
        fontSize:16,
        fontWeight:"700"

    },
    job:{
        fontSize:14,
        color:Colors.GRAY

    }
});

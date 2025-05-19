import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import Icon from '@react-native-vector-icons/ionicons'
import CircleIconButton from '../../components/ui/circleIconButton'
import Colors from '../../theme/colors'
import Avatar from '../../components/contacts/avatar'
import { sizes } from '../../utils/constants'
import { convertFullName } from '../../utils/functions'

const Calling = ({route,navigation}) => {
  const {contact} = route.params
  return (
    <View style={styles.container}>
      
      <View style={styles.infoContainer}>
        <Avatar item ={contact} size={sizes.LARGE}/>
        <Text style={styles.fullName}>{convertFullName(contact.name,contact.surname)}</Text>
       
        <Text style={styles.calling}>Calling...</Text>


      </View>
      
      <View style={styles.buttons}>
        <CircleIconButton onPress={()=>navigation.goBack()} color={Colors.GREEN} icon={<Icon name="call" size={30} color={Colors.WHITE}/>} />
        <CircleIconButton onPress={()=>navigation.goBack()} color={Colors.RED} icon={<Icon name="call" size={30} color={Colors.WHITE}/>} />
        

        
      </View>
      
      
 
    </View>
  )
}

export default Calling

const styles = StyleSheet.create({
  container:{
    flex:1,
  backgroundColor:Colors.SOFTGRAY

  },
  fullName:{
    fontSize:23,
    fontWeight:"700",
    color:Colors.BLACK,
    marginTop:10
  },
  buttons:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginTop:5,
    alignItems:"center"


  },
  infoContainer:{
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:Colors.BLUE,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
    

  },
  calling:{
    position:"absolute",
    bottom:30,
    fontSize:30,
    color:Colors.WHITE,
    fontWeight:"500"
    
  }
})
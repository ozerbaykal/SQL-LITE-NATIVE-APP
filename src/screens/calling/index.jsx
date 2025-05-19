import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultScreenStyle from '../../styles/defaultScreenStyle'
import Icon from '@react-native-vector-icons/ionicons'
import CircleIconButton from '../../components/ui/circleIconButton'
import Colors from '../../theme/colors'
import Avatar from '../../components/contacts/avatar'
import { sizes } from '../../utils/constants'
import { convertFullName } from '../../utils/functions'

const Calling = ({route}) => {
  const {contact} = route.params
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Avatar item ={contact} size={sizes.LARGE}/>
        <Text style={styles.fullName}>{convertFullName(contact.name,contact.surname)}</Text>


      </View>
      
      <View style={styles.container}>

        
      </View>
      
      
 
    </View>
  )
}

export default Calling

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:Colors.SOFTGRAY

  },
  fullName:{
    fontSize:18,
    fontWeight:"700"
  }

})
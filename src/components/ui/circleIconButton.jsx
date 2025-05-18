import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../utils/constants'
import Colors from '../../theme/colors'

const CircleIconButton = (props) => {
    const {color=Colors.GRAY,icon} = props
  return (
    <Pressable {...props} style={[styles.container,{backgroundColor:color}]}>
      <Text>{icon}</Text>
    </Pressable>
  )
}

export default CircleIconButton

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        width:width*0.15,
        height:width*0.15,
        borderRadius:100
    }
})
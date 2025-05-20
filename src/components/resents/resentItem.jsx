import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResentItem = ({item}) => {
  return (
    <View>
      <Text>{item.resent_id}</Text>
    </View>
  )
}

export default ResentItem

const styles = StyleSheet.create({})
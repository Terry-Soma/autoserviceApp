import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from 'react'

const Spinner = () => {
  return (
    <View>
     <ActivityIndicator size="large" color="#333"/>
      <Text>Spinner</Text>
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({})
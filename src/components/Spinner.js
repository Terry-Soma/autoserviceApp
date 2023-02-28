import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from 'react'

const Spinner = ({ showText = true, circleColor = "#fff" }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 10, }}>
      <ActivityIndicator size="large" color={circleColor} />
      {showText && (
        <Text style={{ top: 10, fontWeight: "bold", fontSize: 18, }}>
          Түр хүлээнэ үү...
        </Text>
      )}
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({})
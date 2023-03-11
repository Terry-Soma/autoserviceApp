import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from 'react'

const Spinner = ({ showText = true, circleColor = "#2C3E50", textStyle = {} }) => {
  return (
    <View style={{ marginVertical: 10, flex: 1, alignSelf: "center", justifyContent: "center" }}>

      {showText && (
        <Text style={[textStyle, { top: 10, fontWeight: "bold", fontSize: 18, }]}>
          Түр хүлээнэ үү...
        </Text>

      )}
      <ActivityIndicator size="large" color={textStyle?.color ? textStyle.color : circleColor} style={{ top: 10 }} />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({})
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
// import { SafeAreaView } from "react-native-safe-area-context";

export default function AddProduct() {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={{ height: 200, width: "100%", backgroundColor: "tomato" }}>
        <Text>AddProduct</Text>
      </View>
      <ScrollView style={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#333",
      }}>
        {/* image picker */}
        {/* information  */}

      </ScrollView>
    </SafeAreaView>
  )
}
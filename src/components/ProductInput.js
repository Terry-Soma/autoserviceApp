import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function (props) {
  return (
    <View style={{ flex: 1, backgroundColor: "grey", margin: 2, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
      <View style={{ flex: 1 }}>

        <Text style={{ fontWeight: 300 }}>{props.title}</Text>
      </View>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
        style={[css.inputField, props.style]}
        value={props.value}
      />
    </View>
  );
}

const css = StyleSheet.create({
  inputField: {
    flex: 3,
    borderRadius: 12,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10
  }
});

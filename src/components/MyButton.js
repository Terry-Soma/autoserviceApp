import React from "react";
import { View, Button, StyleSheet, Pressable, Text } from "react-native";

export default function ({ mode, onPress, style, children }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && css.pressed}
        android_ripple={{ color: "#333" }}
      >
        <View style={[css.button, mode === 'flat' && css.flat]}>
          <Text style={[css.buttonText, mode === 'flat' && css.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const css = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ECECEC",
    borderRadius: 4,
  },
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#3498DB",
    margin: 8
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }, flatText: {
    color: "#245aaa",
  },
});

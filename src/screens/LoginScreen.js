
import React, { useState } from "react";

import { Alert, SafeAreaView, View } from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';
import { fontVar, restUrl } from "../../Constants";
import axios from "axios";

export default function LoginScreen() {
  const [phone, setPhone] = useState(null)
  const [pass, setPass] = useState(null)
  const [isPassReveal, setIsPassReveal] = useState(true)
  const [loading, setLoading] = useState(false)
  const handleLogin = async () => {
    console.log('phone', phone)
    console.log('pass', pass)
    try {
      const result = await axios.post(restUrl + "/api/auth/login", {
        phone, pass
      });
      console.log('result', result.data)

    } catch (error) {
      // error
      console.log('result', error.response.data.message)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{
        marginVertical: 10,
        padding: 2,
        marginHorizontal: 12,
        justifyContent: "center"
      }}>
        <Text variant="titleLarge" style={{ textAlign: "center", marginVertical: 12, fontFamily: fontVar.Mont.m }} >Нэвтрэх хэсэг</Text>
        <TextInput
          label="Дугаар"
          right={<TextInput.Icon icon="phone" />}
          value={phone}
          onChangeText={setPhone}
        />
        <View style={{ marginVertical: 12 }}></View>
        <TextInput
          label="Нууц үг"
          secureTextEntry={isPassReveal}
          right={<TextInput.Icon icon="eye" onPress={() => setIsPassReveal(prev => !prev)} />}
          value={pass}
          onChangeText={setPass}
        />
        <View style={{ marginVertical: 6 }}></View>

        <Button icon="login" mode="contained" onPress={handleLogin}>
          Нэвтрэх
        </Button>
      </View>
    </SafeAreaView >
  )
}
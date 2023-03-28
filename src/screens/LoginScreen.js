
import React, { useContext, useState } from "react";

import { Alert, SafeAreaView, View } from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';
import { fontVar, restUrl } from "../../Constants";
import ErrorText from "../components/ErrorText";
import UserContext from "../context/userContext";

export default function LoginScreen() {
  const userState = useContext(UserContext)
  const [phone, setPhone] = useState(null)
  const [pass, setPass] = useState(null)
  const [isPassReveal, setIsPassReveal] = useState(true)

  const handleLogin = () => {
    if (!phone) {
      Alert.alert("Та дугаараа оруулна уу");
      return;
    }
    if (!pass) {
      Alert.alert("Та нууц үгээ оруулна үү");
      return;
    }
    userState.Login(phone, pass)
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
        <ErrorText errorMsg={userState.error} />
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
        <ErrorText errorMsg={userState.error} />
        <Button icon="login" mode="contained" onPress={handleLogin} loading={userState.loading}>
          Нэвтрэх
        </Button>
      </View>
    </SafeAreaView >
  )
}
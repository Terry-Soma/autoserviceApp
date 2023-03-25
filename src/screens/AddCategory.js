import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useLayoutEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import MyButton from '../components/MyButton';
import axios from 'axios';
import { restUrl } from './../../Constants';
import { CommonActions } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
export default function AddCategory() {
  const [name, setName] = useState(null)
  const saveCategory = async () => {
    try {
      const result = await axios.create(`${restUrl}/api/categories`, { ner: name });
      result.status === 201 && navigation.navigate("ManageCategory", { createdCat: result.data.data })
    } catch (error) {
      console.log('err', error.response.data.message)

    }
  }
  const deleteNumber = () => {

  }
  return (
    <SafeAreaView style={{ backgroundColor: "#ccc", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{
        flex: 1,
        padding: 24,
        backgroundColor: "#f3f3f3",
        borderRadius: 12,
        margin: 12
      }}>
        <View style={{ flexDirection: 'row', alignItems: "center", }}>
          <Feather name="layers" size={24} color="black" />
          <View style={{ marginLeft: 22 }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#213344", letterSpacing: 1 }}>Категорийн нэр</Text>
          </View>
        </View>
        <TextInput
          autoComplete="off"
          autoCapitalize='words'
          defaultValue={name}
          value={name}
          onChangeText={setName}
          style={{
            marginLeft: 4,
            color: "#05375a",
            flex: 1,
            marginTop: Platform.OS === "ios" ? 0 : 10,
            borderBottomColor: "orange",
            borderBottomWidth: 2,
            fontSize: 18
          }} />


        <View style={{ marginTop: 28, flexDirection: "row", justifyContent: "space-evenly" }}>
          <MyButton style={{
            minWidth: 120,
            marginHorizontal: 8,
          }}
            onPress={() => {
              navigation.goBack()
            }}
          >Буцах</MyButton>
          <MyButton style={{
            minWidth: 120,
            marginHorizontal: 8,
          }} onPress={saveCategory}>Хадгалах</MyButton>
        </View>
        <Pressable
          onPress={deleteNumber}
          style={({ pressed }) =>
            [{ alignSelf: "center", padding: 4, borderRadius: 12, backgroundColor: "#F1C40F" }, pressed && {
              opacity: 0.75,
              backgroundColor: "red",
              borderRadius: 4,
            }]
          }
          android_ripple={{ color: "#333" }}>
          <IconButton icon="trash-can" size={32} />
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  )
}
import { useLayoutEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons'; import { TextInput } from 'react-native';
import MyButton from '../components/MyButton';
import axios from 'axios';
import { restUrl } from './../../Constants';
import { CommonActions } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
function ManagePhoneInfoScreen({ route, navigation }) {

  const phone = route.params?.phone;
  const isEditing = !!phone;

  const [number, setNumber] = useState(phone ? phone.dugaar : "");
  const [name, setName] = useState(phone ? phone.ner : "")
  // boolean

  const savePhoneInfo = () => {
    console.log('number', number, 'ner', name, isEditing)
    if (isEditing) {
      axios.patch(`${restUrl}/api/calls/${phone.id}`, {
        ner: name,
        dugaar: number
      })
        .then(result => {
          console.log('resut', result.data)
          result.data.success === true && navigation.navigate("PhoneInfo", { refresh: true })
        })
        .catch(err => console.log('err', err.response)
        )
        .finally(() => { })
    } else {
      axios.post(`${restUrl}/api/calls/`, {
        ner: name,
        dugaar: number
      }).then(result => {
        console.log('resut', result.data)
        result.data.success === true && navigation.navigate("PhoneInfo", { refresh: true })
      })
        .catch(err => console.log('err', err.response)
        )
        .finally(() => { })
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Утасны мэдээлэл өөрчлөх' : 'Дугаар нэмэх',
    });
  }, [navigation, isEditing]);

  const deleteNumber = () => {
    axios.delete(`${restUrl}/api/calls/${phone.id}`)
      .then(result => {
        console.log('resut', result.status)
        console.log('result.status === 204 && result.data == undefined', result.status === 204 && result.data.data === undefined)

        result.status === 204 && navigation.navigate("PhoneInfo", { deletedPhone: phone })
      })
      .catch(err => console.log('err', err.response)
      )
      .finally(() => { })
  }
  return <SafeAreaView style={{ backgroundColor: "#ccc", flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false} style={{
      flex: 1,
      padding: 24,
      backgroundColor: "#f3f3f3",
      borderRadius: 12,
      margin: 12
    }}>
      <View style={{ flexDirection: 'row', alignItems: "center", }}>
        <Feather name="user" size={24} color="black" />
        <View style={{ marginLeft: 22 }}>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#213344", letterSpacing: 1 }}>Нэр</Text>
        </View>
      </View>
      <TextInput
        autoComplete="off"
        autoCapitalize='words'
        autoFocus={isEditing}
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

      <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 22 }}>
        <Feather name="phone-call" size={24} color="black" />
        <View style={{ marginLeft: 22 }}>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#213344", letterSpacing: 1 }}>Дугаар эсвэл данс</Text>
        </View>
      </View>
      <TextInput
        autoComplete="off"
        keyboardType='number-pad'
        autoCapitalize='words'
        defaultValue={number}
        value={number}
        onChangeText={setNumber}
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
        }} onPress={savePhoneInfo}>Хадгалах</MyButton>
      </View>
      {isEditing && (<Pressable
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

      </Pressable>)}

    </ScrollView>
  </SafeAreaView >;
}

export default ManagePhoneInfoScreen;

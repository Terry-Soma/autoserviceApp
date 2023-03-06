import React, { useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Button, TouchableOpacity, Alert, Linking, TextInput, ScrollView } from "react-native";
import { Text, IconButton, useTheme, Divider, } from "react-native-paper";
import { Avatar } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import { restUrl } from "../../../Constants";
import FormText from "../FormText";

import * as Animatable from "react-native-animatable";
const PhoneList = ({ calls, toastRef }) => {
  const [copiedText, setCopiedText] = useState('');
  const [phone, setPhone] = useState(null)
  const [ner, setNer] = useState(null)

  const addPhoneNumber = () => {
    console.log('phone', phone)
    axios.post(`${restUrl}/api/calls`, {
      ner, dugaar: phone
    }).then(result => console.log('res', result.data.data)
    ).catch(err => console.log('error', err?.response))

  }
  const copyToClipboard = async (val) => {
    const res = await Clipboard.setStringAsync(val)
    console.log('res', res)

    toastRef.current.show({ type: 'success', text: "Дугаар хуулагдлаа", duration: 1000 })
    // toast хуулагдлаа

  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  const theme = useTheme()

  const separatorComponent = () => {
    return <Divider bold style={{ marginHorizontal: 16, margin: 2 }} />
  }
  const footerComponent = () => {
    return <View style={{ paddingBottom: 12 }}>
    </View>
  }
  return (
    <View>


      {/* flatlist */}
      <FlatList data={calls}
        // ItemSeparatorComponent={separatorComponent}
        renderItem={({ item, index }) => (
          <View key={index} style={{
            marginHorizontal: 12, justifyContent: "space-between",
            flexDirection: "row", borderRadius: 12, padding: 12, backgroundColor: theme.colors.background
          }}>

            <View style={{
              justifyContent: "space-between",
            }}>
              <View style={{ flexDirection: "row" }}>
                <Avatar.Text size={48} label={item.ner[0]} color="#fff" />
                <View style={{ flexDirection: "column", alignItems: "flex-start", paddingLeft: 6 }}>
                  <Text variant="titleSmall" style={{ fontSize: 14 }}>{item.ner}</Text>
                  <Text variant="titleMedium" style={{ fontSize: 18 }}>{item.dugaar}</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", }}>
              <IconButton
                icon="content-copy"
                iconColor={theme.colors.textColor}
                size={24}
                mode="outlined"
                onPress={() => copyToClipboard(item.dugaar)}
              />
              {item.dugaar.length > 8 ? (
                null
              ) : (<IconButton
                icon="phone-outgoing-outline"
                iconColor={theme.colors.textColor}
                size={24}
                containerColor={theme.colors.accentColors[9]}
                mode="contained"
                onPress={() => Linking.openURL("tel:" + item.dugaar)}
              />)}
            </View>
          </View >
        )
        }
      />


      {/* <Button title="Дугаар нэмэх" onPress={addPhoneNumber} />
      <TextInput label="Дугаар"
        value={phone}
        onChangeText={text => setPhone(text)} keyboardType="number-pad"
        style={{ paddingBottom: 10 }}
      />
      <TextInput label="Дугаар"
        value={phone}
        onChangeText={text => setPhone(text)} keyboardType="number-pad"
        style={{ paddingBottom: 10 }}
      /> */}
    </View >
  )
}

export default PhoneList

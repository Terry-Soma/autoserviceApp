import React, { useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Button, TouchableOpacity, Alert, Linking, TextInput, ScrollView, Pressable } from "react-native";
import { Text, IconButton, useTheme, Divider, } from "react-native-paper";
import { Avatar } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from "@react-navigation/native";

const PhoneList = ({ calls, toastRef }) => {
  const theme = useTheme()
  const navigation = useNavigation();

  // const addPhoneNumber = () => {
  //   console.log('phone', phone)
  //   axios.post(`${restUrl}/api/calls`, {
  //     ner, dugaar: phone
  //   }).then(result => console.log('res', result.data.data)
  //   ).catch(err => console.log('error', err?.response))
  // }
  const copyToClipboard = async (val) => {
    const res = await Clipboard.setStringAsync(val)
    if (res) toastRef.current.show({ type: 'success', text: "Дугаар хуулагдлаа", duration: 1000 })
    else toastRef.current.show({ type: 'error', text: "Дугаар хуулах үед алдаа гарлаа", duration: 1000 })
    // toast хуулагдлаа

  };
  const _renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("ManagePhoneInfo", { phone: item })}
      style={({ pressed }) => pressed && css.pressed}
      android_ripple={{ color: "#333" }}
    >
      <View style={[css.phoneItemContainer, { backgroundColor: theme.colors.background }]}>
        <View style={{
          justifyContent: "space-between",
        }}>
          <View style={css.flexR}>
            <Avatar.Text size={48} label={item.ner[0].toUpperCase()} color="#fff" />
            <View style={{ flexDirection: "column", alignItems: "flex-start", paddingLeft: 6 }}>
              <Text variant="titleSmall" style={{ fontSize: 14 }}>{item.ner}</Text>
              <Text variant="titleMedium" style={{ fontSize: 18 }}>{item.dugaar}</Text>
            </View>
          </View>
        </View>

        <View style={css.flexR}>
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
    </Pressable>
  );

  const separatorComponent = () => {
    return <Divider bold style={{ margin: 2, marginHorizontal: 12 }} />
  }
  const footerComp = () => <View style={{ marginBottom: 4 }}></View>
  const headerComp = () => <View style={{ marginTop: 4 }}></View>
  return (
    <FlatList data={calls}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={separatorComponent}
      ListFooterComponent={footerComp}
      ListHeaderComponent={headerComp}
      ListEmptyComponent={<Text style={{ fontSize: 24, fontWeight: "500", color: "#2C3E50", width: "100%", textAlign: "center" }}>Хайсан дугаар олдсонгүй</Text>}
      renderItem={_renderItem}
    />
  )
}

export default PhoneList

const css = StyleSheet.create({
  phoneItemContainer: {
    marginHorizontal: 12, justifyContent: "space-between",
    flexDirection: "row", borderRadius: 12, padding: 12,
    marginBottom: 1,
    elevation: 3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  flexR: { flexDirection: "row" },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ECECEC",
    borderRadius: 4,
  },
})

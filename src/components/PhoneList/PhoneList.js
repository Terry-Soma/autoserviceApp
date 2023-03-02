import React, { useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Button, TouchableOpacity, Alert } from "react-native";
import { Text, IconButton, useTheme, Divider } from "react-native-paper";
import { Avatar } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
const PhoneList = ({ calls }) => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (val) => {
    await Clipboard.setStringAsync(val)
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
  // Clipboard.addClipboardListener(({ contentTypes }) => {
  //   if (contentTypes.includes(Clipboard.ContentType.PLAIN_TEXT)) {
  //     Clipboard.getStringAsync().then(content => {
  //       Alert.alert('Copy pasta! Here\'s the string that was copied: ' + content)
  //     });
  //   } else if (contentTypes.includes(Clipboard.ContentType.IMAGE)) {
  //     alert('Yay! Clipboard contains an image');
  //   }
  // });

  return (
    <View>
      {/* flatlist */}
      <FlatList data={calls}
        ItemSeparatorComponent={separatorComponent}
        ListFooterComponent={footerComponent}
        renderItem={({ item, index }) => (
          <View key={index} style={{
            marginHorizontal: 12, justifyContent: "space-between",
            flexDirection: "row", borderRadius: 12, padding: 12, backgroundColor: theme.colors.background
          }}>
            {/* neg column */}
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

            {/* pressable Icons */}
            <View style={{ flexDirection: "row", }}>
              <IconButton
                icon="content-copy"
                iconColor={theme.colors.textColor}
                size={24}
                mode="outlined"
                onPress={() => copyToClipboard(item.dugaar)}
              />
              <IconButton
                icon="call-made"
                iconColor={theme.colors.textColor}
                size={24}
                containerColor={theme.colors.accentColors[9]}
                mode="contained"
                onPress={() => console.log('Pressed')}
              />
            </View>
          </View>
        )
        }
      />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text >{copiedText}</Text>

    </View >
  )
}

export default PhoneList
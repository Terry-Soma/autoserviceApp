import React from "react";
import { View, Text, Image, Alert, } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import { Button } from "react-native-paper";
import { EvilIcons } from '@expo/vector-icons';
export default function SideBar(props) {

  const [active, setActive] = React.useState('');

  return (
    <View style={{ flex: 1, }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/splash.png")}
            size={50}
          />
          <View style={{ marginLeft: 8 }}>
            <Title
              style={{
                fontSize: 16,
                marginTop: 3,
                fontWeight: "bold",
                lineHeight: 23
              }}
            >
              Автомашин сэлбэг
            </Title>
            <Caption style={{ lineHeight: 14 }}>
              Тавтай морил
            </Caption>
          </View>
        </View>
        <Drawer.Section title="Үндсэн цэс" style={{ color: "#fff", }}>
          <Drawer.Item
            label="Нүүр"
            active={active === 'first'}
            icon={({ color, size }) =>
              <Feather name="home" size={size} color={color} />
            }
            onPress={() => {
              setActive('first')
              props.navigation.navigate("Home")
            }}
          />
          <Drawer.Item
            label="Бараа нэмэх"
            active={active === 'second'}
            icon={({ color, size }) =>
              <Feather name="package" size={size} color={color} />
            }
            onPress={() => {
              setActive('second')
              props.navigation.navigate("Бараа нэмэх")
            }
            }
          />
        </Drawer.Section>
        {/* <Drawer.CollapsedItem
          focusedIcon="inbox"
          unfocusedIcon="inbox-outline"
          label="Inbox"
        /> */}



        <Drawer.Section >
          <Drawer.Item
            label="Тохиргоо"
            onPress={() => {
              Alert.alert("Засвар", "Одоогоор энэ функц хөгжүүлэгдэж байна")
              props.navigation.navigate("Тохиргоо")
            }}
            icon={({ color, size }) => (
              <EvilIcons name="gear" size={size} color={color} />
            )}
          />

          <Button
            icon={({ size, color, direction }) => (
              <Image
                source={require('./../../assets/favicon.png')}
                style={[
                  {
                    transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
                  },
                  {
                    width: size,
                    height: size,
                    tintColor: color
                  }
                ]}
              />
            )}
          >
            Press me
          </Button>
        </Drawer.Section>
      </DrawerContentScrollView >


    </View >
  )

}
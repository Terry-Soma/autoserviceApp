import React from "react";
import { View, Image, Alert, } from 'react-native'
import { DrawerContentScrollView, } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import { Button } from "react-native-paper";
import { EvilIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
export default function SideBar(props) {
  const theme = useTheme();
  const [active, setActive] = React.useState('1');

  return (
    <View style={{ flex: 1, }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <Avatar.Image
            source={require("../../../assets/splash.png")}
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
        <Drawer.Section title="Үндсэн цэс" >
          <Drawer.Item
            label="Нүүр"
            active={active === '1'}
            icon={({ color, size }) =>
              <Feather name="home" size={size} color={color} />
            }
            onPress={() => {
              setActive('1')
              props.navigation.navigate("Home")
            }}

          />
          <Drawer.Item
            label="Бараа нэмэх"
            active={active === '2'}
            icon={({ size }) =>
              <Feather name="package" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              setActive('2')
              props.navigation.navigate("AddProduct")
            }
            }
          />
          <Drawer.Item
            label="Утасны дугаар"
            // active={active === '3'}
            icon={({ size }) =>
              <Feather name="phone" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              setActive('3')
              props.navigation.navigate("PhoneInfo")
            }
            }
          />

        </Drawer.Section>

        <Drawer.Section >
          <Drawer.Item
            label="Тохиргоо"
            onPress={() => {
              Alert.alert("Засвар", "Одоогоор энэ функц хөгжүүлэгдэж байна")
              props.navigation.navigate("Settings")
            }}
            icon={({ size }) => (
              <EvilIcons name="gear" size={size} />
            )}
          />
          {/* <Drawer.Item
            label="Бараа засах"
            active={active === '3'}
            icon={({ size }) =>
              <Feather name="package" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              setActive('3')
              props.navigation.navigate("Бараа засах")
            }
            }
          /> */}

          <Button
            icon={({ size, }) => (
              <Image
                source={require('./../../../assets/favicon.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: theme.colors.scrim
                }}
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
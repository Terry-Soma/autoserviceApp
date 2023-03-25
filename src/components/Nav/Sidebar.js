import React, { useContext } from "react";
import { View, Image, Alert, Text, } from 'react-native'
import { DrawerContentScrollView, } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';
import { Avatar, Caption, Title, Drawer, Button, useTheme } from "react-native-paper";
import { EvilIcons } from '@expo/vector-icons';
import { fontVar } from './../../../Constants'
import UserContext from "../../context/userContext";
export default function SideBar(props) {
  const userState = useContext(UserContext)
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
                // lineHeight: 23
                fontFamily: fontVar.Mont.sb
              }}
            >
              Автомашин сэлбэг
            </Title>
            <Caption style={{ lineHeight: 14, fontFamily: fontVar.Mont.m }}>
              Тавтай морил {userState.userName}
            </Caption>
          </View>
        </View>
        <Drawer.Section >
          <Caption
            style={{
              fontSize: 14,
              marginTop: 8,
              // lineHeight: 23
              paddingLeft: 24,
              paddingVertical: 4,
              fontFamily: fontVar.Mont.r
            }}
          >Үндсэн цэс
          </Caption>
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
          <Drawer.Item
            label="Зарсан бараанууд"
            // active={active === '3'}
            icon={({ size }) =>
              <Feather name="dollar-sign" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              setActive('3')
              props.navigation.navigate("Income")
            }
            }
          />
          <Drawer.Item
            label="Категорууд"
            // active={active === '3'}
            icon={({ size }) =>
              <Feather name="layers" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              setActive('3')
              props.navigation.navigate("ManageCategory")
            }
            }
          />


        </Drawer.Section>

        {userState.userRole == "admin" && (
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
            <Drawer.Item
              label="Орлогын тайлан"
              // active={active === '3'}
              icon={({ size }) =>
                <Feather name="pocket" size={size} color={theme.colors.scrim} />
              }
              onPress={() => {
                setActive('3')
                props.navigation.navigate("ManageIncome")
              }
              }
            />
            <Drawer.Item
              label="Орлогын тайлан"
              // active={active === '3'}
              icon={({ size }) =>
                <Feather name="pocket" size={size} color={theme.colors.scrim} />
              }
              onPress={() => {
                setActive('3')
                props.navigation.navigate("QR Scan")
              }
              }
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
          </Drawer.Section>)}

      </DrawerContentScrollView >
    </View >
  )

}
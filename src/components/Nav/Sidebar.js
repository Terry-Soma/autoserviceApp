import React, { useCallback, useContext } from "react";
import { View, Image, Alert, Text, } from 'react-native'
import { DrawerContentScrollView, } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons';
import { Avatar, Caption, Title, Drawer, Button, useTheme } from "react-native-paper";
import { EvilIcons } from '@expo/vector-icons';
import { fontVar } from './../../../Constants'
import UserContext from "../../context/userContext";
export default function SideBar(props) {


  const { state } = props
  const currentRoute = state.routeNames[state.index]
  const userState = useContext(UserContext)
  const theme = useTheme();

  return (
    <View style={{ flex: 1, }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <Avatar.Image
            source={require("../../../assets/adaptive-icon.png")}
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
            active={currentRoute === 'Home'}
            icon={({ color, size }) =>
              <Feather name="home" size={size} color={color} />
            }
            onPress={() => {
              props.navigation.navigate("Home")
            }}
          />
          <Drawer.Item
            label="Бараа нэмэх"
            active={currentRoute === 'AddProduct'}
            icon={({ size }) =>
              <Feather name="package" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              props.navigation.navigate("AddProduct")
            }
            }
          />
          <Drawer.Item
            label="Утасны дугаар"
            active={currentRoute === 'PhoneInfo'}
            icon={({ size }) =>
              <Feather name="phone" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              props.navigation.navigate("PhoneInfo")
            }
            }
          />
          <Drawer.Item
            label="Зарсан бараанууд"
            active={currentRoute === 'Income'}
            icon={({ size }) =>
              <Feather name="dollar-sign" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              props.navigation.navigate("Income")
            }
            }
          />
          <Drawer.Item
            label="Категорууд"
            active={currentRoute === 'ManageCategory'}
            icon={({ size }) =>
              <Feather name="layers" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
              props.navigation.navigate("ManageCategory")
            }
            }
          />


        </Drawer.Section>

        {userState.userRole == "admin" && (
          <Drawer.Section >
            <Drawer.Item
              label="Тохиргоо"
              active={currentRoute === "Settings"}
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
              active={currentRoute === 'ManageIncome'}

              icon={({ size }) =>
                <Feather name="pocket" size={size} color={theme.colors.scrim} />
              }
              onPress={() => {
                props.navigation.navigate("ManageIncome")
              }
              }
            />
            {/* <Drawer.Item
              label="Орлогын тайлан"
              // active={active === '3'}

              icon={({ size }) =>
                <Feather name="pocket" size={size} color={theme.colors.scrim} />
              }
              onPress={() => {
                props.navigation.navigate("QR Scan")
              }
              }
            /> */}
            {/* <Drawer.Item
            label="Бараа засах"
            active={active === '3'}
            icon={({ size }) =>
              <Feather name="package" size={size} color={theme.colors.scrim} />
            }
            onPress={() => {
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

            </Button>
          </Drawer.Section>)}

      </DrawerContentScrollView >
    </View >
  )

}
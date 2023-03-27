import React from "react";
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from "react-native";
import { fontVar } from "../../../Constants";
import { formattedDate } from "./../../utils/date";
import thousandify from 'thousandify'

const IncomeListItem = (item) => {
  return (
    <View style={css.incomeItem}>
      <View style={[{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"

      }]}>

        <View style={{
          flex: 2.4,
          paddingHorizontal: 4,
        }}>
          <Text style={{ fontSize: 16, fontFamily: fontVar.Mont.b, }}>
            {item.product.ner}
          </Text>
          <View style={{
            flexDirection: 'column',
          }}>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>

              <View style={{
                flexDirection: "row", paddingRight: 12, alignItems: "center",
              }} >
                <Feather name="package" size={16} color="black" style={{ marginRight: 4 }} />
                <Text
                  style={{ fontSize: 16, lineHeight: 20, fontFamily: fontVar.Mont.r }}
                >
                  {item.shirheg}ш
                </Text>
              </View>
              <View style={{
                flexDirection: "row", marginTop: 4,
                alignItems: "center",
                marginVertical: 4,
                flex: 1
              }}>
                <Text style={{ fontSize: 16, fontFamily: fontVar.Mont.m }}>
                  Үнэ-{thousandify(`${item.product.une}`)}₮
                </Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <View style={{
                flexDirection: "row", paddingRight: 2, alignItems: "center",
              }}>
                <Feather name="calendar" size={14} color="black" style={{ marginRight: 2 }} />
                <Text style={{ fontSize: 12, color: "grey", fontFamily: fontVar.Mont.l }}>
                  {formattedDate(item.sell_date)}
                </Text>

              </View>
              <View style={{
                flexDirection: "row", marginTop: 4,
                alignItems: "center",
                marginVertical: 4,
                flex: 1

              }}>
                <Feather name="user" size={14} color="black" style={{ marginLeft: 6, marginRight: 2 }} />
                <Text style={{ fontSize: 16, color: "grey", fontWeight: "500", fontFamily: fontVar.Man }}>
                  Tuuduu
                </Text>
              </View>
            </View>

          </View>

        </View>
        <View style={{
          backgroundColor: "#0F00F9", borderRadius: 16,
          paddingVertical: 12,
          paddingHorizontal: 8,
          alignItems: "center",
        }}>
          <Text style={{ fontWeight: "700", color: "#f3f3f3" }}>
            {thousandify(`${item.product.une * item.shirheg}`)}₮
          </Text>
          <Text style={{ color: "#fff", fontSize: 14 }}>Нийт дүн</Text>
        </View>

      </View>
    </View>
  )
}
export default IncomeListItem;
const css = StyleSheet.create({
  incomeItem: {
    paddingVertical: 8,
    margin: 4,
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 6,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#111",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    backgroundColor: "#fefefe",
    marginVertical: 6,
    overflow: "hidden"
  },
}
)
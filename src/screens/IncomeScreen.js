import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { fontVar, restUrl } from "../../Constants";
import Search from "../components/Search";
import thousandify from 'thousandify'
import { formattedDate } from "../utils/date";
import { Feather } from '@expo/vector-icons';
const IncomeScreen = () => {
  const [seachVal, setSearchVal] = useState('')
  const searchFromServer = () => {

  }
  const [incomes, setIncomes] = useState([])
  //fetch zarsan baraanuud
  useEffect(() => {
    axios.get(restUrl + "/api/income")
      .then(result => {
        setIncomes(result.data.data)
      })
      .catch(err => {
        console.log('erro', err)
      })
  }, []);

  const filteredIncome = incomes.filter((income) => income.product.ner.toLowerCase().includes(seachVal.toLowerCase()))
  // {"id": 4, "product": {"categoryId": 1, "come_date": "2022-02-13", "id": 1, "img": null, "location": "Гаражны хойд тавиур", "ner": "95 урд гэрэл", "serNum": "", "shirheg": 7, "une": 100}, "productId": 1, "sell_date": "2023-03-13T07:13:16.000Z", "shirheg": 2, "userId": 1}

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Search
        value={seachVal}
        onValueChange={setSearchVal}
        onFinishEnter={searchFromServer}
        placeholder="Зарсан бараанаас хайх"
      />

      <View style={css.incomeListContainer}>
        {/* improve */}
        <FlatList
          data={filteredIncome}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={css.incomeItem}>
              <View style={[{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }]}>
                <View style={{
                  flex: 2.4,
                  paddingHorizontal: 4,
                }}>
                  <Text style={{ fontSize: 16, fontFamily: fontVar.Man }}>
                    {item.product.ner}
                  </Text>
                  <View style={{ flexDirection: 'column', }}>

                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>

                      <View style={{ flexDirection: "row", paddingRight: 2, alignItems: "center", }} >
                        <Feather name="package" size={16} color="black" style={{ marginRight: 8 }} />
                        <Text
                          style={{ fontSize: 16, lineHeight: 20, }}
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
                        <Text style={{ fontSize: 16, color: "grey", fontWeight: "700" }}>
                          Үнэ-{thousandify(`${item.product.une}0000`)}₮
                        </Text>
                      </View>
                    </View>
                    <View style={{
                      flexDirection: "row",
                    }}>
                      <View style={{
                        flexDirection: "row", paddingRight: 2, alignItems: "center",
                      }}>
                        <Feather name="calendar" size={14} color="black" style={{ marginRight: 2 }} />
                        <Text style={{ fontSize: 12, color: "grey", }}>
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
                        <Text style={{ fontSize: 16, color: "grey", fontWeight: "bold" }}>
                          Tuuduu ah
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
                    {thousandify(`${item.product.une * item.shirheg}0000`)}₮
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 14 }}>Нийт дүн</Text>
                </View>

              </View>
            </View>
          )
          }
        />
      </View>
    </SafeAreaView >
  )
}
export default IncomeScreen

const css = StyleSheet.create({
  incomeListContainer: {
    flex: 1,
    margin: 4,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "#119999",
    borderWidth: 1,
    padding: 8,
    paddingVertical: 4,
  },
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
    // borderColor: "#111",
    // borderWidth: 2,

  },

})
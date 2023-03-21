import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { restUrl } from "../../Constants";
import IncomeListItem from "./../components/IncomeList/IncomeListItem"
import Search from "../components/Search";
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
          renderItem={({ item }) => IncomeListItem(item)}
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
  }
}
)

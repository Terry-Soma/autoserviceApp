import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { restUrl } from "../../Constants";
import { fontVar } from "../../Constants";
import thousandify from 'thousandify'
import { Feather } from '@expo/vector-icons';
import { formattedDate } from "./../utils/date";
import IncomeListItem from "./../components/IncomeList/IncomeListItem"
import Search from "../components/Search";
const IncomeScreen = () => {
  const [seachVal, setSearchVal] = useState('')
  // const [incomeLength, setIncomeLength] = useState(null)
  const searchFromServer = () => {

  }
  const [incomes, setIncomes] = useState([])
  //fetch zarsan baraanuud
  useEffect(() => {
    axios.get(restUrl + "/api/views/income")
      .then(result => {
        setIncomes(result.data.data)
        // setIncomeLength(result.data.length)

      })
      .catch(err => {
        console.log('erro', err)
      })
  }, []);

  const filteredIncome = incomes.filter((income) => income.pNer.toLowerCase().includes(seachVal.toLowerCase()))
  //  {


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
        {/* <Text>{incomeLength}</Text> */}

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
  }, incomeItem: {
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

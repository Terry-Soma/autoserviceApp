
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import thousandify from 'thousandify'
import { restUrl } from "../../Constants";
import IncomeListItem from "./../components/IncomeList/IncomeListItem"



export default function ManageIncomeScreen({ navigate }) {
  const [filterOption, setFilterOption] = useState('today');
  const [incomeInfo, setIncomeInfo] = useState(null)
  // today last3 last7 lastmonth last3month
  const searchOption = [{ title: "Өнөөдөр", option: "today" }, { title: "#3 хоног", option: "last3" }, { title: "#7 хоног", option: "last7" }, { title: "#1 cар", option: "lastmonth" }, { title: "#3 сар", option: "last3month" }];

  // const someFunc = async (option) => {
  //   try {
  //     const res = await axios.get(restUrl + "/api/income" + "?sort=" + option);
  //     console.log('res', res.data.data)
  //     setIncomeInfo(res.data.data)
  //   } catch (error) {
  //     Alert.alert(error)
  //     console.log('e', error)

  //   }
  // }
  useEffect(() => {
    fetchData();
  }, [filterOption, fetchData])
  const fetchData = useCallback(async () => {
    console.log('filteredOption', filterOption)
    try {
      const res = await axios.get(restUrl + "/api/income" + "?sort=" + filterOption);
      // console.log('res', res.data.data)
      setIncomeInfo(res.data.data)
    } catch (error) {
      Alert.alert(error)
      console.log('e', error)
    }
  }, [filterOption])
  return (
    <SafeAreaView style={{ marginHorizontal: 6, flex: 1 }}>
      {/* niit orlogiig haruulah  
      // flatlist?
      
      // 
      
      
      */}
      <View style={{ backgroundColor: "#2A7E73", width: "90%", height: 100, alignSelf: "center", marginVertical: 10 }}>
        <Text style={{ color: "lightgrey" }}>03 / 21</Text>
        <Text style={{ color: "white" }}>Нийт орлого
          <Text>{thousandify(1000022)}₮</Text>
        </Text>
        <Text>10 ш худалдаа</Text>
      </View>
      {/* шүүх */}

      <View style={{ marginVertical: 12, }}>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchOption}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: "#F4B69C", marginHorizontal: 4, marginVertical: 2, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 8, elevation: 4 }}>
                  <Pressable
                    style={({ pressed }) => [pressed && { opacity: 0.4 }]}
                    onPress={() => setFilterOption(item.option)}
                  >
                    <Text style={{ color: "#333" }}>{item.title}</Text>
                  </Pressable>
                </View>
              )
            }}
          />
        </View>
      </View>

      <View style={{ paddingVertical: 12, backgroundColor: "green", flex: 1 }}>
        <FlatList
          data={incomeInfo}
          keyExtractor={(income) => income.id}
          renderItem={({ item }) => IncomeListItem(item)}
        />
      </View>


      {/*last transaction   */}




    </SafeAreaView >
    // shuultur
  )
}

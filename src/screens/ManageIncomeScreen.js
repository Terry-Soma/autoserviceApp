
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import thousandify from 'thousandify'
import { fontVar, restUrl } from "../../Constants";
import { formatQueryToDate, formattedDate, formattedToday } from "../utils/date";
import IncomeListItem from "./../components/IncomeList/IncomeListItem"
import Spinner from './../components/Spinner'


export default function ManageIncomeScreen({ navigate }) {
  const [filterOption, setFilterOption] = useState('today');
  const [incomeInfo, setIncomeInfo] = useState(null)
  const [incomeLength, setIncomeLength] = useState(null)
  const [amount, setAmount] = useState(null)
  const [date, setDate] = useState(formattedToday())
  // date 
  // today last3 last7 lastmonth last3month
  const searchOption = [{ title: "Өнөөдөр", option: "today" }, { title: "#3 хоног", option: "last3" }, { title: "#7 хоног", option: "last7" }, { title: "#1 cар", option: "lastmonth" }, { title: "#3 сар", option: "last3month" }];
  const fetchData = useCallback(async () => {
    setDate(formatQueryToDate(filterOption))
    console.log('filteredOption', filterOption)
    setIncomeInfo([])
    try {
      const res = await axios.get(restUrl + "/api/income" + "?sort=" + filterOption);
      setIncomeInfo(res.data.data)
      setIncomeLength(res.data["length"])
      setAmount(res.data.incomeResult)
    } catch (error) {
      Alert.alert(error)
      console.log('e', error)
    }
  }, [filterOption])
  useEffect(() => {
    console.log('bi ajillaaa ')

    fetchData();
  }, [filterOption, fetchData])

  return (
    <SafeAreaView style={{ marginHorizontal: 6, flex: 1 }}>
      {/* card like */}
      {/* container */}
      <View style={{ backgroundColor: "#2A7E73", marginVertical: 10, marginHorizontal: 12, paddingVertical: 8, borderRadius: 16, }}>
        <Text style={{ color: "lightgrey", fontFamily: fontVar.Man, fontSize: 16, textAlign: "center" }}>{date}</Text>
        <View style={{
          paddingVertical: 12, marginHorizontal: 12, flexDirection: 'row',
          flexWrap: 'wrap', justifyContent: "space-around"
        }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 14, fontFamily: fontVar.Mont.l, paddingLeft: 4 }}>Нийт орлого
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontFamily: fontVar.Mont.b }}>{thousandify(amount)}₮</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 16, fontFamily: fontVar.Mont.b }}>Нийт {incomeLength} </Text>
            <Text style={{ color: "white", fontSize: 14, fontFamily: fontVar.Mont.l }}>худалдаа</Text>
          </View>
        </View>
      </View>
      {/* шүүх */}

      <View style={{ marginVertical: 12, }}>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchOption}
            keyExtractor={(_, index) => index}
            renderItem={({ item }) => {
              return (
                <View style={[{ marginHorizontal: 4, marginVertical: 2, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 8, elevation: 4 }, { backgroundColor: filterOption === item.option ? "#f49cae" : "#F4B69C" }]}>
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

      <View style={{
        paddingVertical: 12,
        backgroundColor: "#BEBFf5",
        flex: 1
      }}>
        {incomeInfo && incomeInfo.length > 0 ? (
          <FlatList
            data={incomeInfo}
            keyExtractor={(income) => income.id}
            renderItem={({ item }) => IncomeListItem(item)}
          />
        ) : (<Spinner textStyle={{ color: "#333" }} />)
        }

      </View>


      {/*last transaction   */}




    </SafeAreaView >
    // shuultur
  )
}

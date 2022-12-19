import { StyleSheet, Text, View, Image, SectionList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { restUrl } from '../../Constants';

const TopProduct = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([{
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 1,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "95 урд гэрэл",
    "serNum": "",
    "shirheg": 12,
    "une": 1001232,
    "cner": "Гэрэл дохио"

  },
  {
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 2,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "185 урд гэрэл",
    "serNum": "",
    "shirheg": 12,
    "une": 100,
    "cner": "Гэрэл дохио"

  },
  {
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 3,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "185 хойд бөгсний гэрэл",
    "serNum": "",
    "shirheg": 12,
    "une": 100,
    "cner": "Гэрэл дохио"
  },
  {
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 4,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "95 дохио",
    "serNum": "",
    "shirheg": 12,
    "une": 100,
    "cner": "Гэрэл дохио"

  },
  {
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 5,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "185 дохио",
    "serNum": "",
    "shirheg": 12,
    "une": 100,
    "cner": "Гэрэл дохио"

  },
  {
    "categoryId": 1,
    "come_date": "2022-02-13",
    "id": 6,
    "img": "parado1.jpg",
    "location": "Гаражны хойд тавиур",
    "ner": "185 нэмэлт гүперний гэрэл",
    "serNum": "",
    "shirheg": 12,
    "une": 100,
    "cner": "Гэрэл дохио"

  }]);
  return (

    <View style={{ marginLeft: 8, flex: 1, padding: 2, marginBottom: 12 }}>

      {
        data ? (
          <FlatList data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
              ({ item, index }) => <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Бараа", { product: item })
                }}
                style={{ paddingHorizontal: 4, }}
              >
                <View style={css.proContainer}>
                  <Text style={css.proName}>{item.ner}</Text>

                  <View style={{
                    flex: 1,
                    paddingHorizontal: 4,
                    margin: 4
                  }}>
                    {/* <Image style={css.proImage} source={{ uri: restUrl + "/upload/" + item.img }} /> */}
                    <Image style={css.proImage} source={require(`./../../assets/favicon.png`)} />


                  </View>

                  <View style={css.flex}>
                    <Text style={css.countText}>{item.shirheg} ш</Text>
                    <Text style={css.priceText}>{item.une ? item.une : "123444₮"}₮</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        ) : null}
    </View >

  )
}
{/* <Image style={css.proImage} source={require('./../../assets/splash.png')} /> */ }

export default TopProduct

const css = StyleSheet.create({
  proContainer: {
    flex: 1,
    height: 240,
    paddingTop: 12,
    paddingHorizontal: 6,
    marginRight: 6,
    width: 264,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#fefefe",
    marginBottom: 6,
    overflow: "hidden"
  },
  proImage: {
    backgroundColor: "#111fff",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover'
  },
  proName: {
    marginLeft: 12,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600'
  },
  flex: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 4,
    marginVertical: 6,

    alignItems: "center"
  },
  priceText: {
    color: "#234588",
    fontWeight: "800"
  },
  countText: {
    fontSize: 16,
    fontWeight: "600"
  },


})
{/* zurag baigaa uguig shalgah */ }

{/*  */ }
/*
 <TouchableOpacity key={index}
                onPress={() => navigation.navigate("Бүтээгдэхүүн", { id: item.id })}
              >
                <Text style={css.proName}>{item.ner}</Text>
               
                <Image style={css.proImage} source={{ uri: `${restUrl}/upload/${item.img}` }} />
                <View style={css.flex}>
                  <Text style={css.countText}>{item.shirheg} ш байна</Text>
                  <Text style={css.priceText}>{item.une ? item.une : "123444₮"}₮</Text>
                </View>
              </TouchableOpacity>
  const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>

  <SectionList
        renderItem={({ item, index, section }) => (
          <Text key={index}>{item}</Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        )}
        sections={[
          { title: 'Title1', data: ['item1', 'item2'] },
          { title: 'Title2', data: ['item3', 'item4'] },
          { title: 'Title3', data: ['item5', 'item6'] }
        ]}
        keyExtractor={(item, index) => item + index}
      />
      <SectionList
        renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
        sections={[
          { title: 'Title1', data: ['item1', 'item2'], renderItem: overrideRenderItem },
          { title: 'Title2', data: ['item3', 'item4'] },
          { title: 'Title3', data: ['item5', 'item6'] },
        ]}
      />
 */
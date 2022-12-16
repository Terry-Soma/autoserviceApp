import { StyleSheet, Text, View, Image, SectionList } from 'react-native'
import React, { useState } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

import { restUrl } from '../../Constants';
const TopProduct = () => {
  const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>
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
    "une": 100,
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
  }]);
  return (
    <View>
      <Text>This is productTop</Text>

      <ScrollView scrollEnabled style={css.proContainer} >
        {data ? (data.map(product => {
          return (
            // <FlatList>
            <TouchableOpacity key={product.id}
              onPress={() => navigation.navigate("Бүтээгдэхүүн", { id: product.id })}
            >
              <Text style={css.proName}>{product.ner}</Text>
              {/* <Image style={css.proImage} source={{ uri: restUri+"/upload/" + product.photo }} /> */}
              {/* zurag baigaa uguig shalgah */}
              <Image style={css.proImage} source={{ uri: `${restUrl}/upload/${product.img}` }} />
              <View style={css.flex}>
                <Text style={css.countText}>{product.shirheg} ш байна</Text>
                <Text style={css.priceText}>{product.une ? product.une : "123444₮"}₮</Text>
              </View>
            </TouchableOpacity>
            // </FlatList>
          )
        }
        )) : null}


      </ScrollView>
    </View>
  )
}

export default TopProduct

const css = StyleSheet.create({
  proContainer: {
    marginLeft: 16,
    flex: 1,
  },
  proImage: {
    width: 216,
    height: "60%",

    marginRight: 15,
    borderWidth: 2,
    borderRadius: 12
  },
  proName: {
    marginLeft: 4,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600'
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 12,
    alignItems: "center"
  },
  priceText: {
    color: "#234588",
    fontWeight: "800"
  },
  countText: {
    fontSize: 16,
    fontWeight: "600"
  }

})

/*
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
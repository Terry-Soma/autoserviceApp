import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const Search = props => {
  return (
    <View style={css.searchPanel}>
      <TouchableOpacity style={css.searchIcon} onPress={props.onFinishEnter}>
        <Feather name="search" style={css.searchIcon} color="black" />
      </TouchableOpacity>
      <TextInput
        style={css.searchText}
        placeholder='Хайх бараагаа оруулна уу'
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={props.onValueChange}
        onEndEditing={props.onFinishEnter}
        clearButtonMode="always"
        value={props.value}
      />
      {props.value !== "" ? (<Feather name="x" style={[css.searchIcon, { paddingRight: 4 }]} color="black" onPress={() => props.onValueChange("")} />) : null}
    </View>
  )
}

export default Search

const css = StyleSheet.create({
  searchPanel: {
    height: 48,
    backgroundColor: "#CAD5E2",
    marginHorizontal: 12,
    borderRadius: 7,
    flexDirection: "row",

  },
  searchText: {
    color: "black",
    fontSize: 20,
    flex: 1,
    marginLeft: 2
  },
  searchIcon: {
    fontSize: 24,
    alignSelf: "center",
    marginHorizontal: 4,
  }
})
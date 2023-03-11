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
        placeholderTextColor="#f5f5f5"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={props.onValueChange}
        onEndEditing={props.onFinishEnter}
        value={props.value}
        {...props}
      />
      {props.value !== "" ? (<Feather name="x" style={[css.searchIcon, { paddingRight: 4 }]} onPress={() => props.onValueChange("")} />) : null}
    </View>
  )
}

export default Search

const css = StyleSheet.create({
  searchPanel: {
    height: 48,
    backgroundColor: "#35495E",
    margin: 12,
    borderRadius: 7,
    flexDirection: "row",
    overflow: 'hidden'
  },
  searchText: {
    color: "#F5F5F5",
    fontSize: 18,
    flex: 1,
    marginLeft: 2,
    paddingVertical: 2
  },
  searchIcon: {
    fontSize: 24,
    alignSelf: "center",
    marginHorizontal: 4,
    color: "#F5F5F5"
  }
})
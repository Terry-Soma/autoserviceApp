import React from 'react';

import { View, Icon, Text, StyleSheet } from 'react-native';

const CardIcon = (props) => {
  return (
    <View style={css.con}>
      <Text style={css.leading}>{props.leading}</Text>
      <Text style={css.tail}>{props.tail}</Text>
    </View>
  )
};

export default CardIcon;

const css = StyleSheet.create({
  con: {

  },
  leading: {

  },
  tail: {

  }

})
import React from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Reader(props) {
  return (
    <BarCodeScanner
      onBarCodeScanned={props.scanned ? undefined : props.handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />

  )
}
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Text, View, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { restUrl } from '../../Constants';
import Spinner from '../components/Spinner';
import { useIsFocused } from '@react-navigation/native';
import Reader from '../components/QRAndBar/Reader';
import { Button } from 'react-native-paper';

export default function SearchQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused()
  // ask permission
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  // qr scanned
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true)

    // search by data 
    try {
      setLoading(true)
      const result = await axios.get(`${restUrl}/api/products?serNum=${data}`);

      if (result.data.data.length === 1) {
        let product = result.data.data[0]
        // that is better
        navigation.navigate("ProductDetail", { product })
        setScanned(false)
      } else {
        Alert.alert(`${data} кодтой бараа олдсонгүй!`);
      }

    } catch (error) {
      console.log('error', error)
      alert.error(`${data} өгөгдлөөр хайхад алдаа гарлаа!`);
    }
    setLoading(false);

  };

  if (hasPermission === null) {
    return <Text>Зөвшөөрлийг шалгаж байна</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {
        isFocused && !loading && <Reader scanned={scanned} handleBarCodeScanned={handleBarCodeScanned} />
      }

      {loading ? <Spinner /> : null}
      {scanned && (
        <Button icon="camera" mode="contained" onPress={() => setScanned(false)} style={{ position: "absolute", bottom: 0, width: "100%" }}>
          Дахин Кодоор хайх
        </Button>
      )}
    </View>
  );
}

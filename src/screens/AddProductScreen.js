import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Platform, Alert, Image, Pressable, Linking, StyleSheet, } from 'react-native';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { Button as PaparButton, } from "react-native-paper";
import { storage } from '../../firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import * as Animatable from "react-native-animatable";
import FormText from "../components/FormText";
import FormRadioButtons from "../components/FormRadioButtons";
import { fontVar, restUrl } from "../../Constants";
import MyButton from "../components/MyButton";
import useCategory from "../hooks/useCategory";
import Spinner from "../components/Spinner";
import { useTheme } from 'react-native-paper';
import { useIsFocused, useRoute } from '@react-navigation/native';
export default function AddProduct({ navigation, route }) {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [saving, setSaving] = useState(false)
  const [producName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null)
  const [productLoc, setProductLoc] = useState(null)
  const [productAmount, setProductAmount] = useState(null);
  const [productCatId, setProductCatId] = useState(null)
  const [productSerial, setProductSerial] = useState(null)
  const [categories, setCategories, setError, error, loading] = useCategory();
  const isFocused = useIsFocused()
  console.log('route', route)

  if (route.params && route.params.serNum) {
    alert(route.params.serNum + " кодыг амжилттай уншлаа!");
    setProductSerial(route.params.serNum)
    delete route.params.serNum;
  }



  const takeImage = async () => {
    const result = await ImagePicker.getCameraPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert("Анхаар ", "Зураг авахын тулд эрхүүдийг нээх шаардлагатай", [{ text: "ЗА" }])
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    })
    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }

  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    const fileName = image.substring(image.lastIndexOf('/') + 1);
    const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
    const metadata = { contentType: `image/${fileExt}` };
    const storageRef = ref(storage, `Upload/${fileName}`);
    uploadTask;

    const response = await fetch(image);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          console.log('snapshot', snapshot.bytesTransferred, snapshot.totalBytes)

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('progres', progress);

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  const sendProductToServer = async () => {

    if (!image) {
      Alert.alert("Та барааны зургаа оруулна уу")
      return;
    }
    setSaving(true)

    var t0 = performance.now()
    let imgUrl = await uploadImage();
    var t1 = performance.now()

    const data = {
      ner: producName,
      serNum: productSerial,
      img: imgUrl,
      location: productLoc,
      categoryId: productCatId,
      come_date: Date(),
      shirheg: productAmount,
      une: productPrice
    }
    const result = await axios.post(`${restUrl}/api/products`, data);
    console.log('result.data', result.data);
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    setSaving(false)

    deleteState();
    navigation.navigate('Home', {
      createdProduct: result.data.data
    });

  }
  const deleteState = () => {
    setImage(null)
    setSaving(null)
    setProductName(null)
    setProductPrice(null)
    setProductLoc(null)
    setProductAmount(null)
    setProductCatId(null)
    setProductSerial(null)
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Анхаар!",
            "Уучлаарай, та утаснаас зураг сонгох эрхийг зөвшөөрч байж зураг оруулах боломжтой. Та утасныхаа тохиргооны цонхноос энэ апп-д зураг үзэх бичих эрхийг нээж өгнө үү.",
            [{
              text: 'Ok',
              onPress: () => Linking.openSettings(),
              style: 'default',
            },

            ]
          );
        }
      }
    })();
  }, []);

  if (error) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{error}</Text>
    </View>
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#35495E"
    }}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: "#35495E",
        }}
      >
        <Text style={{ fontSize: 24, color: theme.colors.secondaryColor, textAlign: "center", fontFamily: fontVar.Man }}>
          Та барааны мэдээллээ оруулна уу
        </Text>

      </View>
      {saving ? (
        <Spinner textStyle={{ color: "white" }} />) : (
        <Animatable.View
          animation="fadeInUpBig"
          duration={800}
          style={{
            flex: 8,
            paddingHorizontal: 16,
            paddingVertical: 24,
            backgroundColor: theme.colors.secondaryColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

          }}
        >
          <ScrollView showsVerticalScrollIndicator={false} style={{
          }}>
            {/* image picker start */}
            <View style={{
              flex: 1, alignItems: 'center', justifyContent: 'center',
              paddingHorizontal: 2,
              paddingVertical: 10,
            }}>
              <View style={{ flexDirection: "row", alignSelf: "stretch", marginVertical: 10, justifyContent: "space-evenly", }}>
                <PaparButton icon="folder-image" mode="text" onPress={pickImage} textColor={theme.colors.mainColor} >
                  Галерейгаас  сонгох
                </PaparButton>
                <PaparButton icon="camera" mode="contained" onPress={takeImage} buttonColor={theme.colors.mainColor} >
                  Зураг авах
                </PaparButton>
              </View>
              {image && <Image source={{ uri: image }} style={{ width: 250, height: 200, borderColor: "red", borderWidth: 2, }} resizeMode="contain" />}
            </View>
            {/* image picker end */}

            {/* information  */}
            <FormText
              label="Барааны нэрийг оруулна уу"
              placeholder="Барааны нэр"
              icon="package"
              value={producName}
              onChangeText={setProductName}
              errorText="Барааны нэрийн урт 4-20 тэмдэгтээс тогтоно."
              errorShow={false}
            />

            <FormText
              label="Барааны үнийг оруулна уу"
              placeholder="Барааны үнэ"
              icon="dollar-sign"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={setProductPrice}
              errorText="Барааны үнэ тоо байх ёстой."
              errorShow={false}
            />
            <FormText
              label="Барааны код дугаар оруулна уу"
              placeholder="Барааны код"
              icon="code"
              value={productSerial}
              onChangeText={setProductSerial}
              errorText="Барааны код байх ёстой."
              errorShow={false}
            />
            <FormText
              label="Барааны тоог оруулна уу"
              placeholder="Барааны тоо ширхэг"
              icon="plus-square"
              keyboardType="numeric"
              value={productAmount}
              onChangeText={setProductAmount}
              errorText="Барааны тоог оруулах ёстой."
              errorShow={false}
            />
            <FormText
              label="Барааны байршлыг оруулна уу"
              placeholder="Барааны байршил"
              style={{ fontSize: 12, marginTop: -10 }}
              icon="edit"
              multiline
              numberOfLines={3}
              value={productLoc}
              onChangeText={setProductLoc}
              errorText="Барааны байршил  тэмдэгтээс тогтоно."
              errorShow={false}
            />
            <FormRadioButtons
              label="Барааны ангилал :"
              icon="layers"
              data={categories.map(el => el.ner)}
              value={productCatId}
              values={categories.map(el => el.id)}
              onValueChange={(value) => setProductCatId(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center', paddingVertical: 16
              }}
            >
              <MyButton style={css.button}
                onPress={() => navigation.goBack()}
              >Буцах</MyButton>
              <MyButton style={css.button} onPress={sendProductToServer}>Бүртгэх</MyButton>
            </View>
          </ScrollView>
        </Animatable.View>)}
    </SafeAreaView>
  )

}

const css = StyleSheet.create({
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
})
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Button, Platform, Alert, Image, Linking } from 'react-native'
// import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import ImagePickerExample from "../components/Test";
import { ActivityIndicator, Card, Button as PaparButton, Title, Paragraph, Avatar, IconButton } from "react-native-paper";
import { app, storage } from '../../firebaseConfig'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import * as Animatable from "react-native-animatable";
import FormText from "../components/FormText";
import thousandify from 'thousandify'
import { StatusBar } from "expo-status-bar";
import FormRadioButtons from "../components/FormRadioButtons";
import { lightColor, mainColor, restUrl } from "../../Constants";
//   "come_date": "2022-02-13",
import axios from 'axios'
import MyButton from "../components/MyButton";
//             "serNum": "",
export default function AddProduct(props) {
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [producName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null)
  const [productLoc, setProductLoc] = useState(null)
  const [productAmount, setProductAmount] = useState(null);
  const [productCatId, setProductCatId] = useState(null)
  const categories = [
    {
      "id": 1,
      "ner": "Гэрэл дохио",
    },
    {
      "id": 2,
      "ner": "Түүлк резин",
    },
    {
      "id": 3,
      "ner": "Явах эд анги",
    },
    {
      "id": 4,
      "ner": "Мотор кроп",
    },
    {
      "id": 5,
      "ner": "Шинэ сэлбэг/95",
    },
  ]
  const takeImage = async () => {
    const result = await ImagePicker.getCameraPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert("Анхаар ", "Зураг авахын тулд эрхүүдийг нээх шаардлагатай", [{ text: "ЗА" }])
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    if (!image.cancelled) {
      setImage(image.uri);
    }

  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const uploadImage = async () => {
    setUploading(true)
    const fileName = image.substring(image.lastIndexOf('/') + 1);
    const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
    const metadata = { contentType: `image/${fileExt}` };
    const storageRef = ref(storage, `Upload/${fileName}`);

    const response = await fetch(image);
    const blob = await response.blob();
    let imgUrl;
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     console.log('xhr', xhr.response);
    //     resolve(xhr.response);
    //   };
    //   xhr.onloadstart = function () {
    //     console.log('xhr', xhr.responseText);
    //     // resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", image, true);
    //   xhr.send(null);

    // });
    // console.log('response', response)
    console.log('response blob', blob)



    // uploadBytes(storageRef, blob, metadata)
    //   .then(() => {
    //     console.log('Uploaded a blob or file!')
    //   })
    //   .catch(err => console.log('errr', err))
    //   .finally(() => setUploading(false));
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
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
      (error) => console.log('error', error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          imgUrl = downloadURL;
        });
      }
    );
    return imgUrl;
  }

  const sendProductToServer = async () => {
    let imgUrl = await uploadImage();
    console.log('imgUr', imgUrl)
    // let a = await imgUrl;
    // console.log('imgUr', a)


    const data = {
      ner: producName,
      // serNum:,
      img: imgUrl,
      location: productLoc,
      categoryId: productCatId,
      come_date: Date(),
      shirheg: productAmount,
      une: productPrice
    }
    const result = await axios.post(`${restUrl}/api/products`, data);
    console.log('result.data', result.data);

    // axios.post(`${restUrl}/api/products`, data).then(result => console.log('result.dat', result.data));
    // uploadImage().then(imgUrl => {
    //   console.log('imgUrl', imgUrl)
    //   

    // }).catch(error => console.log('err', error));

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
              text: "Тохиргоог нээх",
              onPress: () => {
                if (Platform.OS === "ios") Linking.openURL("app-settings:");
                // else {
                //   // android intent
                //   IntentLauncher.startActivityAsync(
                //     IntentLauncher.ACTION_APPLICATION_SETTINGS
                //   );
                // }
              }
            },
            { text: "Ok", onPress: () => { } }
            ]
          );
        }
      }
    })();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3498DB" }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor
        }}
      >
        <Text style={{ fontSize: 24, color: lightColor, textAlign: "center" }}>
          Та барааны мэдээллээ оруулна уу
        </Text>

      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 8,
          paddingHorizontal: 16,
          paddingVertical: 30,
          backgroundColor: lightColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,

        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{
          borderColor: "red", borderWidth: 2,
        }}>
          {/* image picker */}
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center',
            paddingHorizontal: 2,
            borderColor: "red", borderWidth: 2,
            paddingBottom: 10,
          }}>
            <View style={{ flexDirection: "row", alignSelf: "stretch", marginVertical: 10, justifyContent: "space-evenly", }}>
              <PaparButton icon="folder-image" mode="text" onPress={pickImage} textColor={mainColor} >
                Галерейгаас  сонгох
              </PaparButton>
              <PaparButton icon="camera" mode="contained" onPress={takeImage} buttonColor={mainColor} >
                Зураг авах
              </PaparButton>
            </View>
            {image && <Image source={{ uri: image }} style={{ width: 250, height: 200, borderColor: "red", borderWidth: 2, }} resizeMode="contain" />}
          </View>
          {/* image picker */}

          {/* information  */}
          <FormText
            label="Барааны нэрийг оруулна уу"
            placeholder="Барааны нэр"
            icon="package"
            value={producName}
            onChangeText={setProductName}
            errorText="Барааны нэрийн урт 4-20 тэмдэгтээс тогтоно."
            errorShow={true}
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
            onValueChange={(value) => {
              console.log(value);
              setProductCatId(value)
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 20 }}
          >
            <MyButton
              title="Буцах"
              onPress={() => props.navigation.goBack()}
            />
            <MyButton title="Бүртгэх" onPress={sendProductToServer} />
          </View>
        </ScrollView>

      </Animatable.View>
    </SafeAreaView>
  )
}
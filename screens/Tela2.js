import React, { useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native';



export default function Tela2() {
  

    const[latitude, setLatitude] = useState(0);
    const[longitude, setLongitude] = useState(0);
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");

    async function enviar(){
    /*    const json = {
            title: title,
            description: description,
            latitude: latitude,
            longitude: longitude,
        }; */

        const postOptions = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`,
            },
            body: JSON.stringify({
              title: title,
              description: description,
              latitude: latitude,
              longitude: longitude,}),
        };
        const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', postOptions);
        if (response.status === 200){
            const token = await response.text();
            Alert.alert('Marcador inserido com sucesso. ')
        }else{
            Alert.alert('Marcador inserido sem sucesso. ')
        }
    }

  return (
      <View style={styles.container}>
         <SafeAreaView>
            <View style={styles.container}>
                <MapView style={styles.map}
                onPress={(event) => {
                    setLatitude(event.nativeEvent.coordinate.latitude)
                    setLongitude(event.nativeEvent.coordinate.longitude)
                }}>
                <Marker 
                coordinate={{latitude: latitude, longitude: longitude}}
                title={title}
                description={description}/>
                </MapView>
            </View>

            <View  style={styles.container3}>
                <Text style={styles.texto}>Título</Text>
                <TextInput
                     style={styles.input}
                     placehholder='Digite aqui...'
                     value={title}
                     secureTextEntry={false}
                     onChangeText={setTitle}
                />
                <Text style={styles.texto}>Descrição</Text>

                <TextInput
                     style={styles.input}
                     placehholder='Digite aqui...'
                     value={description}
                     secureTextEntry={false}
                     onChangeText={setDescription}
                />

                <TouchableOpacity style={styles.sendButton}
                    onPress={() => enviar()}>
                     <Text style={styles.textobotao}>Adicionar</Text>
                </TouchableOpacity>

            </View>   
        </SafeAreaView>  
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height,
    marginBottom: 190,
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  sendButton: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  textobotao: {
    fontWeight: "bold",
  }
});

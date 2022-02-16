import React, { useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';


export default function Tela1({navigation}) {

    const[markers, setMarkers] = useState([]);

    useEffect(() => {
    async function fetchData() {
        const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', {
          headers: {
            Authorization: `Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF`
          }
        });
        const markers = await response.json();
        console.log(markers);
        setMarkers(markers);
      }
      fetchData();
    }, []);


    function renderItem({item}) {
        return <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <MapView style={styles.map}>
                {
                     markers.map((markers, id) => <Marker 
                     key={id}
                     coordinate = {{ latitude: markers.latitude , longitude: markers.longitude }}
                     title = {markers.title}
                     description = {markers.description}/>)
                 }
                </MapView>
            </View>
        </SafeAreaView>  
    }

  return (
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <FlatList
            data={markers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate ('Tela2')}
          style={styles.touchableOpacityStyle}>
          
        <AntDesign name="pluscircle" size={45} color="#131313" />
          
        </TouchableOpacity> 
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});

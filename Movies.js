import { StyleSheet,SafeAreaView,ScrollView,Text } from 'react-native'
import React from 'react'
import {Card } from 'react-native-elements'

const movies = (props) => {
  console.log('props', props)
  const { key, data } = props || {};
  const { title, poster_path, release_date, overview } = data || {};
  console.log({title, poster_path, release_date, overview})
  return (
    <SafeAreaView>
      <ScrollView>
          <Card>
              <Card.Title> {title}</Card.Title>
               <Card.Divider/>
               <Text style={styles.textInput}>{overview} </Text>
               <Text style={styles.textInput}>{release_date} </Text>
               <Card.Image style={styles.image} source={{uri : `https://image.tmdb.org/t/p/w500${poster_path}` }}/>
          </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default movies



 const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'    
      },
      textInput: {
        fontSize: 16,
        fontWeight : "bold" , 
        color:'black'
      }
    });


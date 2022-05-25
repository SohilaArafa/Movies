import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet , Text, View, ActivityIndicator, FlatList } from 'react-native';
import { useState , useEffect } from 'react';
import Movies from './Movies';
import {Card } from 'react-native-elements'


export default function App() {
  const [isloading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const moviesData = await axios(`http://api.themoviedb.org/3/discover/movie?api_key=382a8945f0041d16a2e3baf64ae2461d&page=${currentPage}`);
      console.log('movie results:', movies && movies.data && movies.data.results);
      if (moviesData && moviesData.data && moviesData.data.results) {
        setMovies(moviesData.data.results);
        setLoading(false);
      }
    })();
  }, [currentPage]);

  renderItem = ({item}) => {
    return (
      <View>
        <Image source= {{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} />
        <Text>{item.title}</Text>
        <Text>{item.overview}</Text>
        <Text>{item.release_date}</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
      isloading ? 
      <View>
        <ActivityIndicator size="large"/>
      </View> : null
    )
  }

  handleLoadMore = () => {
    setCurrentPage(currentPage+1)
  }


  return (
    <FlatList
    style= {styles.container}
    data={data}
    renderItem={this.renderItem}
    keyExtractor={(item,index) => index.toString()}
    ListFooterComponent={this.renderFooter}
    onEndReached={this.handleLoadMore}
    onEndReachedThreshold={0}
    />
  )}
    const styles = StyleSheet.create({
      container: {
        marginTop : 20,
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


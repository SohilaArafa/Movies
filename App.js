import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet , Text, View, ActivityIndicator, FlatList } from 'react-native';
import { useState , useEffect } from 'react';
//import Movies from './Movies';
//import {Card } from 'react-native-elements'


export default function App() {
  const [isloading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
        setIsLoading(true);
        this.getData()
        return () => {}
  }, [currentPage]);

  getData = async () => {
      await fetch(`http://api.themoviedb.org/3/discover/movie?api_key=382a8945f0041d16a2e3baf64ae2461d&page=${currentPage}`)
      .then((res)=> res.json())
      .then((resJson)  => {
        setMovies(movies.concat(resJson))
        setIsLoading(false)
      })
    }

  renderItem = ({movie}) => {
    return (
      <View style={styles.itemRow }>
        <Image source= {{uri : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}} style={styles.image} />
        <Text style={styles.textInput}>{movie.title}</Text>
        <Text style={styles.textInput}>{movie.overview}</Text>
        <Text style={styles.textInput}>{movie.release_date}</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
      isloading ? 
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>
      </View> : null
    )
  }

  handleLoadMore = () => {
    setCurrentPage(currentPage+1)
    setIsLoading(true)
  }


  return (
    <SafeAreaView> 
    <FlatList
    style= {styles.container}
    data={movies}
    renderItem={this.renderItem}
    keyExtractor={(movie,index) => index.toString()}
    ListFooterComponent={this.renderFooter}
    onEndReached={this.handleLoadMore}
    onEndReachedThreshold={0}
    />
    </SafeAreaView>
  )
}
    const styles = StyleSheet.create({
      container: {
        marginTop : 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#f5fcff'
      },
      itemRow : {
        borderBottomColor : '#ccc',
        marginBottom : 10,
        borderBottomWidth : 1
      },
      image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'    
      },
      textInput: {
        fontSize: 16,
        fontWeight : "bold" , 
        color:'black', 
        padding : 5
      } ,
      loader : {
        marginTop : 10,
        alignItems : 'center'
      }
    });
  
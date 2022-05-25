import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet , Text, View, ActivityIndicator } from 'react-native';
import { useState , useEffect } from 'react';
import Movies from './Movies';
import {Card } from 'react-native-elements'


export default function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const moviesData = await axios(`http://api.themoviedb.org/3/discover/movie?api_key=382a8945f0041d16a2e3baf64ae2461d&page=${page}`);
      console.log('movie results:', movies && movies.data && movies.data.results);
      if (moviesData && moviesData.data && moviesData.data.results) {
        setMovies(moviesData.data.results);
        setLoading(false);
      }
    })();
  }, [page]);

  return (
    <SafeAreaView>
      <ScrollView>
        { loading
          ? <ActivityIndicator visible={loading} textContent={'Loading'} />
          : 
           movies && movies.length 
              // ? movies.map((movieReq, idx) => <Movies key={idx} data={movieReq}/>)
            ? movies.map((movie, number) => {
              console.log('idx from app.js', number);
                // return <Movies key={idx} data={movieReq}/>
                    <ScrollView>
                        <Card key={number}>
                            <Card.Title> {movie.title}</Card.Title>
                            <Card.Divider/>
                            <Text style={styles.textInput}>{movie.overview} </Text>
                            <Text style={styles.textInput}>{movie.release_date} </Text>
                            <Card.Image style={styles.image} source={{uri : `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}/>
                        </Card>
                    </ScrollView>
              }) 
              : <Text> No Movies </Text> 
        }
      </ScrollView>
    </SafeAreaView>
  );
}
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


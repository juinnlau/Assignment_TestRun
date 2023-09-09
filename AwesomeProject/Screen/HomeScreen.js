import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Animated, TouchableOpacity, BackHandler, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBars from '../assets/SideBars';
import UserdataScreen from './UserdataScreen';
import TestScreen from '../Database/Usermanagement';
import SQLite from 'react-native-sqlite-storage';
import BottomTab from '../assets/BottomTab';
import MovieListScreen from '../Database/MovieListScreen';
import CinemaHome from './cinemahome';
import Websocket from './Websocket';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const moviesOnTrending = [
  {
    title: 'Life Of Game',
    image: require('../images/movie1.jpeg'),
    showtimes: 'Showtimes for Movie 1',
    description: 'Description for Movie 1. This is a great movie that you must watch!',
  },

];

const HomeScreenContent = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Check if user data is present in AsyncStorage
    AsyncStorage.getItem('userData')
      .then((data) => {
        if (data) {
          // User data found, indicating an active session
          const userData = JSON.parse(data);
          setUserData(userData);
        } else {
          // No user data found, session has expired, navigate to LoginScreen
          navigation.replace('LoginScreen');
        }
      })
      .catch((error) => {
        console.error('Error reading user data from AsyncStorage:', error);
      });

    // Filter movies based on the search query
    if (searchQuery) {
      const filtered = moviesOnTrending.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      // If the search query is empty, show all movies
      setFilteredMovies(moviesOnTrending);
    }

    // Add a listener for the hardware back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Show a confirmation dialog and handle the user's response
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => false, // Do nothing when canceled
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(), // Exit the app when confirmed
          },
        ],
        { cancelable: false }
      );

      // Return true to prevent the default back button behavior (exit the app)
      return true;
    });

    // Remove the listener when the component unmounts
    return () => backHandler.remove();
  }, [navigation, searchQuery]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const itemWidth = 400; // Width of each movie item
  const totalWidth = itemWidth * filteredMovies.length;

  const handleBannerPress = (showtimes) => {
    navigation.navigate('ShowtimesScreen', { showtimes });
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <Text style={styles.sectionTitle}>What's Trending</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={{ width: totalWidth }}
      >
        {filteredMovies.map((movie, index) => (
          <TouchableOpacity
            key={index}
            style={styles.movieContainer}
            //onPress={() => handleBannerPress(movie.CinemaHome)}
            // Disabled Press
          >
            <Image
              source={movie.image}
              style={styles.banner}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieDescription}>{movie.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  

      <BottomTab navigation={navigation} />
      
    </View>
  ); // Close the return statement for HomeScreenContent component
  };
  
  const HomeScreen = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <SideBars {...props} />
        )}
      >
          <Drawer.Screen
            name="HomeScreenContent"
            component={HomeScreenContent}
            options={{
              drawerLabel: 'Home',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Movie List"
            component={CinemaHome}
            options={{
              drawerLabel: 'Movies',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="film" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profiles"
            component={UserdataScreen}
            options={{
              drawerLabel: 'Profiles',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="TestScreen Database for User"
            component={TestScreen}
            options={{
              drawerLabel: 'TestScreen',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact Support"
            component={Websocket}
            options={{
              drawerLabel: 'Customer Support',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="envelope-o" color={color} size={size} />
              ),
            }}
          />
          {/* Add similar options for other screens */}

      </Drawer.Navigator>
    );
  };
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Change text color to dark gray
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieContainer: {
    width: 300,
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  banner: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 14,
    color: 'black', // Change text color to gray
  },
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  taskBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskBarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerItem: {
    marginBottom: 20,
  },
  drawerItemText: {
    fontSize: 20,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    width: 150,
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft: 10,
  },
});

export default HomeScreen;

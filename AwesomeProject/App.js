import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './Screen/getstarted';
import LoginScreen from './Screen/LoginScreen';
import UserdataScreen from './Screen/UserdataScreen';
import SignUpScreen from './Screen/SignUpScreen';
import SQLite from 'react-native-sqlite-storage';
import Usermanagement from './Database/Usermanagement';
import MovieDetails from './Database/Moviedetails';
import MovieListScreen from './Database/MovieListScreen';
import CinemaHome from './Screen/cinemahome';
import Showtime from './Screen/Showtime';
import SeatScreen from './Screen/SeatScreen';
import Datepick from './Screen/Showtime';
import DatepickerScreen from './Screen/Showtime';
import HomeScreen from './Screen/HomeScreen';
import PaymentScreen from './Screen/PaymentScreen';
import BookingHistory from './Screen/BookingHistory';
import AccountDetails from './Screen/AccountDetails';
import Aboutus from './Screen/Aboutus';
import Websocket from './Screen/Websocket'
import MovieDetail from './component/Moviedetail';
import NowPlaying from './component/NowPlaying';
import Upcoming from './component/Upcoming';
import apihome from './Database/api';

const Stack = createStackNavigator();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [db, setDb] = useState(null);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // Initialize the SQLite database for the User 
    const database = SQLite.openDatabase({ name: 'db.sqlite' });

    database.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT);',
          [],
          () => {
            
            setDbInitialized(true);
            setDb(database);
          },
          (error) => {
            console.error('Error creating table:', error);
            setDbInitialized(true);
          }
        );
      },
      null,
      null
    );
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Getstarted">
        <Stack.Screen name="LoginScreen">
          {props => <LoginScreen {...props} db={db} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}           options={{
            headerShown: false, // Hide the header for this screen
          }}/>
        <Stack.Screen name="Showtime" component={Showtime} />
        <Stack.Screen name="Usermanagement" component={Usermanagement} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="Aboutus" component={Aboutus} />
        <Stack.Screen name="SeatScreen" component={SeatScreen} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="CinemaHome" component={CinemaHome} />
        <Stack.Screen name="UserdataScreen"
                    component={UserdataScreen}
                    options={{
                      headerShown: false, // Hide the header for this screen
                    }}
                  />

        <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
      
        <Stack.Screen name="Getstarted" component={GetStarted} options={{
            headerShown: false, // Hide the header for this screen
          }}/>
        <Stack.Screen name="Websocket" component={Websocket} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
        <Stack.Screen name="Nowplaying" component={NowPlaying} />
        <Stack.Screen name="Upcoming" component={Upcoming} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

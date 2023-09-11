import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  // Function to handle the "Get Started" button press
  const handleGetStartedPress = () => {
    // Navigate to the LoginScreen when the button is pressed
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Logo in the middle */}
      <Image source={require('../images/applogo.png')} style={styles.logo} />

      {/* Transparent bottom tab */}
      <TouchableOpacity style={styles.bottomTab} onPress={handleGetStartedPress}>
        <Text style={styles.tabText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Set your background color
  },
  logo: {
    width: 200, // Adjust the size of your logo
    height: 200, // Adjust the size of your logo
    marginBottom: 50, // Adjust the margin as needed
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black', // Transparent background color
    padding: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Set your desired text color
  },
});

export default GetStarted;

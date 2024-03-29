import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image,  
  TouchableOpacity, 
  Platform} from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import ConfettiCanon from 'react-native-confetti-cannon';
  

  export default function ConnectionScreen({navigation}) {
   
    const backendUrl = 'https://jukebox-backend.vercel.app'
    const user = useSelector((state) => state.user.value);
    const [showConfetti, setShowConfetti] = useState(false);
     
    //appel de la route pour créer une nouvelle party avec le nom de la soirée
    //et confettis !
    const handleSubmit = () => {
      if(user.isDj && user.partyName){
      fetch(`${backendUrl}/newparty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           name: user.partyName,
           })
      }).then(response => response.json())
      .then(() => {
        setShowConfetti(true);
        setTimeout(() => {
          navigation.navigate('TabNavigator');
        }, 3700);
      })    
    }
  };
    
 
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.jpg')} />
        <View style={styles.containerRecap}>
          <Text style={styles.title}>Nom de la soirée</Text>          
            <View style={styles.divider}></View>          
          <Text style={styles.titleW}>{user.partyName}</Text>
          </View>
          <View style={styles.containerRecap}>
          <Text style={styles.title}>Connection Spotify</Text>
            <View style={styles.divider}></View>
          <Text style={styles.titleW}>tu es connecté(e)</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Go to Party !</Text>
          </TouchableOpacity>
          {showConfetti && (
           <ConfettiCanon
            count={200}
            origin={{x: -10, y: 0}}
            colors={['#ff2e2e', '#F0F', '#FFFACD', '#00FFFF', '#7FFFD4', '#00FF00', '#FF00FF', '#FFD700', '#FF7F50']}
            explosionSpeed={500}
            fallSpeed={2000}
            fadeOut={true}/>)} 
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom:70,
    borderRadius:20,
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 32,
      fontWeight: '600',
      marginBottom: 20,
      color: '#FAEE1C'
  },
  titleW: {
    fontSize: 32,
      fontWeight: '600',
      marginTop: 20,
      color: '#FFFFFF'
  },
  containerRecap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',

    paddingTop: 30,
    paddingBottom: 30,

  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',

    paddingTop: 30,
    borderRadius: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 70,
    backgroundColor: '#FAEE1C',
    borderRadius: 30,
  },
  textButton: {
    color: '#581B98',
    fontWeight: '600',
    fontSize: 28,
  },
  divider:{
    borderBottomColor: '#F3558E',
    borderBottomWidth: 1,
    width: '90%',      
  },
 
});




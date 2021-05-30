import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Game from './components/Game';
import Row from './components/Row';
import {huPlayer, board, winner, but, userTurnG} from './values/Values';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  
  // console.log('Human', huPlayer);
  console.log('Board',board);
  const [row1, setRow1] = useState(0);
  const [row2, setRow2] = useState(0);
  const [row3, setRow3] = useState(0);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Alert.alert('READY TO PLAY A GAME OF TIC TAC TOE');
    }
    else
    alert("READY TO PLAY A GAME OF TIC TAC TOE");
    for (let i=0;i<9;++i) {
      but[i] = false;
      userTurnG[i] = false;
    }
    console.log(userTurnG);
  },[]);

  return (
    // <View style={styles.container}>
    //   <View style={{ height: 200, width: 200,}}>
    //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <Row id={1} row = {row1} user={user} />
    //     <Row id={2} row = {row2} user={user} />
    //     <Row id={3} row = {row3} user={user} />
    //     </View>
    //   </View>
    // </View>
    <>
      {/* <Text style={styles.txt}>TIC TAC TOE</Text> */}
      <Game />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // txt: {
  //   fontSize: '50px',
  //   fontFamily: 'Texturina',
  //   padding: '5%',
  //   backgroundColor: '#ccccff',
  //   shadowColor: 'black',
  //       shadowOffset: { width: '1px', height: '2px' },
  //       shadowOpacity: 0.8,
  //       shadowRadius: 2,  
  //       elevation: 5,
  // }
});

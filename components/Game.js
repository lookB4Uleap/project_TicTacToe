import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PlatformColor, Button, Alert, NativeModules, LayoutAnimation } from 'react-native';
import { board, winner, setBoard, huPlayer, setPlayer, isEmpty, board2, minimax, game_scores, but, resetBoard, userTurnG } from '../values/Values';
import { AntDesign, Entypo } from '@expo/vector-icons';
import PlayAgain from './PlayAgain';
import { ImageBackground } from 'react-native';
import { Platform } from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

let w=60,h=60;

const Game = () => {

    const row = [0,1,2];
    const column = [0,1,2];
    // if (Platform.OS === 'android' || Platform.OS === 'ios') 
    // const img = require($`./mod-back2.jpg`);
    // else
    // const img = require($`./Large-Triangles.svg`);

    let ar = [], usr = [];

    for (let i=0; i<9; ++i) {
        ar[i] = false;
        usr[i] = false;
    }

    // console.log(usr);

    // const [but, setBut] = useState(ar);
    const [count, setCount] = useState(0);
    const [but1, setBut1] = useState(false);
    const [but2, setBut2] = useState(false);
    const [but3, setBut3] = useState(false);
    const [userTurn, setUserTurn] = useState(true);
    const [userTurn1, setUserTurn1] = useState(true);
    // const [userTurnG, setUserTurnG] = useState(usr);
    const [userTurn3, setUserTurn3] = useState(true);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        winner();
        if (!huPlayer) {
            let index = minimax(board2,false).index;
            but[index] = true;
            // setBut(but);            
            userTurnG[index] = huPlayer;
            // setUserTurnG(userTurnG);
            let n = parseInt(index/3);
            let num = index%3;
            setBoard(huPlayer, n, num);
            setPlayer(!huPlayer);
            setUserTurn(!userTurn);
            setCount(count+1);
            // console.log("Board",board);
            // console.log("Board2", board2);
        }

        // but[1] = true;
        // setBut(but);

        if (isEmpty()) {
            for (let i=0; i<9; ++i) {
                ar[i] = false;
                usr[i] = false;
                but[i] = false;
                userTurnG[i] = false;
            }
            setReset(true);
        }
        else
        setReset(false);
        
    },[JSON.stringify(board),reset,JSON.stringify(board2)]);    

    const icon = "closecircleo";

    const playAgain = () => {
        resetBoard();
    }

    return (
        // <View style={styles.container}>
        //     <View style={styles.inner}>
        //         <View styles={styles.rows}>
        //             <View style={styles.ele}>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //             </View>
        //         </View>
        //         <View styles={styles.rows}>
        //             <View style={styles.ele}>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //             </View>
        //         </View>
        //         <View styles={styles.rows}>
        //             <View style={styles.ele}>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //                 <TouchableOpacity style={styles.btn}></TouchableOpacity>
        //             </View>
        //         </View>
                
        //     </View>
        // </View>
        <View style={styles.container}>
            <ImageBackground source={(Platform.OS === 'android' || Platform.OS === 'ios') ? 
            require('./mod.jpg') : require('./Large-Triangles.svg')} 
            style={styles.image}>
            
            <View style={styles.inner}>
                <View style={styles.ele2}>
                <TouchableOpacity onPress = {() =>{
                    if (Platform.OS === 'android' || Platform.OS === 'ios') 
                        Alert.alert('Score  AI : ' + game_scores.ai + ' Human : ' + game_scores.human);
                    else
                        alert('Score  AI : ' + game_scores.ai + ' Human : ' + game_scores.human);
                }} 
                style={styles.but}
                ><Text style={{color: 'white', fontSize: 20}}>SCORE</Text></TouchableOpacity>
                {/* {(Platform.OS === 'android' || Platform.OS === 'ios')? 
                <TouchableOpacity style={styles.but} onPress={playAgain}><Text style={{color: 'white', fontSize: 20}}>RESET</Text></TouchableOpacity> : null}
                 */}
                </View>
                
                {row.map(
                    (n) => 
                        (<View key={n} styles={styles.rows}>
                            <View style={styles.ele}>

                                {column.map(
                                    (num) =>(
                                        <TouchableOpacity key={3*n+num} style={styles.btn} id={3*n+num}
                                        onPress={() => {
                                            if (board[n][num]==0) {
                                            but[3*n + num] = true;
                                            // setBut(but);
                                            userTurnG[3*n + num] = huPlayer;
                                            // setUserTurnG(userTurnG);
                                            setBoard(huPlayer, n, num);
                                            setPlayer(!huPlayer);
                                            setUserTurn(!userTurn);
                                            setCount(count+1);
                                            // console.log("Board",board);
                                            // console.log("Board2", board2);
                                            // winner();
                                            }
                                            else {
                                                return;
                                            }  
                                            // console.log(count);
                                        }}
                                        >
                                            {
                                                userTurnG[3*n + num] ? 
                                                (but[3*n + num] ? <AntDesign name={icon} size={30} color="black" /> : null)
                                                : (but[3*n + num] ? <AntDesign name="checkcircleo" size={30} color="black" /> : null)
                                            }
                                        </TouchableOpacity>        
                                    )
                                )}
                            </View>
                        </View>)
                    
                )}
                
                
                
            </View>
            </ImageBackground>
        </View>
    )
}

export default Game;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        backgroundColor: '#ccccff',
        display: 'flex',
        flexDirection: 'column',
        // padding: '20px',
        justifyContent: 'center',    
        alignItems: 'center',
        width: (Platform.OS === 'android' || Platform.OS === 'ios') ? '100%' : '50%',
        height: '50%',
        // borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        borderStyle: 'dashed',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
        elevation: 5,
        // opacity: 0.5
    },
    rows: {
        // backgroundColor: 'black',
        width: '100%',
    },
    ele: {
        // padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ele2: {
        // padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btn: {
        width: w,
        height: h,
        backgroundColor: 'white',
        margin: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    image: {
        display: 'flex',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        alignItems: 'center',
        justifyContent: "center"
    },

    but: {
        width: 100,
        height: 40,
        margin: 20,
        backgroundColor: '#bea1ff',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    }
});
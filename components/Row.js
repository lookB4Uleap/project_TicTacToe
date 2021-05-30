import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import {huPlayer, setPlayer, board, setBoard, winner, isEmpty} from '../values/Values';


const Row = ({id,row,user}) => {

    // console.log('H', huPlayer);
    const [count, setCount] = useState(0);
    const [but1, setBut1] = useState(false);
    const [but2, setBut2] = useState(false);
    const [but3, setBut3] = useState(false);
    const [userTurn, setUserTurn] = useState(true);
    const [userTurn1, setUserTurn1] = useState(true);
    const [userTurn2, setUserTurn2] = useState(true);
    const [userTurn3, setUserTurn3] = useState(true);
    
    useEffect(() => {
        winner();
        // console.log('Effect triggered');
      },[JSON.stringify(board)]);    

    useEffect(() => {
        if (row == 1)
        setBut1(true);
        if (row == 2) 
        setBut2(true);
        if (row == 3)
        setBut3(true);     
        // console.log(JSON.stringify(board));
        // setUserTurn(user);
    });

    const icon = "closecircleo";
    // const userTurn = true;

    return (
        <View style={styles.container}>
            <View style={[styles.box]}>
                <View style={{backgroundColor: 'red', height: 50, width: 50 }} >
                    <TouchableOpacity style={styles.icon} 
                        onPress={() =>  {
                            if (board[id-1][0]==0){ 
                            setBut1(true);
                            setUserTurn1(huPlayer);
                            setBoard(huPlayer, id-1, 0);
                            setPlayer(!huPlayer); 
                            setUserTurn(!userTurn);
                            setCount(count+1);
                            console.log("Board",board);
                            // winner();
                            }
                            else {
                                return;
                            }
                            // console.log("Id",id);
                            // console.log("Row",row);
                            // console.log(count);
                        }}
                        // onPress={setButton(setBut1(true))}
                    >
                        {isEmpty() ? null :
                            userTurn1 ? 
                            (but1 ? <AntDesign name={icon} size={30} color="black" /> : null)
                            : (but1 ? <AntDesign name="checkcircleo" size={30} color="black" /> : null)
                        }
                        
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.box]}>
                <View style={{backgroundColor: 'green', height: 50, width: 50  }}>
                    <TouchableOpacity style={styles.icon} onPress={() => {
                            if (board[id-1][1]==0) {
                            setBut2(true);
                            setUserTurn2(huPlayer);
                            setBoard(huPlayer, id-1, 1);
                            setPlayer(!huPlayer);
                            setUserTurn(!userTurn);
                            setCount(count+1);
                            console.log("Board",board);
                            // winner();
                            }
                            else {
                                return;
                            }  
                            // console.log(count);
                        }}
                    >
                    {
                    isEmpty() ? null :
                        userTurn2 ? 
                            (but2 ? <AntDesign name={icon} size={30} color="black" /> : null)
                            : (but2 ? <AntDesign name="checkcircleo" size={30} color="black" /> : null)
                    }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.box]}>
                <View style={{backgroundColor: 'blue', height: 50, width: 50} }>
                    <TouchableOpacity style={styles.icon} onPress={() => {
                            if (board[id-1][2]==0) {
                            setBut3(true);
                            setUserTurn3(huPlayer);
                            setBoard(huPlayer, id-1, 2);
                            setPlayer(!huPlayer);
                            setUserTurn(!userTurn);
                            setCount(count+1);
                            console.log("Board",board);
                            // winner();
                            }
                            else {
                                return;
                            }
                            // console.log(count);
                        }}>
                    {isEmpty() ? null :
                        userTurn3 ? 
                            (but3 ? <AntDesign name={icon} size={30} color="black" /> : null)
                            : (but3 ? <AntDesign name="checkcircleo" size={30} color="black" /> : null)
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default Row

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        width: 180,
    },
    box: {
        width: 50,
        height: 50,
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

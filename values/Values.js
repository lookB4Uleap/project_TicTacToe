// import {useState} from 'react';

import { Platform } from "react-native";
import { Alert } from "react-native";

let reset = false;
let iter = 0;
let game_scores = {
  ai: 0,
  human: 0
};
let but = new Array();
let userTurnG = new Array();

let huPlayer = true;
let board = [[0,0,0],
            [0,0,0],
            [0,0,0]];
let board2 = [0,1,2,3,4,5,6,7,8];

function setPlayer(p) {
    huPlayer = p;
}

function setBoard(p, row, col) {
    if (p) {
        board[row][col] = 1;
        board2[3*row+col] = 'H';
    }
    else {
        board[row][col] = 2;
        board2[3*row+col] = 'AI';
    }
}

const resetBoard = () => {
    for (let i=0;i<3;++i) {
      for (let j=0;j<3;++j) {
        board[i][j] = 0;
      }
    }
    for (let i=0;i<9;++i) {
      board2[i] = i;
    }
    huPlayer = true;
    // console.log("Scores",game_scores);
};

function isEmpty() {
  let count = 0;
  for (let i=0;i<3;++i) {
    for (let j=0;j<3;++j) {
      if (board[i][j] == 0) {
        count++;
      }
    }
  }
  if (count == 9) {
    return true;
  }
  else 
    return false;
}

function isDraw() {
  let count=0;
  for (let i=0;i<3;++i) {
    for (let j=0;j<3;++j) {
      if (board[i][j]==1 || board[i][j]==2) 
      count++;
    }
  }
  if (count==9) 
    return true;
  else
    return false;
}

function minimax(reboard, human) {
  iter++;

  let player;
  if (human) {
    player = 'H';
  }

  else {
    player = 'AI';
  }

  let array = avail(reboard);
  if (winning(reboard, true)) {
    return {
      score: -10
    };
  } else if (winning(reboard, false)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player === 'AI') {
      var g = minimax(reboard, true);
      move.score = g.score;
    } else {
      var g = minimax(reboard, false);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === 'AI') {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

function avail(reboard) {
  return reboard.filter(s => s != 'H' && s != 'AI');
}

const announceWinner = (e,opt) => {
  if (Platform.OS === 'android' || Platform.OS === 'ios'){
    Alert.alert('',e,[{
      text: 'OK',
    }]);   
  }
  else {
    alert(e);
  }
  if (opt === 'Human')
  game_scores.human++;
  else if (opt === 'AI')
  game_scores.ai++;
  // if (!(Platform.OS === 'android' || Platform.OS === 'ios'))
  resetBoard();
}

  const winner = () => {
    if ((board[0][0]==1 && board[0][1]==1 && board[0][2]==1) ||
    (board[1][0]==1 && board[1][1]==1 && board[1][2]==1) ||
    (board[2][0]==1 && board[2][1]==1 && board[2][2]==1) ||
    (board[0][0]==1 && board[1][1]==1 && board[2][2]==1) ||
    (board[2][0]==1 && board[1][1]==1 && board[0][2]==1) ||
    (board[0][0]==1 && board[1][0]==1 && board[2][0]==1) ||
    (board[0][1]==1 && board[1][1]==1 && board[2][1]==1) ||
    (board[0][2]==1 && board[1][2]==1 && board[2][2]==1)) {
      announceWinner('You Win!!', 'Human');
      // window.location.reload();
    }
    else if (
      (board[0][0]==2 && board[0][1]==2 && board[0][2]==2) ||
      (board[1][0]==2 && board[1][1]==2 && board[1][2]==2) ||
      (board[2][0]==2 && board[2][1]==2 && board[2][2]==2) ||
      (board[0][0]==2 && board[1][1]==2 && board[2][2]==2) ||
      (board[2][0]==2 && board[1][1]==2 && board[0][2]==2) ||
      (board[0][0]==2 && board[1][0]==2 && board[2][0]==2) ||
      (board[0][1]==2 && board[1][1]==2 && board[2][1]==2) ||
      (board[0][2]==2 && board[1][2]==2 && board[2][2]==2)
    ) {
      announceWinner('AI wins', 'AI');
    }
    else if (isDraw()) {
      announceWinner('Its a tie!!', 'Tie');
    }
  };

function winning(board, human) {
  let player;
  if (human) {
    player = 'H';
  }

  else {
    player = 'AI';
  }

  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}

export {huPlayer,setPlayer,board,setBoard, winner, isEmpty, board2, minimax, game_scores, but, resetBoard, userTurnG};
// export {setPlayer};
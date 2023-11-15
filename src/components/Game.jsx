import React from 'react'
import Board from './Board.jsx'
import {useState} from 'react'
import './Game.css'
import { FaStepBackward, FaStepForward, FaRedo } from 'react-icons/fa';

const Game = () => {

    const [xIsNext, setXIsNext] = useState(true);
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
      }

    const newGame = () => {
        jumpTo(0);
        setHistory([Array(9).fill(null)]);
    }

    const previousMove = () => {
        const previousMove = currentMove - 1;
        if (previousMove >= 0)
            jumpTo(previousMove);
    }

    const nextMove = () => {
        const nextMove = currentMove + 1;
        if (nextMove < history.length)
            jumpTo(nextMove);
    }

    // slice 1st history element which is an empty array "Go to game start" because we've already installed a new game button
    // so every task related to move will be move + 1 
    const moves = history.slice(1).map((squares, move) => {
        let description;

        description = 'Go to move #' + (move + 1) ;
        
        return (
          <li key={move}>
            <button className={`button-info ${move === currentMove - 1  ? 'hovered' : ''}`} onClick={() => jumpTo(move + 1)}>{description}</button>
          </li>
        );
      });

    return (
        <div className="game">
            <div className="game-board col-md-4 offset-md-4">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} startGame={() => newGame()}/>
                <div className="game-buttons">
                    <div className='button-game' onClick={() => previousMove()}><FaStepBackward></FaStepBackward></div>
                    <div className='button-game' onClick={() => nextMove()}><FaStepForward></FaStepForward></div>
                    <div className='button-game' onClick={() => newGame()}><FaRedo></FaRedo></div>
                </div>
           </div>
            
            <div className="game-info col-md-4">
                <ul>{moves}</ul>
            </div>
        </div>
        );
}

export default Game

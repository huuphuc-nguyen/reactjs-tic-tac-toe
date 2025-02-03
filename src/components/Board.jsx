import React from 'react'
import './Board.css'
import Square from './Square'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'antd';

const Board = ({xIsNext, squares, onPlay, startGame}) => {

  //---------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    startGame();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //---------------------------------------------------------
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || calculateDraw(squares))
    {
      if (calculateWinner(squares) || calculateDraw(squares)) {
        setIsModalOpen(true);
      }
      return;
    }

    const nextSquares = squares.slice();
    xIsNext ?  (nextSquares[i] = "X") : (nextSquares[i] = "O");
    
    onPlay(nextSquares);
  }

  //---------------------------------------------------------
  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  }

  function calculateDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null || squares[i] === '') {
            // If any square is still empty, the game is not a draw
            return false;
        }
    }
    // If all squares are filled and there's no winner, it's a draw
    return true;
}

  //---------------------------------------------------------
  const winner = calculateWinner(squares);
  const draw = calculateDraw(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (draw){
    status = "It's a draw";
  }
   else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  useEffect(() => {
    if (winner || draw) {
      setIsModalOpen(true);
    }
  }, [winner, draw]);

  

  //---------------------------------------------------------
  return (
    <div className='board'>
      <Modal 
        title={<div style={{textAlign: 'center'}}>🎉 Congratulation 🎉</div>} 
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            OK
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Start new game test
          </Button>,
        ]}>
             {winner ? (
              <span>{calculateWinner(squares)} is the winner</span>
              ) : (
                  <span>The game is a draw!</span>
              )}
      </Modal>

      <div>{status}</div>
      
      <div className="board-row">
        <Square value={squares[0]} onClickHandler={() => handleClick(0)} xIsNext={xIsNext}/>
        <Square value={squares[1]} onClickHandler={() => handleClick(1)} xIsNext={xIsNext}/>
        <Square value={squares[2]} onClickHandler={() => handleClick(2)} xIsNext={xIsNext}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClickHandler={() => handleClick(3)} xIsNext={xIsNext}/>
        <Square value={squares[4]} onClickHandler={() => handleClick(4)} xIsNext={xIsNext}/>
        <Square value={squares[5]} onClickHandler={() => handleClick(5)} xIsNext={xIsNext}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClickHandler={() => handleClick(6)} xIsNext={xIsNext}/>
        <Square value={squares[7]} onClickHandler={() => handleClick(7)} xIsNext={xIsNext}/>
        <Square value={squares[8]} onClickHandler={() => handleClick(8)} xIsNext={xIsNext}/>
      </div>
    </div>
  )
}

export default Board

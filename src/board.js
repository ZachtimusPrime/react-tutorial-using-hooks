import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';

export const Board = ({}) => {
    const [squareValues, setSquareValues] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState("");
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [stepNumber, setStepNumber] = useState(0);
    const [history, setHistory] = useState([]);
    const status = `Next player: ${currentPlayer}`;
    const winMessage = `Winner: ${winner}!`;
  
    useEffect(() => {
      setWinner(calculateWinner(squareValues))

    });
    useEffect(() => {
      if(winner === 'X') {
        setXWins(xWins + 1)
      } else if(winner === 'O') {
        setOWins(oWins + 1)
      }
    },[winner])
  
    const updateSquare = (i) => {
      if(!winner){
      const squares = squareValues.slice();
      squares[i] = currentPlayer;
      setSquareValues(squares);
      setHistory(history.concat({squares: squareValues}));
      (currentPlayer === "X") ? setCurrentPlayer("O") : setCurrentPlayer("X");
      }
    }
  
    const reset = () =>  { 
      setSquareValues(Array(9).fill(null)); 
      setCurrentPlayer("X")
      setWinner("");
      setHistory([])
    }

    function jumpTo(step) {
      setStepNumber(step);
      setCurrentPlayer((step % 2) === 0 ? 'X' : 'O')
      setSquareValues(history[step].squares);
      setHistory(history.slice(0,step))
    }
  
    
    function calculateWinner(squares) {  
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;

      }
      function renderSquare (i) {
        return (<Square
        char={squareValues[i]}
        onClick={() => updateSquare(i)}
        ></Square>
        )

      }
      const moves = history.map((step, move) => {
        const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        )
      })

    return (
      <div>
        <div>Wins
          <div>X: {xWins}</div>
          <div>O: {oWins}</div>
        </div>
        <button onClick={reset}>Reset</button>
        <div className="status">{winner ? winMessage : status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div>
        <h1>Past Moves</h1>
        {moves}
      </div>
      </div>

    );
  }

  export const Square =  (props) => ( 
    <button className="square" onClick={(!props.char) ? () => props.onClick() : () => {}} >
      {props.char}
    </button>
  );
       
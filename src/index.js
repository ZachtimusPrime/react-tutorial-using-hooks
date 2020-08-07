import React, { useState } from 'react';
import {Board} from './board'
import ReactDOM from 'react-dom';
import './index.css';


  
 
  
  const Game = () => {
      return (
        <div className="game">
          <div className="game-board">
            <Board/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  
  // ========================================
  
  ReactDOM.render(
   <Game/>,
    document.getElementById('root')
  );
  
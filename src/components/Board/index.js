import React from 'react';
import Square from './../Square';
function Board({ n, squares, onClick, winnerLine }) {
    let rows = [];
    for (let i = 0; i < n; i++) {
        rows = rows.concat([renderRow(i, n, squares, onClick, winnerLine)]);
    }
    return (
        <div>
            {rows}
        </div>
    );
};
function renderRow(i, n, squares, onClick, winnerLine) {
    let square = [];
    for (let j = 0; j < n; j++) {
        square = square.concat([(renderSquare(i * n + j, squares, winnerLine, onClick))]);
    }
    return (
        <div className="board-row" key={i}>
            {square}
        </div>
    );
}
function renderSquare(i, squares, winnerLine, onClick) {
    return (
        <Square
        highlight={winnerLine && winnerLine.includes(i)}
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        />
    );
};
export default Board;
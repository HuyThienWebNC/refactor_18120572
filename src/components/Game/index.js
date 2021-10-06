import classnames from 'classnames';
import React, { useState } from 'react';
import Board from './../Board';

export default function Game() {
    const [size, setSize] = useState(5);
    const [history, setHistory] = useState([
        {
            squares: Array(size * size).fill(null),
            location: null,
        },
    ]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [isAscending, setIsAscending] = useState(true);

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || calculateWinner(squares, size)) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...newHistory, { squares, step: i }]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const handleReset = () => {
        setHistory([
            {
                squares: Array(9).fill(null),
                location: null,
            },
        ]);
        setXIsNext(true);
        setStepNumber(0);
        setIsAscending(true);
    };
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const convertToLocation = (step, size) => {
        const col = Math.trunc(step / size) + 0;
        const row = (step % size) + 0;
        return [row, col];
    };

    const handleSortToggle = () => {
        setIsAscending(!isAscending);
    };

    {
        const newHistory = history;
        // const history = this.state.history;
        const current = newHistory[stepNumber];
        // const stepNumber = this.state.stepNumber;
        const winner = calculateWinner(current.squares, size);
        // const isAscending = this.state.isAscending;
        //const { winner, line } = calculateWinner(current.squares);
        const moves = newHistory.map((item, index) => {
            //const lastMoveSquare = step.lastMoveSquare;
            const [row, col] = convertToLocation(item.step, size);
            const desc = index ?
                'Go to move #' + index + ' (' + col + ', ' + row + ')' :
                'Go to game start';
            return (
                <li key={index}>
                    <button
                        className={classnames({ 'selected-item': stepNumber === index })}
                        onClick={() => jumpTo(index)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner.userWin;
        }
        else if (!((current.squares).includes(null))) {
            status = "Draw";
        }
        else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }

        if (!isAscending) {
            moves.reverse();
        }
        function HandleChange(e) {
            let value = e.target.value;
            value = value < 5 ? 5 : value;
            value = value > 35 ? 35 : value;
            setSize(value);
            handleReset();
        }
        return (
            <div className="game">
                <div className="game-board">
                    <div className="flex">
                        <div className="choose">Choose size of board(from 5 to 35):</div>
                        <input type="number" value={size} className="status" onChange={(e) => HandleChange(e)} />
                    </div>
                    <Board
                        n={size}
                        squares={current.squares}
                        onClick={(i) => handleClick(i)}
                        winnerLine={winner && winner.winnerSquares}
                    />
                </div>
                <div className="game-info">
                    <div className="turn">{status}</div>
                    <button onClick={handleReset}>Reset</button>
                    <button onClick={handleSortToggle}>
                        {isAscending ? 'Ascending' : 'Descending'}
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

}
function calculateWinner(squares, size) {
    if (squares) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - 5; j++) {
                if (squares[j + i * size] && squares[j + i * size] === squares[j + i * size + 1] && squares[j + i * size + 1] === squares[j + i * size + 2] && squares[j + i * size + 2] === squares[j + i * size + 3]
                    && squares[j + i * size + 3] === squares[j + i * size + 4]) {
                    const lines = [j + i * size, j + i * size + 1, j + i * size + 2, j + i * size + 3, j + i * size + 4];
                    return {
                        userWin: squares[j + i * size],
                        winnerSquares: lines
                    }
                }
            };
        };
        for (let j = 0; j < size; j++) {
            for (let i = 0; i <= size - 5; i++) {
                if (squares[j + i * size] && squares[j + i * size] === squares[j + (i + 1) * size] && squares[j + (i + 1) * size] === squares[j + (i + 2) * size]
                    && squares[j + (i + 2) * size] === squares[j + (i + 3) * size]
                    && squares[j + (i + 3) * size] === squares[j + (i + 4) * size]) {
                    const lines = [j + i * size, j + (i + 1) * size, j + (i + 2) * size, j + (i + 3) * size, j + (i + 4) * size];
                    return {
                        userWin: squares[j + i * size],
                        winnerSquares: lines
                    }
                }
            };
        };
        for (let j = 0; j < size; j++) {
            for (let i = 0; i <= size; i++) {
                if (squares[j + (size - i - 1) * size]
                    && squares[j + (size - i - 1) * size] === squares[(j + 1) + (size - (i + 1) - 1) * size]
                    && squares[(j + 1) + (size - (i + 1) - 1) * size] === squares[(j + 2) + (size - (i + 2) - 1) * size]
                    && squares[(j + 2) + (size - (i + 2) - 1) * size] === squares[(j + 3) + (size - (i + 3) - 1) * size]
                    && squares[(j + 3) + (size - (i + 3) - 1) * size] === squares[(j + 4) + (size - (i + 4) - 1) * size]) {
                    const lines = [j + (size - i - 1) * size, (j + 1) + (size - (i + 1) - 1) * size,
                    (j + 2) + (size - (i + 2) - 1) * size, (j + 3) + (size - (i + 3) - 1) * size,
                    (j + 4) + (size - (i + 4) - 1) * size];
                    return {
                        userWin: squares[j + (size - i - 1) * size],
                        winnerSquares: lines
                    }
                }
            };
        }
        for (let j = 0; j < size; j++) {
            for (let i = 0; i <= size; i++) {
                if (squares[j + i * size]
                    && squares[j + i * size] === squares[(j + 1) + (i + 1) * size]
                    && squares[(j + 1) + (i + 1) * size] === squares[(j + 2) + (i + 2) * size]
                    && squares[(j + 2) + (i + 2) * size] === squares[(j + 3) + (i + 3) * size]
                    && squares[(j + 3) + (i + 3) * size] === squares[(j + 4) + (i + 4) * size]) {
                    const lines = [j + i * size, j + 1 + (i + 1) * size, j + 2 + (i + 2) * size, j + 3 + (i + 3) * size, j + 4 + (i + 4) * size];
                    return {
                        userWin: squares[j + i * size],
                        winnerSquares: lines
                    }
                }
            };
        };      
    };
    return null;
}

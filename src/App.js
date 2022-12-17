import './App.css';
import React from "react";
import Circle from "./Circle";
import DropButton from "./DropButton";
import GameRules from "./GameRules";

class App extends React.Component {

    // index = מס' עמודה
    //cell = השחקן (הצבע)
    // row = מערך השורה בעצם כללל השורה
    state = {
        board: [[0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [["button"], ["button"], ["button"], ["button"], ["button"], ["button"], ["button"]]],
        currentPlayer: 1,
        player1: {
            color: "red"

        },
        player2: {
            color: "orange"

        }
    }

    drop = (index) => {

        let newBoard = this.state.board;
        let i;
        for (i = this.state.board.length - 1; i >= 0; i--) {
            if (newBoard[i][index] === 0) {
                break;
            }
        }
        if (i >= 0) {
            newBoard[i][index] = this.state.currentPlayer;
            this.setState({
                board: newBoard,
                currentPlayer: (this.state.currentPlayer === 1 ? 2 : 1)
            })
        }
    }

    checkRow = (rowIndex, cellIndex, cellColor) => {
        let counter = 0;
        for (let col = cellIndex; col < cellIndex + 4 && col < this.state.board[rowIndex].length; col++) {
            if (this.state.board[rowIndex][col] === cellColor) {
                counter++
                this.win(counter, cellColor)
            }
        }
    }

    checkCol = (rowIndex, cellIndex, cellColor) => {
        let counter = 0;
        for (let row = rowIndex; row > rowIndex - 4 && row >= 0; row--) {
            if (this.state.board[row][cellIndex] === cellColor) {
                counter++
                this.win(counter, cellColor)
            }
        }
    }

    refresh = () => {
        window.location.reload();
    };

    win = (counter, color) => {
        if (counter === 4) {
            if (color === 1) {
                alert("אדום ניצח לחץ אישור למשחק חדש")
                this.refresh()
            }
            if (color === 2) {
                alert("כתום ניצח לחץ אישור למשחק חדש")
                this.refresh()
            }
        }
    }

    render() {
        return (
            <div className="App">
                <h1> Connect-4 </h1>
                <button onClick={this.refresh}> משחק חדש </button>
                <table>
                    {this.state.board.map((row, index) => {
                        return (
                            <tr>
                                {row.map((cell, cellIndex) => {
                                    return (
                                        <td>
                                            <cell
                                                player={this.state.currentPlayer}
                                            />
                                            {cell === 0 ? <Circle color="white"/> :
                                                (cell === 1 ? <Circle color="red"/> :
                                                    (cell === 2 ? <Circle color="orange"/> :
                                                            <DropButton
                                                                index={cellIndex}
                                                                dropCircle={this.drop}
                                                            />
                                                    ))}
                                            {this.checkRow(index, cellIndex, cell)}
                                            {this.checkCol(index, cellIndex, cell)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default App;

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
            const color = this.state.currentPlayer;
            newBoard[i][index] = this.state.currentPlayer;
            this.setState({
                board: newBoard,
                currentPlayer: (this.state.currentPlayer === 1 ? 2 : 1)
            })
            this.checkCol(i, index, color)
            this.checkWinner("row",i, index, color)
            this.checkWinner("firstDiagonal",i, index, color)
            this.checkWinner("secondDiagonal",i, index, color)
        }

    }

    checkWinner = (kind, rowIndex, cellIndex, cellColor) => {
        if (kind === "row") {
            while (cellIndex>0 && this.state.board[rowIndex][cellIndex-1] === cellColor) {
                cellIndex--
            }
            this.checkRow(rowIndex,cellIndex,cellColor)
        }
        else if (kind === "firstDiagonal") {   // first diagonal is up left to down right -> \
            while (cellIndex>0 && rowIndex>0 && this.state.board[rowIndex-1][cellIndex-1] === cellColor) {
                cellIndex--
                rowIndex--
            }
            this.checkFirstDiagonal(rowIndex,cellIndex,cellColor)
        }
        else if (kind === "secondDiagonal") {   // first diagonal is up left to down right -> /
            while (cellIndex>0 && rowIndex<=6 && this.state.board[rowIndex+1][cellIndex-1] === cellColor) {
                cellIndex--
                rowIndex++
            }
            this.checkSecondDiagonal(rowIndex,cellIndex,cellColor)
        }

    }
    checkSecondDiagonal =  (rowIndex, cellIndex, cellColor) => {
        let counter = 0;
        for (let col = cellIndex, row = rowIndex; col < cellIndex + 4 && row> rowIndex-4 && col < this.state.board[rowIndex].length && row >= 0; col++, row--) {
            if (this.state.board[row][col] === cellColor) {
                counter++
                this.win(counter, cellColor)
            }
        }
    }

    checkFirstDiagonal =  (rowIndex, cellIndex, cellColor) => {
        let counter = 0;
        for (let col = cellIndex, row = rowIndex; col < cellIndex + 4 && row< rowIndex+4 && col < this.state.board[rowIndex].length && row < this.state.board.length; col++, row++) {
            if (this.state.board[row][col] === cellColor) {
                counter++
                this.win(counter, cellColor)
            }
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
        for (let row = rowIndex; row < rowIndex + 4 && row < this.state.board.length; row++) {
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
                                            {/*{this.checkRow(index, cellIndex, cell)}*/}

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

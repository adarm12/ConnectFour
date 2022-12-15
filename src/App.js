import './App.css';
import React from "react";
import Circle from "./Circle";
import DropButton from "./DropButton";

class App extends React.Component {


    state = {

        board: [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0],
            [0,0,0,0,2,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [<DropButton index={"0"}/>,
                <DropButton index={"1"}/>,
                <DropButton index={"2"}/>,
                <DropButton index={"3"}/>,
                <DropButton index={"4"}/>,
                <DropButton index={"5"}/>,
                <DropButton index={"6"}/>]],

        currentPlayer: 1
    };

    updateBoard = (newBoard) => {
        this.setState({
            board: newBoard
        })
    }



    render () {
        return (
            <div className="App">

                <table style={{alignItems: "center"}}>
                    {this.state.board.map((row,index) => {
                        return (
                            <tr>
                                {row.map((cell, cellIndex) => {
                                    return (
                                        <td>
                                            {cell===0?" ":
                                                (cell===1? <Circle color = "red"/>:
                                                    (cell===2? <Circle color = "blue"/>: cell))}
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

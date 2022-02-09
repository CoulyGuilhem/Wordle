import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderRows(coordonne){
        const rows = [];
        for (let i = 0; i < 10; i++){
            rows.push(this.renderSquare(i+coordonne*10))
        }
        return (
            <div className="board-row">
                {rows}
            </div>
        )
    }

    render() {
        const lines = [];
        let raw = [];
        for (let i = 0; i < 10; i++){
            raw = [];
            for (let j = 0; j < 10; j++) {
                raw.push(this.renderRows(j))
            }
            lines[i]=raw;
        }
        return (
            <div>
                {lines}

            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineTable: Array(10).fill(null),
            rowTable: Array(10).fill(null),
            lineMine: Array(10).fill(null),
            rowMine: Array(10).fill(null),
            gameState: ""
        };
        this.generateMines()
    }

    generateMines(){
        const lineMine = Array(10).fill(0)
        const rowMine = Array(10).fill(0)
        for (let i = 0 ; i < 2 ; i++){
            let randomLine = Math.round(Math.random() * (9 - 0))
            let randomRaw = Math.round(Math.random() * (9 - 0))
            do {
                randomLine = Math.round(Math.random() * (9 - 0))
                randomRaw = Math.round(Math.random() * (9 - 0))
            } while(lineMine[randomRaw] === 9 && rowMine[randomLine] === 9)
            lineMine[randomLine] = 9;
            rowMine[randomRaw] = 9;
        }
        console.log("---------------------Mines------------------")
        for(let i = 0 ; i < lineMine.length - 1; i++){
            for(let j = 0 ; j < rowMine.length - 1; j++){
                console.log("["+lineMine[i]+"]" + "["+rowMine[j]+"]")
            }
        }
        this.setState({
            lineMine:lineMine,
            rowMine:rowMine,
        })
        //this.generateWarning(lineMine,rawMine,10,10)

    }

    generateWarning(data,longueur,largeur){
        for(let i =0;i<data.length;i++){

            if (data[i] >= 9) {

                // Gere les 3 cases a gauche de la mine

                if (i !== 0 && i%longueur !==0) {
                    data[i - 1] = data[i - 1] + 1;
                    if (Math.floor(i / longueur) !== 0) {
                        data[i - 1 - longueur] = data[i - 1 - longueur] + 1;
                    }
                    if (Math.floor(i / longueur) !== largeur-1) {
                        data[i - 1 + longueur] = data[i - 1 + longueur] + 1;
                    }
                }
                // Gere les 3 cases a droite de la mine

                if(i !== data.length - 1 && i%longueur !== longueur-1) {
                    data[i + 1] = data[i + 1] + 1;
                    if (Math.floor(i / longueur) !== 0) {
                        data[i + 1 - longueur] = data[i + 1 - longueur] + 1;
                    }
                    if (Math.floor(i / longueur) !== largeur) {
                        data[i + 1 + longueur] = data[i + 1 + longueur] + 1;
                    }
                }

                // Gere la case au dessus de la mine

                if (Math.floor(i/longueur) !== 0){
                    data[ i - longueur ] = data[ i - longueur ] + 1;
                }
                // Gere la case en dessous de la mine


                 if (Math.floor(i/longueur) !== largeur){
                    data[ i + longueur ] = data[ i + longueur ] + 1
                 }
            }

        }
        for(let i = 0; i < data.length ; i++){
            if(data[i] >= 9 ){
                data[i] = 9;
            }
        }
        console.log("---------------------Mines + Chiffres------------------")
        console.log(data)
        this.setState({
            mine: data,
        });
    }

    handleClick(i) {
        if(this.state.gameState === ""){
            const lineTable = this.state.lineTable.slice();
            const rowTable = this.state.rowTable.slice();
            const rowMine = this.state.rawMine.slice();
            const lineMine = this.state.lineMine.slice();
            if(lineMine[i] === 0 && rowMine === 0){
                squares[i] = mine[i]
                this.setState({
                    squares: squares,
                })



                /**
                this.discoverZoneGauche(squares,i,10,10);
                this.discoverZoneDroite(squares,i,10,10);
                this.discoverZoneHaut(squares,i,10);
                this.discoverZoneBas(squares,i,10,10);
                 */

            } else {
                squares[i] = mine[i]
                this.setState({
                    squares: squares,
                })
            }

            /**
            if(mine[i] === 9){
                this.setState({
                    gameState: "BOOM",
                });
            }*/

            /**this.setState({
                squares: squares,
            });*/
        }
    }


    /**
    discoverZoneGauche(squares,i,longueur,largeur){

        const mine = this.state.mine.slice();

        // Gere les 3 cases a gauche de la mine
        squares[i] = mine[i];
        this.setState({squares: squares});
        if (i !== 0 && i%longueur !==0) {
            squares[i - 1] = mine[i - 1];
            this.setState({squares: squares});
            if (mine[i - 1] === 0) {
                this.discoverZoneGauche(squares, i - 1, 10, 10)
                //this.discoverZoneHaut(squares, i - 1, 10);
                //this.discoverZoneBas(squares,i -1,10,10);
            }

            /**
            if (Math.floor(i / longueur) !== 0) {
                squares[i - 1 - longueur] = mine[i - 1 - longueur];
                this.setState({squares: squares});
                if (mine[i - 1 - longueur] === 0) {
                    this.discoverZoneGauche(squares, i - 1 - longueur, 10, 10);
                }
            }
            if (Math.floor(i / longueur) !== largeur - 1) {
                squares[i - 1 + longueur] = mine[i - 1 + longueur];
                this.setState({squares: squares});
                if (mine[i - 1 + longueur] === 0) {
                    this.discoverZoneGauche(squares, i - 1 + longueur, 10, 10);
                }
            }
        }
    }
// Gere les 3 cases a droite de la mine
    discoverZoneDroite(squares,i,longueur,largeur) {

        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        if(i !== mine.length - 1 && i%longueur !== longueur-1) {
            squares[i + 1] = mine[i + 1];
            this.setState({squares: squares});
            if (mine[i + 1] === 0) {
                this.discoverZoneDroite(squares,i + 1, 10, 10)
                //this.discoverZoneHaut(squares, i + 1, 10);
                //this.discoverZoneBas(squares,i + 1,10,10);
            }
            /**
            if (Math.floor(i / longueur) !== 0) {
                squares[i + 1 - longueur] = mine[i + 1 - longueur];
                this.setState({squares: squares});
                if (mine[i + 1 - longueur] === 0) {
                    this.discoverZoneDroite(squares,i + 1 - longueur, 10, 10);
                }

                if (Math.floor(i / longueur) !== largeur - 1) {
                    squares[i + 1 + longueur] = mine[i + 1 + longueur];
                    this.setState({squares: squares});
                    if (mine[i + 1 + longueur] === 0) {
                        this.discoverZoneDroite(squares,i + 1 + longueur, 10, 10);
                    }
                }
            }
        }
    }

    discoverZoneHaut(squares,i,longueur) {
        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        // Gere la case au dessus de la mine
        if (Math.floor(i / longueur) !== 0) {
            squares[i - longueur] = mine[i - longueur];
            this.setState({squares: squares});
            if (mine [i - longueur] === 0) {
                this.discoverZoneGauche(squares, i - longueur, 10, 10);
                this.discoverZoneDroite(squares, i - longueur, 10, 10);
                this.discoverZoneHaut(squares, i - longueur, 10);
            }
        }
    }

    discoverZoneBas(squares,i,longueur,largeur) {
        const mine = this.state.mine.slice();
        squares[i] = mine[i];
        this.setState({squares: squares});
        if (Math.floor(i/longueur) !== largeur){
            squares[ i + longueur ] = mine[ i + longueur ];
            this.setState({squares: squares});
            if(mine[i+longueur] === 0){
                this.discoverZoneGauche(squares, i + longueur, 10, 10);
                this.discoverZoneDroite(squares, i + longueur, 10, 10);
                this.discoverZoneBas(squares,i + longueur,10,10);
            }
        }
    }
            // Gere la case en dessous de la mine
*/

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div>
                    <p>{this.state.gameState}</p>
                </div>
            </div>
        );
    }
}
// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));




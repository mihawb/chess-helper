import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ChessboardRow from "./ChessboardRow";

function Chessboard(props) {
    const [translatedFen, setTranslatedFen] = useState(Array.from({length: 8},()=> Array.from({length: 8}, () => "")));
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    useEffect(() => {
        setTranslatedFen(translateFen(fen))
    }, [])
    const translateFen = (fen) => {
        return fen.split("/").map(row => translateRow(row))
    }
    const translateRow = (row) => {
        let newRow = []
        row.split("").map(char => isNumeric(char) ? newRow.push(...translateSingle(char)) : newRow.push(translateSingle(char)))
        return newRow
    }
    const translateSingle = (char) => {
        if(isNumeric(char)){
            let array = []
            for(let i=0; i<parseInt(char); i++) {
                array.push("")
            }
            return array
        } else {
            return "/assets/" + char.toLowerCase() + (isLowerCase(char) ? "b" : "w") + ".png"
        }
    }
    const getStartColor = (index) => {
        return index % 2 === 0 ? "#ebecd0" : "#779556"
    }
    const isNumeric = (char) => {
        return /^\d+$/.test(char);
    }
    const isLowerCase = (char) => {
        return char === char.toLowerCase()
    }

    const changeTranslatedFen = (row, col) => {
        let newFen = translatedFen.map(row => row.map(cell => cell));
        newFen[row][col] = props.selected;
        setTranslatedFen(newFen)
    }
    const generateFen = (fenTable) => {
        let genFen = ""
        fenTable.map(row => {
            row.map( col => {
                let color = col.charAt(9)
                let char = col.charAt(8)
                if(color === "w")
                    char = char.toUpperCase()
                if(col === "") {
                    genFen = genFen + "e";
                } else {
                    genFen = genFen + char;
                }
            })
            genFen = genFen + "/";
        })
        genFen = genFen.substring(0, genFen.length-1)
        return clearEmpty(genFen)
    }
    const clearEmpty = (notClearedFen) => {
        let globalAns = ""
        let fenRows = notClearedFen.split("/")
        let freeSpaces = 0;
        for(let i=0; i < fenRows.length; i++) {
            let localAns = ""
            for(let j=0; j < fenRows[i].length; j++) {
                if(fenRows[i][j] === "e" && j!==fenRows[i].length-1) {
                    freeSpaces += 1
                } else if(fenRows[i][j] === "e" && j===fenRows[i].length-1) {
                    localAns += freeSpaces + 1
                    freeSpaces = 0
                } else if(fenRows[i][j] === "e" && freeSpaces !== 0) {
                    localAns += freeSpaces
                    localAns += fenRows[i][j]
                    freeSpaces = 0
                } else {
                    localAns  += fenRows[i][j]
                }
            }
            globalAns += localAns + '/'
            freeSpaces = 0
        }
        globalAns = globalAns.substring(0, globalAns.length-1)
        return globalAns
    }
    return <>
        <Container className="border-bottom-3 border border-dark border-3" style={{width: "65vh", maxHeight: "65vh"}}>
            {translatedFen.map((row, i) => <ChessboardRow row={i} cols={row} changeTranslatedFen={changeTranslatedFen} startColor={getStartColor(i)} key={i} />)}
        </Container>
    </>
}

export default Chessboard;
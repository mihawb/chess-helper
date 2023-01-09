import { Container } from "react-bootstrap";
import ChessboardRow from "./ChessboardRow";

function Chessboard(props) {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
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
    const rows = [8, 7, 6, 5, 4, 3, 2, 1]
    const getStartColor = (index) => {
        return index % 2 === 0 ? "#ebecd0" : "#779556"
    }
    const isNumeric = (char) => {
        return /^\d+$/.test(char);
    }
    const isLowerCase = (char) => {
        return char === char.toLowerCase()
    }
    
    return <>
        <Container className="border-bottom-3 border border-dark border-3" style={{width: "65vh", maxHeight: "65vh"}}>
            {rows.map((row, i) => <ChessboardRow row={row} key={row} startColor={getStartColor(i)} selected={props.selected} rowPieces={translateFen(fen)[i]}/>)}
        </Container>
    </>
}

export default Chessboard;
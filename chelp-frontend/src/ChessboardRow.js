import { Row } from "react-bootstrap";
import ChessboardCell from "./ChessboardCell";

function ChessboardRow(props) {
    const cells = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const getCellColor = (index) => {
        return index % 2 === 1 ? props.startColor : getOpositeColor(props.startColor)
    }
    const getOpositeColor = (color) => {
        return color === "#ebecd0" ? "#779556" : "#ebecd0"
    }
    return <>
        <Row>
            {cells.map((cell,i) => <ChessboardCell row={props.row} cell={cell} key={cell} color={getCellColor(i)} selected={props.selected} piece={props.rowPieces[i]}/>)}
        </Row>
    </>
}

export default ChessboardRow;
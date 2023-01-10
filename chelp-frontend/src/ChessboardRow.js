import { Row } from "react-bootstrap";
import ChessboardCell from "./ChessboardCell";

function ChessboardRow(props) {
    const getCellColor = (index) => {
        return index % 2 === 1 ? props.startColor : getOpositeColor(props.startColor)
    }
    const getOpositeColor = (color) => {
        return color === "#ebecd0" ? "#779556" : "#ebecd0"
    }
    return <>
        <Row>
            {props.cols.map((col, i) => <ChessboardCell row={props.row} col={i} img={col} color={getCellColor(i)} changeTranslatedFen={props.changeTranslatedFen} key={i} /> )}
        </Row>
    </>
}

export default ChessboardRow;
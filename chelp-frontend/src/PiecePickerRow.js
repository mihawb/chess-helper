import { Row } from "react-bootstrap";
import PiecePickerCell from "./PiecePickerCell";

function PiecePickerRow(props) {
    return <>
        <Row>
            {props.row.map((img, i) => <PiecePickerCell img={img} key={img} colId={i} rowId={props.rowId} changeSelected={props.changeSelected}/>)}
        </Row>
    </>
}

export default PiecePickerRow;
import { Row } from "react-bootstrap";
import PiecePickerCell from "./PiecePickerCell";

function PiecePickerRow(props) {
    return <>
        <Row>
            {props.row.map(img => <PiecePickerCell img={img} key={img} changeSelected={props.changeSelected}/>)}
        </Row>
    </>
}

export default PiecePickerRow;
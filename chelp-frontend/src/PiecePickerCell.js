import { Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

function PiecePickerCell(props) {
    const onClickCell = () => {
        props.changeSelected(props.img, props.rowId, props.colId)
    }
    return <>
        <Col onClick={onClickCell} style={{width: "6vh", height: "6vh"}}>
            <Image fluid src={props.img}></Image>
        </Col>
    </>
}

export default PiecePickerCell;
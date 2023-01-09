import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Chessboard from "./Chessboard";
import PiecePicker from "./PiecePicker";

function ChessboardPage() {
    const [selected, setSelected] = useState("")
    const changeSelected = (imgSelected) => {
        if(imgSelected==="/assets/trash.png")
            setSelected("")
        else
            setSelected(imgSelected)
    }
    return <>
        <Container fluid className="mt-3">
            <Row>
                <Col className="col-2">
                    <PiecePicker changeSelected={changeSelected}/>
                </Col>
                <Col className="col-3">
                    <Chessboard selected={selected}/>
                </Col>
            </Row>
        </Container>

    </>
}

export default ChessboardPage;
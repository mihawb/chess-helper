import { useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import Chessboard from "./Chessboard";
import PiecePicker from "./PiecePicker";

function ChessboardPage(props) {
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
            <Row className="mt-4 ms-3">
                <Col className="col-6">
                    <ProgressBar style={{}}>
                        <ProgressBar variant="light" now={100} />
                        <ProgressBar variant="dark" now={100} />
                    </ProgressBar>
                </Col>
            </Row>
            <p>fen (or stub from backend) debug: {props.fen}</p>
        </Container>

    </>
}

export default ChessboardPage;
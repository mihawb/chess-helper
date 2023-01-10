import { useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import Chessboard from "./Chessboard";
import PiecePickerRow from "./PiecePickerRow";

function ChessboardPage(props) {
    const [selected, setSelected] = useState("")
    const [rows, setRows] = useState([["/assets/pw.png","/assets/pb.png"],["/assets/nw.png","/assets/nb.png"],["/assets/bw.png","/assets/bb.png"],
    ["/assets/rw.png","/assets/rb.png"],["/assets/qw.png","/assets/qb.png"],["/assets/kw.png","/assets/kb.png"],["/assets/str.png"]])

    const cleared = [["/assets/pw.png","/assets/pb.png"],["/assets/nw.png","/assets/nb.png"],["/assets/bw.png","/assets/bb.png"],
    ["/assets/rw.png","/assets/rb.png"],["/assets/qw.png","/assets/qb.png"],["/assets/kw.png","/assets/kb.png"],["/assets/tr.png"]]

    const changeSelectedImage = (row, col) => {
        let newRows = cleared.map(row => row.map(img => img))
        if(newRows[row][col].length !==15)
            newRows[row][col] = newRows[row][col].substring(0,8) + "s" + newRows[row][col].substring(8)
        setRows(newRows)
    }
    const changeSelected = (imgSelected, row, col) => {
        if(imgSelected==="/assets/tr.png" || imgSelected==="/assets/str.png")
            setSelected("")
        else if(imgSelected.length===15){

        } else
            setSelected(imgSelected)
        changeSelectedImage(row,col)
    }
    return <>
        <Container fluid className="mt-3">
            <Row>
                <Col className="col-2">
                    <Container className="border-bottom-3 border border-dark border-3" style={{width: "16vh", height: "45vh"}}>
                        {rows.map((row, i) => <PiecePickerRow row={row} key={row} rowId={i} changeSelected={changeSelected}/>)}
                    </Container>
                </Col>
                <Col className="col-8 ms-3 flex-row justify-content-center">
                    <Chessboard selected={selected}/>
                </Col>
            </Row>
            <Row className="mt-4 ms-3 d-flex flex-row justify-content-center">
                <Col className="col-6">
                    <ProgressBar style={{}} min={0} max={201}>
                        <ProgressBar variant="light" now={100} />
                        <ProgressBar variant="danger" now={1} />
                        <ProgressBar variant="dark" now={100} />
                    </ProgressBar>
                </Col>
            </Row>
            <p>fen (or stub from backend) debug: {props.fen}</p>
        </Container>

    </>
}

export default ChessboardPage;
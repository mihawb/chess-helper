import { useState } from "react";
import { Button, ButtonGroup, Col, Container, ListGroup, ProgressBar, Row, ToggleButton } from "react-bootstrap";
import Chessboard from "./Chessboard";
import PiecePickerRow from "./PiecePickerRow";

// for one side so max for both is 2 * this + 1
const PROGRESS_RANGE = 50

function ChessboardPage(props) {
    const [selected, setSelected] = useState("")
    const [move, setMove] = useState("black")
    const [blackVal, setBlackVal] = useState(PROGRESS_RANGE)
    const [whiteVal, setWhiteVal] = useState(PROGRESS_RANGE)
    const [bestMoves, setBestMoves] = useState([])
    const [evaluate, setEvaluate] = useState(0)
    const [evalFen, setEvalFen] = useState(props.fen)
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
    const toMove = ['white', 'black']
    const changeSelected = (imgSelected, row, col) => {
        if(imgSelected==="/assets/tr.png" || imgSelected==="/assets/str.png")
            setSelected("")
        else if(imgSelected.length===15){

        } else
            setSelected(imgSelected)
        changeSelectedImage(row,col)
    }

    const getStockfishEvaluation = () => {
        const formData = new FormData()
        formData.append('fen', evalFen)
        formData.append('side', move)
        
        console.log('eval req sent...')
        console.log(evalFen)
        console.log(move)

        const wl = window.location
        fetch(wl.protocol + '//' + wl.host + '/bestmoves/',
        // fetch(wl.protocol + '//' + wl.hostname + ':4000/bestmoves/', // for speed dev without front build
            {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }
        )
            .then(res => res.json())
            .then(j => {
                const bestmoves = j.best_moves.map(m => m.Move)
                setBestMoves(bestmoves)
                const diff = j.evaluation.value / 100
                setEvaluate(diff)
                setBlackVal(PROGRESS_RANGE - diff)
                setWhiteVal(PROGRESS_RANGE + diff)
            })
            .catch(err => console.log(err))
    }

    return <>
        <Container fluid className="mt-3">
            <Row>
                <Col className="col-2">
                    <Row>
                    <Container className="border-bottom-3 border border-dark border-3" style={{width: "16vh", height: "45vh"}}>
                        {rows.map((row, i) => <PiecePickerRow row={row} key={row} rowId={i} changeSelected={changeSelected}/>)}
                    </Container>
                    </Row>
                    <Row className="mt-4">
                        <ButtonGroup>
                            {toMove.map((side, i) => <ToggleButton key={i} id={`radio-${i}`} type='radio' variant="light" name='radio' value={side} checked={side === move} onChange={(e) => setMove(e.currentTarget.value)}>{side}</ToggleButton>)}
                        </ButtonGroup>
                    </Row>
                    <Row className="mt-4 mx-2">
                        <Button variant="secondary" onClick={getStockfishEvaluation}>Send to evaluate</Button>
                    </Row>
                </Col>
                <Col className="col-8 ms-3 flex-row justify-content-center">
                    <Chessboard pov={props.pov} fen={props.fen} setEvalFen={setEvalFen} setFen={props.setFen} selected={selected}/>
                </Col>
                <Col className="me-5 align-self-center">
                    <ListGroup >
                        <ListGroup.Item variant='dark'>Best moves</ListGroup.Item>
                        {bestMoves.map( (bestMove, i) => <ListGroup.Item>{i+1 + ". " +bestMove}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
            <Row className="mt-4 ms-3 d-flex flex-row justify-content-center">
                <Col className="col-1 ms-5 ps-5">
                    {evaluate}
                </Col>
            </Row>
            <Row className="mt-4 ms-3 d-flex flex-row justify-content-center">
                <Col className="col-6">
                    <ProgressBar style={{}} min={0} max={2*PROGRESS_RANGE+1}>
                        <ProgressBar variant="light" now={whiteVal} />
                        <ProgressBar variant="danger" now={1} />
                        <ProgressBar variant="dark" now={blackVal} />
                    </ProgressBar>
                </Col>
            </Row>
        </Container>

    </>
}

export default ChessboardPage;
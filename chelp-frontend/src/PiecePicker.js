import PiecePickerRow from "./PiecePickerRow";
import {Container} from "react-bootstrap";


function PiecePicker(props) {
    const rows = [["/assets/pw.png","/assets/pb.png"],["/assets/nw.png","/assets/nb.png"],["/assets/bw.png","/assets/bb.png"],
    ["/assets/rw.png","/assets/rb.png"],["/assets/qw.png","/assets/qb.png"],["/assets/kw.png","/assets/kb.png"]]
    return <>
        <Container className="border-bottom-3 border border-dark border-3" style={{width: "16vh", height: "45vh"}}>
            {rows.map(row => <PiecePickerRow row={row} key={row} changeSelected={props.changeSelected}/>)}
            <PiecePickerRow row={["/assets/trash.png"]} changeSelected={props.changeSelected}/>
        </Container>
    </>
}

export default PiecePicker;
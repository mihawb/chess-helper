import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'


function ChessboardCell(props) {
    const [img, setImg] = useState("")
    const onClickCell = () => {
        setImg(props.selected)
    }
    useEffect(() => {
        setImg(props.piece)
    }, [])
    return <>
        <Col onClick={onClickCell} className="d-flex justify-content-center align-items-center" style={{width: "8vh", height: "8vh", backgroundColor: props.color}}>
            <Image style={{backgroundColor: "transparent"}} fluid src={img}></Image>
        </Col>
    </>
}

export default ChessboardCell;
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'


function ChessboardCell(props) {
    const onClickCell = () => {
        props.changeTranslatedFen(props.row, props.col)
    }
    return <>
        <Col onClick={onClickCell} className="d-flex justify-content-center align-items-center" style={{width: "8vh", height: "8vh", backgroundColor: props.color}}>
            <Image style={{backgroundColor: "transparent"}} fluid src={props.img}></Image>
        </Col>
    </>
}

export default ChessboardCell;
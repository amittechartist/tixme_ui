import React from "react";
import Col from "react-bootstrap/Col";
import Flip from 'react-reveal/Flip';
const Component = ({ title }) => {
    return(
        <Col
            md={12}
            className="title-banner d-flex justify-content-center py-5"
          >
            <Flip top cascade><h3 className="title-banner-h3">{title}</h3></Flip>
          </Col>
    )
}
export default Component;
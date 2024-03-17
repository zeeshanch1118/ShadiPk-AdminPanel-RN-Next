'use client'
// import node module libraries
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
// import required data files

const Home = () => {
    return (
        <Fragment>
            <div className=" pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                       <h5 className="fs-30">Dashboard</h5>
                    </Col>
                  
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;
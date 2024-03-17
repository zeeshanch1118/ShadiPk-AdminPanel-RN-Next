
'use client'
// import node module libraries
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import SignIn from "./components/sign-in/page";
// import required data files

const Home = () => {
    return (
        <Fragment>
            <Container fluid className="d-flex flex-column">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                     <SignIn/>
                    </Col>
                  
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;

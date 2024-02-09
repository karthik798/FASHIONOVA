import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'black', marginTop: '80px' }}>
            <Container id='navcontainer' className='text-white fluid'>
                <Row>
                    <Col className='text-left py-3'>

                        <Nav className="ml-auto">
                            <LinkContainer to='/about'>
                                <Nav.Link>About</Nav.Link></LinkContainer>
                                <LinkContainer to='/contact'><Nav.Link>Contact</Nav.Link></LinkContainer>
                        </Nav>
                    </Col>
                    <Col className='text-right py-3'>
                        Copyright &copy; FASHIONOVA</Col>



                </Row>
            </Container>

        </footer>
    )
}
export default Footer
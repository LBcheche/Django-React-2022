import React from 'react'
import  { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy; The No Place Market <br>
                </br> This demonstration site is part of <a href="https://github.com/LBcheche">Leo Bcheche's Portfolio</a></Col>
            </Row>
   
        </Container>
    </footer>
  )
}

export default Footer

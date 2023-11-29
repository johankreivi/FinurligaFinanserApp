import { FC, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Home: FC = () => {  


return(
    <Container>
        <Row>
            <Col>
                <h1 className='text-light text-center'>HomeView</h1>                
            </Col>
        </Row>

        <Row className='text-center'>
            <Col>
                <Link to="/register">
                    <Button className='m-2' variant='light'>
                        Registrera
                    </Button>
                </Link>

                <Link to="/signin">
                    <Button className='m-2' variant='light'>
                        Logga in
                    </Button>
                </Link>               
            </Col>
        </Row>
    </Container>       
    );
}

export default Home;
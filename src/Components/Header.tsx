import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header: FC = () => {  
return(
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Link to="/register">
                    <Button className='m-2' variant='light'>
                        Registrera
                    </Button>
                </Link>

                <Link to="/">
                    <Button className='m-2' variant='light'>
                        Logga in
                    </Button>
                </Link>               
            </Nav>
        </Container>
    </Navbar>     
    );
}

export default Header;
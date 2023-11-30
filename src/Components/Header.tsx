import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { IHeaderProps } from '../Models/Interfaces/IHeaderProps';

const Header: FC<IHeaderProps> = (props) => {  
return(
    <Navbar bg="dark" variant="dark" className='mx-0 px-0'>
        <Container>
            <Nav className="w-100 flex d-flex justify-content-between">
            <Navbar.Brand href="#home">Finurliga Finanser</Navbar.Brand>
                               
            <h1>{props.userName}</h1>
            <h1>{props.balance} kr</h1>
            <Link to="/">
                    <Button className='m-2' variant='light'>
                        Logga ut
                    </Button>
            </Link>
            </Nav>

        </Container>
    </Navbar>     
    );
}

export default Header;
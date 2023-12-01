import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { IHeaderProps } from '../Models/Interfaces/IHeaderProps';

const Header: FC<IHeaderProps> = (props) => {  
    const handleLogout = () =>  props.removeCookie!();
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='mx-0 px-0'>
            <Container fluid>
                    <Navbar.Brand>
                        <img
                            src="/fflogo.png" 
                            width="auto" 
                            height="80" 
                            className="d-inline-block align-top"
                            alt="FF logo"
                        />
                        
                    </Navbar.Brand>                    
                    <div style={{ border: '1px solid white', borderRadius: '10px' }}>               
                        <h3 style={{padding: '10px'}}>{props.userName} {props.balance} kr</h3>
                    </div>
                    <h1>Finurliga Finanser</h1>
                    <Button className='m-2' onClick={props.handleShowModal}>Skapa bankkonto</Button>
                    <Link to="/">
                        <Button className='m-2' variant='light' onClick={handleLogout}>
                            Logga ut
                        </Button>
                    </Link>            
            </Container>
        </Navbar>     
    );
}

export default Header;
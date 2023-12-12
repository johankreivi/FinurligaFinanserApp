import { FC, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { IHeaderProps } from '../Models/Interfaces/IHeaderProps';


const Header: FC<IHeaderProps> = (props) => {  
    const redirect = useNavigate();    
    const audioRef = useRef(new Audio('/oink.wav'));
    const handleLogout = () =>  props.removeCookie!();
    const handleClick = () => {
        audioRef.current.play(); 
        redirect('/home');
    };
    
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='mx-0 px-0' style={{borderBottom: '1px solid #3DB2AF'}}>
            <Container fluid >
                    <Navbar.Brand>                        
                        <img
                            src="/fflogo.png" 
                            height="80" 
                            className="d-inline-block align-top rounded cursor-pointer"
                            alt="FF logo"
                            data-testid="header-logo"
                            style={{ border: '1px solid #3DB2AF', borderRadius: '10px', cursor: 'pointer' }}
                            onClick={handleClick}
                            onKeyUp={handleKeyPress}
                            tabIndex={1}
                        />                        
                    </Navbar.Brand>                   
                    <div><h1>Finurliga Finanser</h1><p className='text-center fst-italic'>"Banken som inte ställer några frågor..."</p></div>
                    <div className= 'text-center rounded' style={{ border: '1px solid #3DB2AF', backgroundColor: '#001A2F' }}>               
                        <h6 className='pt-1 ps-2 pe-2 pb-0' data-testid="header-username-and-balance">{props.userDetails.firstName} {props.userDetails.lastName}</h6>
                        <Link to="/">
                        <Button className='mb-2 ms-1 me-1 btn-sm' variant='light' onClick={handleLogout} data-testid="header-logout-button" >
                            Logga ut
                        </Button>
                    </Link>
                    </div>
            </Container>
        </Navbar>     
    );
}

export default Header;
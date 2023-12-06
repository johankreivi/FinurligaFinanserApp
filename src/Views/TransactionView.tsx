import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { UserDetails } from '../Models/Dto/UserDetails';
import { ITransactionViewProps } from '../Models/Interfaces/ITransactionViewProps';
import TransactionList from '../Components/TransactionList';
import { TransactionDetails } from '../Models/Dto/TransactionDetails';
import { getUserDetails } from '../Services/APIService';

const TransactionView: FC<ITransactionViewProps> = (props) => {  
    const dummyData: TransactionDetails[] = [
        {
            accountBalance: 1, amount: 1, message: "transaction-1", receivingAccountNumber: 1111111111, sendingAccountNumber: 2222222222, timeStamp: new Date(), transactionType: 0
        },
        {
            accountBalance: 2, amount: 2, message: "transaction-2", receivingAccountNumber: 3333333333, sendingAccountNumber: 4444444444, timeStamp: new Date(), transactionType: 1
        },
        {
            accountBalance: 3, amount: 3, message: "transaction-3", receivingAccountNumber: 5555555555, sendingAccountNumber: 6666666666, timeStamp: new Date(), transactionType: 2
        }
    ]

    const redirect = useNavigate();    
    const handleRedirectBack = () => redirect('/home');

    
    useEffect(() => {
        if(!props.cookieUser || !props.cookieUser.isAuthorized){
            alert('cookiproblem');
            redirect('/');
        }

        const getFullName = async () => {
            const user = await getUserDetails(props.cookieUser?.id);
            setUserDetails(user);
        }

        getFullName();
    }, [props.cookieUser, props.cookieUser.isAuthorized, redirect]);

    

    const [userDetails, setUserDetails] = useState<UserDetails>({id: -1, firstName: "", lastName: ""});


    return(
        <Container className="mx-0 px-0" fluid style={{color: 'white'}}>
            <Header 
                removeCookie={props.removeCookie}
                setCookie={props.setCookie}
                userDetails={userDetails} 
            />
            <TransactionList handleRedirectBack={handleRedirectBack} transactions={dummyData} />
        </Container>
    );
}

export default TransactionView;
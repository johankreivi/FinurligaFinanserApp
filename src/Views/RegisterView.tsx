import { FC, useEffect, useState } from 'react';
import RegisterForm from '../Components/RegisterForm';

interface IRegisterViewProps {
    handleAlert: (success: boolean) => void;
}

const RegisterView: FC<IRegisterViewProps> = (props) => {  

return(
        <RegisterForm handleAlert={props.handleAlert}/>
    );
}

export default RegisterView;
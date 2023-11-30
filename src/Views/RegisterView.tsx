import { FC } from 'react';
import RegisterForm from '../Components/RegisterForm';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';

const RegisterView: FC<IRegisterFormProps> = (props) => {  

return(
        <RegisterForm setIsAuthorized={props.setIsAuthorized} handleAlert={props.handleAlert} setAlertMessage={props.setAlertMessage} />
    );
}

export default RegisterView;
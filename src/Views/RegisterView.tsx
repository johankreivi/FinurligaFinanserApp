import { FC } from 'react';
import RegisterForm from '../Components/RegisterForm';
import { IFormProps } from '../Models/Interfaces/IFormProps';

const RegisterView: FC<IFormProps> = (props) => {  

return(
        <RegisterForm handleAlert={props.handleAlert} setAlertMessage={props.setAlertMessage} />
    );
}

export default RegisterView;
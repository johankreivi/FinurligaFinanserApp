import { FC } from 'react';
import SignInForm from '../Components/SignInForm';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';

const SignInView: FC<IRegisterFormProps> = (props : IRegisterFormProps) => {

return(
        <SignInForm handleAlert={props.handleAlert} setAlertMessage={props.setAlertMessage} setIsAuthorized={props.setIsAuthorized} />
    );
}

export default SignInView;
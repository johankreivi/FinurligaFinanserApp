import { FC } from 'react';
import SignInForm from '../Components/SignInForm';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';

const SignInView: FC<IRegisterFormProps> = (props : IRegisterFormProps) => {

return(
        <SignInForm setCookie={props.setCookie}
        handleAlert={props.handleAlert}
        setAlertMessage={props.setAlertMessage}
        />
    );
}

export default SignInView;
import { FC } from 'react';
import SignInForm from '../Components/SignInForm';
import { IRegisterFormProps } from '../Models/Interfaces/IRegisterFormProps';

const SignInView: FC<IRegisterFormProps> = (props : IRegisterFormProps) => {

return(
        <SignInForm setCookie={props.setCookie} 
        />
    );
}

export default SignInView;
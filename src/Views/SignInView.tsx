import { FC, useEffect, useState } from 'react';
import SignInForm from '../Components/SignInForm';
import { IFormProps } from '../Models/Interfaces/IFormProps';

const SignInView: FC<IFormProps> = (props : IFormProps) => {

return(
        <SignInForm handleAlert={props.handleAlert} setAlertMessage={props.setAlertMessage} setIsAuthorized={props.setIsAuthorized} />
    );
}

export default SignInView;
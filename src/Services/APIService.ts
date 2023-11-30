import axios from "axios";
import { PostUserAccountDto } from "../Models/Dto/PostUserAccountDto";
import { PostLoginUserDto } from "../Models/Dto/PostLoginUserDto";

const LOCALHOST = 'https://localhost:7030/api'

export const postUserAccount = async (userAccount: PostUserAccountDto) => {
    try {   
        return await axios.post(`${LOCALHOST}/UserAccount/CreateUserAccount`, userAccount)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating user: '+error)
    }    
    };

export const postLoginUser = async (userAccount: PostLoginUserDto) => {
    try {   
        return await axios.post(`${LOCALHOST}/UserAccount/Login`, userAccount)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when logging in user: '+error)
    }    
    };
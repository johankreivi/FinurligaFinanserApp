import axios, { AxiosResponse } from "axios";
import { PostUserAccountDto } from "../Models/Dto/PostUserAccountDto";
import { ResponseUserAccountDto } from "../Models/Dto/ResponseUserAccountDto";

const LOCALHOST = 'https://localhost:7030/api'

export const postUserAccount = async (userAccount: PostUserAccountDto) => {
    try {   
        return await axios.post(`${LOCALHOST}/UserAccount/CreateUserAccount`, userAccount)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating user: '+error)
    }    
    };
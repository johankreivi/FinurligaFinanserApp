import axios, { AxiosResponse } from "axios";
import { PostUserAccountDto } from "../Models/Dto/PostUserAccountDto";
import { ResponseUserAccountDto } from "../Models/Dto/ResponseUserAccountDto";

export const postUserAccount = async (userAccount: PostUserAccountDto) => {
    
    try {    
    const response: AxiosResponse = await axios.post('https://api.example.com/data', userAccount);    
    const responseData: ResponseUserAccountDto = response.data;  
    console.log("in the service response data:"+responseData)
    return responseData;  
    
    } catch (error) {     
        
    }    
    };
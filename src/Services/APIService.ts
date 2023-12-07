import axios from "axios";
import { PostUserAccountDto } from "../Models/Dto/PostUserAccountDto";
import { PostLoginUserDto } from "../Models/Dto/PostLoginUserDto";
import { PostBankAccountDto } from "../Models/Dto/PostBankAccountDto";
import { ResponseUserAccountDto } from "../Models/Dto/ResponseUserAccountDto";
import { PostTransactionDto } from "../Models/Dto/PostTransactionDto";

const LOCALHOST = 'https://localhost:7030/api'

export const postUserAccount = async (userAccount: PostUserAccountDto) => {
    try {   
        const createdUser = await axios.post(`${LOCALHOST}/UserAccount/CreateUserAccount`, userAccount)
                          .then(response => response.data);
        const userDetails = await getUserDetails(createdUser.id);                  
        await postBankAccount({userAccountId: createdUser.id, nameOfAccount: `${userDetails.firstName} ${userDetails.lastName} Privatkonto`});
        
        return createdUser;
    
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

export const postBankAccount = async (bankAccount: PostBankAccountDto) => {    
    try {   
        return await axios.post(`${LOCALHOST}/BankAccount`, bankAccount)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating bankaccount: '+error)
    }    
}

export const getAllUserBankAccounts = async (userAccountId: number) => {    
    try {   
        return await axios.get(`${LOCALHOST}/BankAccount/User/${userAccountId}`)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating bankaccount: '+error)
    }    
}

export const getUserDetails = async (userAccountId: number) => {    
    try {   
        return await axios.get(`${LOCALHOST}/UserAccount/GetUserInfo/${userAccountId}`)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating bankaccount: '+error)
    }    
}

export const getBankAccountTransactions = async (id: number) => {
    try {   
        return await axios.get(`${LOCALHOST}/Transaction/BankAccount/${id}`)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when getting transactions: '+error)
    } 
}

export const postTransaction = async (postTransactionDto: PostTransactionDto) => {
    try {   
        return await axios.post(`${LOCALHOST}/Transaction`, postTransactionDto)
                          .then(response => response.data);
    
    } catch (error) {     
        console.log('Error when creating transaction: '+error)
    }    

}

import { LoginApi } from "../api/Login.api.js"

export const LoginServices= async( user, pass)=>{
    const res = await LoginApi( user, pass)
    return res
}
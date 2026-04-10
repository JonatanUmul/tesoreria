import axios from "./axios.js"

export const LoginApi = async(user, pass)=>{
    console.log('user login ', user, pass)
    return axios.post("/users/login",{
        params:{user, pass}
    })
}
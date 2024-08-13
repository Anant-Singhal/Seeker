import axios from "axios";
export const postApi = async (url,body)=>{
   return axios.post(url,body, {
      withCredentials: true,  // Include credentials (cookies) in the request
    }).then((res)=>{
      return res;
    }).catch((error)=>{
      return error;
    })
}

    export const getApi = async (url)=>{
    return axios.get(url, {
        withCredentials: true,  // Include credentials (cookies) in the request
    }).then((res)=>{
        return res;
    }).catch((error)=>{
        return error ;
    })
    }
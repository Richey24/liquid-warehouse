import axios from "axios";
import { LoginBody } from "./types";

const baseUrl = 'http://172.30.16.80:5000';  
// import.meta.env.VITE_BASE_URL;

export const useLogin = () => {
     return async (body: LoginBody, successCb?: () => void, errorCb?: (error: string) => void) => {
          // console.log(baseUrl)
          try {
               const response = await axios.post(`${baseUrl}/api/Login/Signin`, body);
               if (response.status === 201 || response.status === 200) {
                    localStorage.setItem("token", response?.data?.token);
                    successCb?.();
               }
          } catch (err) {
               errorCb?.((err as any).response?.data?.error || "something went wrong");
               console.log(err);
          }
     };
};

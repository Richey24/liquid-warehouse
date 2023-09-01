import axios from "axios";
import { RegisterBody } from "./types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useRegister = () => {
     return async (
          body: RegisterBody,
          successCb?: () => void,
          errorCb?: (error: string) => void,
     ) => {
          try {
               const response = await axios.post(`${baseUrl}/api/admin/register`, body);
               if (response.status === 201 || response.status === 200) {
                    successCb?.();
               }
          } catch (err) {
               errorCb?.((err as any).response.data.error || "something went wrong");
               console.log(err);
          }
     };
};

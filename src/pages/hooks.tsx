import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./appState";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetMe = () => {
     return async (
          setUser: React.Dispatch<React.SetStateAction<any>>,
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
     ) => {
          try {
               setLoading(true);
               const response = await axios.get(`${baseUrl}/api/Login/verify/me`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
               });
               if (response.status === 200 || response.status === 201) {
                    setUser(response.data);
               }
               setTimeout(() => setLoading(false), 900);
          } catch (err) {
               toast.error("Something Went Wrong, Pls Try to Relogin");
               localStorage.removeItem("token");
               setLoading(false);
               location.pathname = "/";
               console.log(err);
          }
     };
};

export const useUnlockScreen = () => {
     return async (
          payload: { email: string; password: string },
          onSuccess: () => void,
          onError: () => void,
     ) => {
          try {
               const response = await axios.post(`${baseUrl}/api/Login/unlockscreen`, payload, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
               });
               if (response.status === 200 || response.status === 201) {
                    onSuccess();
               }
          } catch (err) {
               toast.error("Something Went Wrong, Pls Try to Relogin");
               onError();
               console.log(err);
          }
     };
};

export const useLockScreen = () => {
     return async (email: string, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(`${baseUrl}/api/Login/lockscreen/${email}`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
               });
               if (response.status === 200 || response.status === 201) {
                    onSuccess();
               }
          } catch (err) {
               toast.error("Something Went Wrong, Pls Try to Relogin");
               onError();
               console.log(err);
          }
     };
};

export const useGetBatch = () => {
     return async (
          batchId: number,
          onSuccess: () => void,
          onError: () => void,
          setBatchDetails: React.Dispatch<React.SetStateAction<any>>,
     ) => {
          try {
               const response = await axios.get(
                    `${baseUrl}/api/batchformula/getbatchbyid/${batchId}
               `,
                    {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                         },
                    },
               );
               if (response.status === 200 || response.status === 201) {
                    // setBatchDetails?.(response.data);
                    onSuccess?.();
                    setBatchDetails(response.data);
                   
               }
          } catch (err) {
               toast.error("Something Went Wrong, Pls Try to Relogin");
               onError?.();
               console.log(err);
          }
     };
};

export const useGetBatchDetails = () => {
     return async (
          batchId: number,
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
          setBatchDetails: React.Dispatch<React.SetStateAction<any>>,
     ) => {
          try {
               setLoading(true);
               const response = await axios.get(
                    `${baseUrl}/api/batchformula/details/getdetails/${batchId}
               `,
                    {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                         },
                    },
               );
               if (response.status === 200 || response.status === 201) {
                    setBatchDetails?.(response.data);
               }
               setTimeout(() => setLoading(false), 900);
          } catch (err) {
               toast.error("Something Went Wrong");
               setLoading(false);
               console.log(err);
          }
     };
};

export const useGetAvatar = () => {
     return async (userId: number, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.get(`${baseUrl}/api/ImageUpload/upload/${userId}`);
               if (response.status === 200 || response.status === 201) {
                    
               }
          } catch (err) {
               onError();
               console.log(err);
          }
     };
};
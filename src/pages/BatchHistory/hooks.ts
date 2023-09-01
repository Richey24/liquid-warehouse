import { faker } from "@faker-js/faker";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../appState";
import { toast } from "react-toastify";
import { TankProps } from "../Dashboard/types";
import { UnflattenedData, unflattenData } from "../../../utils/unflatten";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetHistory = () => {
     const { setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);

     return async (
          payload: { startdate: string; enddate: string },
          onSuccess: (data: UnflattenedData) => void,
          onError: () => void,
     ) => {
          try {
               const response = await axios.post(`${baseUrl}/api/tank/gettankhistory`, payload);
               if (response.status === 200) {
                    const data = unflattenData(response.data);
                    onSuccess?.(data);
               }
          } catch (err) {
               onError?.();
               console.log(err);
          }
     };
};
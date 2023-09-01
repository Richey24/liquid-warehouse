import { faker } from "@faker-js/faker";
import axios from "axios";
import { TankConfigurationProps, TankProps } from "./types";
import { useContext } from "react";
import { AppContext } from "../appState";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetTanks = () => {
     const { setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);

     return async (configsData: TankConfigurationProps[]) => {
          try {
               const response = await axios.get(`${baseUrl}/api/tank/gettanks`);
               if (response.status === 200) {
                    const tankKeys = Object.keys(response.data);
                    let tanks: TankProps[] = [];

                    tankKeys.forEach((key) => {
                         const names = key.split("_");
                         if (tanks&&tanks?.some?.((tank) => tank.number === +names[1])) {
                              const newTanks = tanks.map((tank) => {
                                   if (tank.number === +names[1]) {
                                        if (names[2] === "Batch") {
                                             return {
                                                  ...tank,
                                                  batchNumber: response.data[key],
                                             };
                                        } else if (names[2] === "Weight") {
                                             return {
                                                  ...tank,
                                                  fillValue: response.data[key],
                                             };
                                        } else if (names[2] === "Temp") {
                                             return {
                                                  ...tank,
                                                  temperature: response.data[key],
                                                  color: "#038aff",
                                                  minimumTemperature: 10,
                                                  temperatureMsm: "celcius",
                                                  temperatureColor: "#a71c1b",
                                                  type: +names[1] === 809 ? "HotWater" : "mix",
                                                  title: `T${names[1]}`,
                                             };
                                        }
                                   }

                                   return tank;
                              });

                              tanks = newTanks;
                         } else {
                              if (names[2] === "Batch") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `Line ${names[1]}`,
                                        fillValue: 0,
                                        type: "normal",
                                        number: +names[1],
                                        batchNumber: response.data[key],
                                        id: 0,
                                        usersId: [],
                                        fomula: "",
                                   });
                              } else if (names[2] === "Weight") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `Line ${names[1]}`,
                                        fillValue: response.data[key],
                                        type: "normal",
                                        number: +names[1],
                                        batchNumber: 0,
                                        id: 0,
                                        usersId: [],
                                        fomula: "",
                                   });
                              } else if (names[2] === "Temp") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `T${names[1]}`,
                                        fillValue: 0,
                                        type: "mix",
                                        number: +names[1],
                                        batchNumber: 0,
                                        temperature: response.data[key],
                                        minimumTemperature: 10,
                                        temperatureMsm: "celcius",
                                        temperatureColor: "#DC3545",
                                        id: 0,
                                        usersId: [],
                                        fomula: "",
                                   });
                              }
                         }
                    });
                    // .filter((tank) => tank !== undefined);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setTanksStore(
                         tanks
                              .filter((tank) => tank.title.split(" ")[1] !== "CIP")
                              .map((tank) => {
                                   const config = configsData.find(
                                        (c) => c.tankIdentifier === tank.title,
                                   );
                                   if (config) {
                                        return {
                                             ...tank,
                                             locationId: config.locationId,
                                             id: config.sysConfigIdx,
                                             minimumTemperature: config.tempThreshold,
                                             usersId: config.usersId
                                                  ? JSON.parse(config?.usersId as string)
                                                  : [],
                                             fillMaxValue: config.maximumFluidLevel,
                                             fomula: config.formula,
                                        };
                                   }
                                   return tank;
                              }),
                    );
               }
               // return
          } catch (err) {
               console.log(err);
          }
     };
};

export const useGetTanksConfig = () => {
     const getTanks = useGetTanks();
     return async () => {
          try {
               const response = await axios.get(`${baseUrl}/api/tank/gettankconfigurations`);
               if (response.status === 200) {
                    getTanks(response.data);
               }
          } catch (err) {
               toast.error("Unable to Fetch Tanks");
               console.log(err);
          }
     };
};

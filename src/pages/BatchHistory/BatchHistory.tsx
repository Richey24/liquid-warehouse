import React, { useEffect, useState } from "react";
import { Container, Table, FormGroup, Label, Input, Spinner } from "reactstrap";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { random } from "lodash";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import DateRangePicker from "./DateRange/DateRange";
import { useGetHistory } from "./hooks";
import { TankEntry } from "../../../utils/unflatten";
import "./BatchHistory.css";

const generateCoolColor = (level: number, temperature: number, opacity: number): string => {
     const levelRange = [0, 100]; // Example level range
     const temperatureRange = [-10, 50]; // Example temperature range

     const mappedLevel = (level - levelRange[0]) / (levelRange[1] - levelRange[0]);
     const mappedTemperature =
          (temperature - temperatureRange[0]) / (temperatureRange[1] - temperatureRange[0]);

     const red = Math.round(mappedTemperature * 255);
     const green = Math.round(mappedLevel * 255);
     const blue = random(100, 200);

     return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

interface TankHistory {
     batchId: number;
     date: string;
     level: number;
     temperature: number;
}

const BatchHistory: React.FC = () => {
     const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
     const [selectedTempBatches, setSelectedTempBatches] = useState<string[]>([]);
     const [tankHistory, setTankHistory] = useState<TankEntry[]>([]);
     const [loading, setLoading] = useState<boolean>(false);
     const [active, setActive] = useState("weight");
     const getHistory = useGetHistory();

    

     useEffect(() => {
          const today = new Date();
          const defaultStartDate = new Date(
               today.getFullYear(),
               today.getMonth(),
               today.getDate() - 6,
               today.getHours(), // Set the default hours to the current time
               today.getMinutes(), // Set the default minutes to the current time
          );

          setLoading(true);
          //  startdate: "2023-05-21T15:41:12.528Z",
          // enddate: "2023-07-21T15:41:12.528Z",
          getHistory(
               {
                    // startdate: "2023-05-21T15:41:12.528Z",
                    // enddate: "2023-07-21T15:41:12.528Z",
                    startdate: defaultStartDate.toISOString(),
                    enddate: today.toISOString() as string,
               },

               (data) => {
                    setTankHistory(data.data);
                    setLoading(false);
               },
               () => {
                    setLoading(false);
               },
          );
     }, []);

     const toggleBatchSelection = (batchId: string, isTemp?: boolean) => {
          if (isTemp) {
               setSelectedTempBatches((prevSelectedBatches) => {
                    if (prevSelectedBatches.includes(batchId)) {
                         return prevSelectedBatches.filter((id) => id !== batchId);
                    } else {
                         return [...prevSelectedBatches, batchId];
                    }
               });
               setActive("temp");
          } else {
               setSelectedBatches((prevSelectedBatches) => {
                    if (prevSelectedBatches.includes(batchId)) {
                         return prevSelectedBatches.filter((id) => id !== batchId);
                    } else {
                         return [...prevSelectedBatches, batchId];
                    }
               });
               setActive("weight");
          }
     };
     // console.log("active", active);
     const filteredHistory = tankHistory.filter((history) => {
          if (active === "weight") {
               return selectedBatches.includes(history.batch as string);
          } else {
               return selectedTempBatches.includes(history.batch as string);
          }
     });
     

     const chartDatasets = selectedBatches.map((batchId) => {
          const batchHistory = filteredHistory.filter((history) => history.batch === batchId);
          const backgroundColor = generateCoolColor(
               batchHistory[0]?.weight ?? Math.random(),
               batchHistory[0]?.temp ?? Math.random(),
               0.5,
          ); // Set opacity to 0.5

          const borderColor = generateCoolColor(
               batchHistory[0]?.weight ?? Math.random(),
               batchHistory[0]?.temp ?? Math.random(),
               1,
          );
          return {
               label: `Batch ${batchId}`,
               data: batchHistory.map((history) => history.weight),
               backgroundColor,
               borderColor,
               borderWidth: 1,
          };
     });

     // console.log("chart", chartDatasets);

     const tempChartDatasets = selectedTempBatches.map((batchId) => {
          const batchHistory = filteredHistory.filter((history) => history.batch === batchId);
          const backgroundColor = generateCoolColor(
               batchHistory[0]?.weight ?? Math.random(),
               batchHistory[0]?.temp ?? Math.random(),
               0.5,
          ); // Set opacity to 0.5

          const borderColor = generateCoolColor(
               batchHistory[0]?.weight ?? Math.random(),
               batchHistory[0]?.temp ?? Math.random(),
               1,
          );
          return {
               label: `Batch ${batchId}`,
               data: batchHistory.map((history) => history.weight),
               backgroundColor,
               borderColor,
               borderWidth: 1,
          };
     });
    
     const chartData = {
          labels: [...new Set(filteredHistory.map((history) => history.dateTime))]
               .slice(0, 30)
               .map((date) => date),
          datasets: chartDatasets,
     };

     const tempChartData = {
          labels: [...new Set(filteredHistory.map((history) => history.dateTime))]
               .slice(0, 30)
               .map((date) => date),
          datasets: tempChartDatasets,
     };

     const graphOptions = {
          scales: {
               x: {
                    title: {
                         display: true,
                         text: "Date / Time",
                    },
               },
               y: {
                    title: {
                         display: true,
                         text: "Weight (kg)",
                    },
                    beginAtZero: true,
               },
          },
          plugins: {
               legend: {
                    display: true,
               },
          },
          maintainAspectRatio: false,
     };

     const graphTemperatureOptions = {
          scales: {
               x: {
                    title: {
                         display: true,
                         text: "Date / Time",
                    },
               },
               y: {
                    title: {
                         display: true,
                         text: "Temperature (kg)",
                    },
                    beginAtZero: true,
               },
          },
          plugins: {
               legend: {
                    display: true,
               },
          },
          maintainAspectRatio: false,
     };

     return (
          <>
               {!loading ? (
                    <Container>
                         <h1>Tank History</h1>
                         <div
                              style={{
                                   display: "flex",
                                   alignItems: "flex-end",
                                   justifyContent: "flex-end",
                                   flexDirection: "column",
                                   width: "100%",
                              }}
                         >
                              <DateRangePicker
                                   loading={loading}
                                   setLoading={setLoading}
                                   setTankHistory={setTankHistory}
                              />
                              <div
                                   style={{
                                        marginTop: "20px",
                                        borderRadius: 8,
                                        marginBottom: 50,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid #ebebeb",
                                        width: "100%",
                                        background: "#fff",
                                   }}
                              >
                                   {active === "weight" && (
                                        <div
                                             style={{
                                                  marginTop: "20px",

                                                  padding: 16,
                                                  borderRadius: 8,
                                                  marginBottom: 16,
                                                  width: "100%",
                                             }}
                                        >
                                             <Line
                                                  data={chartData}
                                                  options={graphOptions}
                                                  height={400}
                                             />
                                        </div>
                                   )}{" "}
                                   {active === "temp" && (
                                        <div
                                             style={{
                                                  marginTop: "20px",

                                                  padding: 16,
                                                  borderRadius: 8,
                                                  marginBottom: 16,

                                                  width: "100%",
                                             }}
                                        >
                                             {" "}
                                             <Line
                                                  data={tempChartData}
                                                  options={graphTemperatureOptions}
                                                  height={400}
                                                  //   width={"100%"}
                                             />
                                        </div>
                                   )}
                                   <ToggleButton active={active} setActive={setActive} />
                              </div>
                         </div>
                         <div
                              style={{
                                   display: "flex",
                                   alignItems: "flex-start",
                                   justifyContent: "flex-start",
                                   gap: 30,
                              }}
                         >
                              {tankHistory
                                   .filter((item, index, self) => {
                                        return (
                                             index === self.findIndex((i) => i.name === item.name)
                                        );
                                   })
                                   .filter((t) => !t?.temp).length > 0 && (
                                   <FormGroup
                                        style={{
                                             display: "flex",
                                             gap: 8,
                                             flexWrap: "wrap",
                                             maxWidth: 500,
                                             border: "1px solid rgb(162 158 158)",
                                             padding: 8,
                                             borderRadius: 8,
                                             background: "#fff",
                                        }}
                                   >
                                        <p style={{ width: "100%" }}>Storage</p>
                                        {tankHistory
                                             .filter((item, index, self) => {
                                                  return (
                                                       index ===
                                                       self.findIndex((i) => i.name === item.name)
                                                  );
                                             })
                                             .filter((t) => !t?.temp)
                                             .map((history, index) => (
                                                  <Label
                                                       key={index}
                                                       style={{
                                                            border: "1px solid rgb(162 158 158)",
                                                            padding: 2,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: 4,
                                                            borderRadius: 8,
                                                       }}
                                                  >
                                                       <Input
                                                            type="checkbox"
                                                            checked={selectedBatches.includes(
                                                                 history.batch as string,
                                                            )}
                                                            onChange={() =>
                                                                 toggleBatchSelection(
                                                                      history.batch as string,
                                                                 )
                                                            }
                                                       />{" "}
                                                       <span>{history.name}</span>
                                                  </Label>
                                             ))}
                                   </FormGroup>
                              )}
                              {tankHistory
                                   .filter((item, index, self) => {
                                        return (
                                             index === self.findIndex((i) => i.name === item.name)
                                        );
                                   })
                                   .filter((t) => t?.temp).length > 0 && (
                                   <FormGroup
                                        style={{
                                             display: "flex",
                                             gap: 8,
                                             flexWrap: "wrap",
                                             border: "1px solid rgb(162 158 158)",
                                             padding: 8,
                                             borderRadius: 8,
                                             background: "#fff",
                                        }}
                                   >
                                        <p style={{ width: "100%" }}>PreMixing</p>
                                        {tankHistory
                                             .filter((item, index, self) => {
                                                  return (
                                                       index ===
                                                       self.findIndex((i) => i.name === item.name)
                                                  );
                                             })
                                             .filter((t) => t?.temp)
                                             .map((history, index) => (
                                                  <Label
                                                       key={index}
                                                       style={{
                                                            border: "1px solid rgb(162 158 158)",
                                                            padding: 2,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: 4,
                                                            borderRadius: 8,
                                                       }}
                                                  >
                                                       <Input
                                                            type="checkbox"
                                                            checked={selectedTempBatches.includes(
                                                                 history.batch as string,
                                                            )}
                                                            onChange={() =>
                                                                 toggleBatchSelection(
                                                                      history.batch as string,
                                                                      true,
                                                                      )
                                                                 }
                                                            />{" "}
                                                            <span>{history.name}</span>
                                                       </Label>
                                                  ))}
                                        </FormGroup>
                                   )}
                                   {[...new Set(tankHistory.map((histoy) => histoy.batch))].filter(
                                        (_t, idx) => idx > 12 && idx < 15,
                                   ).length > 0 && (
                                        <FormGroup
                                             style={{
                                                  display: "flex",
                                                  gap: 8,
                                                  flexWrap: "wrap",
                                                  border: "1px solid rgb(162 158 158)",
                                                  padding: 8,
                                                  borderRadius: 8,
                                                  background: "#fff",
                                             }}
                                        >
                                             <p style={{ width: "100%" }}>Mixing</p>
                                             {[...new Set(tankHistory.map((histoy) => histoy.batch))]
                                                  .filter((t, idx) => idx > 12 && idx < 15)
                                                  .map((batchId, index) => (
                                                       <Label
                                                            key={index}
                                                            style={{
                                                                 border: "1px solid rgb(162 158 158)",
                                                                 padding: 2,
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 justifyContent: "center",
                                                                 gap: 4,
                                                                 borderRadius: 8,
                                                            }}
                                                       >
                                                            <Input
                                                                 type="checkbox"
                                                                 checked={selectedBatches.includes(
                                                                      batchId as string,
                                                                 )}
                                                                 onChange={() =>
                                                                      toggleBatchSelection(
                                                                           batchId as string,
                                                                      )
                                                                 }
                                                            />{" "}
                                                            <span>Batch {batchId}</span>
                                                       </Label>
                                                  ))}
                                        </FormGroup>
                                   )}
                              </div>
                         </Container>
                    ) : (
                         <div className="loading-overlay">
                              <Spinner color="primary" />
                         </div>
                    )}
               </>
          );
     };
     
     export default BatchHistory;  
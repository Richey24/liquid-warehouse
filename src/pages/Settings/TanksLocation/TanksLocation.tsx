// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import {
     Container,
     Row,
     Col,
     Card,
     CardBody,
     Input,
     Modal,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
} from "reactstrap";
import { DndProvider, useDrop, useDrag, DragObjectWithType } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
     useGetLocations,
     useSaveLocations,
     useSaveTanksConfiguration,
     useUpdateTanksConfiguration,
} from "../hooks";
import { toast } from "react-toastify";
import { CreateLocationModal } from "../CreateLocation/CreateLocation";
import { IoMdAdd } from "react-icons/io";
import { AppContext } from "../../appState";
import { TankProps } from "../../Dashboard/types";

interface Tank {
     id: number;
     name: string;
     locationId: number;
}

interface Location {
     id: number;
     name: string;
     //  tanks: Tank[];
}

interface AssignedTankProps {
     tank: TankProps;
}

interface UnassignedTankProps {
     tank: TankProps;
}

interface DropResult {
     tankId: number;
     locationId: number;
}

export const TanksLocation: React.FC = () => {
     const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
     const [locations, setLocations] = useState<Location[]>([]);
     const getLocations = useGetLocations();
     const [assignedTanks, setAssignedTanks] = useState<Location[]>(locations);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [dropType, setDropType] = useState<{ type: string | null; tank: TankProps | null }>({
          type: "",
          tank: null,
     });
     const [locationModal, setLocationModal] = useState(false);
     const [saveLocationLoading, setLocationLoading] = useState(false);
     const { tanksStore, setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);
     const saveLocation = useSaveLocations();
     const saveTanksConfiguration = useSaveTanksConfiguration();
     const updateTanksConfiguration = useUpdateTanksConfiguration();

     useEffect(() => {
          getLocations(setLocations);
     }, []);

     const AssignedTanksDropZone: React.FC<{ location: Location }> = ({ location }) => {
          const [{ isOver }, drop] = useDrop<DragObjectWithType>(
               () => ({
                    accept: "tank",
                    drop: (item: DropResult) => {
                         if (tanksStore) {
                              const tank = tanksStore.find((t) => t.title === item.title);
                              if (selectedLocation) {
                                   if (tank) {
                                        setDropType({ type: "assign", tank });
                                        setIsModalOpen(true);
                                   }
                              } else {
                                   toast.error("Pls, Choose a Location");
                              }
                         }
                    },
                    collect: (monitor) => ({
                         isOver: !!monitor.isOver(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drop}
                    style={{
                         minHeight: "200px",
                         background: isOver ? "lightblue" : "white",
                         border: "1px dashed rgb(153 126 183)",
                         flex: 1,
                         width: "100%",
                    }}
                    className="p-2 rounded"
               >
                    {tanksStore &&
                         tanksStore
                              .filter(
                                   (tank) =>
                                        tank.locationId && tank.locationId === selectedLocation?.id,
                              )
                              .map((tank, idx) => <AssignedTank key={idx} tank={tank} />)}
               </div>
          );
     };

     const AssignedTank: React.FC<AssignedTankProps> = ({ tank }) => {
          const [{ isDragging }, drag] = useDrag<DragObjectWithType>(
               () => ({
                    type: "tank",
                    item: { title: tank.title },
                    collect: (monitor) => ({
                         isDragging: !!monitor.isDragging(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drag}
                    style={{
                         opacity: isDragging ? 0.5 : 1,
                         cursor: "move",
                         marginBottom: 8,
                    }}
               >
                    <Card>
                         <CardBody>{tank.title}</CardBody>
                    </Card>
               </div>
          );
     };

     const UnassignedTanksDropZone: React.FC = () => {
          const [{ isOver }, drop] = useDrop<any>(
               () => ({
                    accept: "tank",
                    drop: (item: DropResult) => {
                         if (tanksStore) {
                              const tank = tanksStore.find((t) => t.title === item.title);
                              if (tank) {
                                   setIsModalOpen(true);
                                   setDropType({ type: "unassign", tank });
                              }
                         }
                    },
                    collect: (monitor) => ({
                         isOver: !!monitor.isOver(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drop}
                    style={{
                         minHeight: "200px",
                         background: isOver ? "lightblue" : "white",
                         border: "1px dashed rgb(153 126 183)",
                    }}
                    className="p-2 rounded"
               >
                    {tanksStore &&
                         tanksStore
                              .filter((tank) => !tank.locationId || tank.locationId === 0)
                              .map((tank, idx) => <UnassignedTank key={idx} tank={tank} />)}
               </div>
          );
     };

     const UnassignedTank: React.FC<UnassignedTankProps> = ({ tank }) => {
          const [{ isDragging }, drag] = useDrag<unknown>(
               () => ({
                    type: "tank",
                    item: { title: tank.title },
                    collect: (monitor) => ({
                         isDragging: !!monitor.isDragging(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drag}
                    style={{
                         opacity: isDragging ? 0.5 : 1,
                         cursor: "move",
                         marginBottom: 8,
                    }}
               >
                    <Card>
                         <CardBody>
                              {tank.title}
                              {/* <button onClick={onAssign}>Assign</button> */}
                         </CardBody>
                    </Card>
               </div>
          );
     };

     const handleConfirm = () => {
          // Handle confirmed drop action here
          // setIsModalOpen(false);
          if (dropType.type === "unassign") {
               if (dropType.tank) {
                    const {
                         color,
                         temperature,
                         number,
                         fillMaxValue,
                         title,
                         fillValue,
                         type,
                         minimumTemperature,
                         temperatureMsm,
                         temperatureColor,
                         threshold,
                         batchNumber,
                         id,
                         formula,
                    } = dropType.tank;
                    setLocationLoading(true);
                    updateTanksConfiguration(
                         {
                              sysConfigIdx: id,
                              tankIdentifier: title,
                              tankName: title,
                              tankType: 0,
                              color,
                              pHSetting: 0,
                              tempSetting: Math.ceil(temperature as number) || 0,
                              tempThreshold: minimumTemperature ?? 0,
                              temperatureColor: "string",
                              formula: formula ?? "string",
                              locationId: 0,
                              currentFluidLevel: Math.ceil(fillValue),
                              maximumFluidLevel: fillMaxValue,
                              isTankOnline: true,
                              lastUpdatedBy: "string",
                         },
                         () => {
                              setLocationLoading(false);
                              setIsModalOpen(false);
                         },
                         () => {
                              setLocationLoading(false);
                         },
                    );
               }
          } else if (dropType.type === "assign") {
               if (dropType.tank) {
                    const {
                         color,
                         temperature,
                         number,
                         fillMaxValue,
                         title,
                         fillValue,
                         type,
                         minimumTemperature,
                         temperatureMsm,
                         temperatureColor,
                         threshold,
                         batchNumber,
                         id,
                         formula,
                    } = dropType.tank;
                    setLocationLoading(true);
                    if (id !== 0) {
                         updateTanksConfiguration(
                              {
                                   sysConfigIdx: id,
                                   tankIdentifier: title,
                                   tankName: title,
                                   tankType: 0,
                                   color,
                                   pHSetting: 0,
                                   tempSetting: Math.ceil(temperature as number) || 0,
                                   tempThreshold: minimumTemperature ?? 0,
                                   temperatureColor: "string",
                                   formula: formula ?? "string",
                                   locationId: selectedLocation?.id as number,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: fillMaxValue,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                              },
                              () => {
                                   setLocationLoading(false);
                                   setIsModalOpen(false);
                              },
                              () => {
                                   setLocationLoading(false);
                              },
                         );
                    } else {
                         saveTanksConfiguration(
                              {
                                   sysConfigIdx: id,
                                   tankIdentifier: title,
                                   tankName: title,
                                   tankType: 0,
                                   color,
                                   pHSetting: 0,
                                   tempSetting: Math.ceil(temperature as number) || 0,
                                   tempThreshold: minimumTemperature ?? 0,
                                   temperatureColor: "string",
                                   formula: formula ?? "string",
                                   locationId: selectedLocation?.id as number,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: fillMaxValue,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                              },
                              () => {
                                   setLocationLoading(false);
                                   setIsModalOpen(false);
                              },
                              () => {
                                   setLocationLoading(false);
                              },
                         );
                    }
               }
          }
     };

     const handleCancel = () => {
          // Handle canceled drop action here
          setIsModalOpen(false);
     };

     const handleCreateLocation = (name, onSuccess, onError) => {
          saveLocation(
               name,
               () => {
                    onSuccess();
                    getLocations(setLocations);
               },
               onError,
          );
     };

     return (
          <Container>
               <Modal isOpen={isModalOpen} toggle={handleCancel} className="custom-modal">
                    <ModalHeader toggle={handleCancel}>
                         {dropType.type === "assign" ? "Assign" : "Unassign"}
                    </ModalHeader>
                    <ModalBody>
                         Are you sure you want to{" "}
                         {dropType.type === "assign" ? "Assign" : "Unassign"} Tank?
                    </ModalBody>
                    <ModalFooter>
                         <Button
                              color="primary"
                              disabled={saveLocationLoading}
                              onClick={handleConfirm}
                         >
                              {saveLocationLoading ? "Creating...." : "Confirm"}
                         </Button>
                         <Button color="secondary" onClick={handleCancel}>
                              Cancel
                         </Button>
                    </ModalFooter>
               </Modal>
               <CreateLocationModal
                    isOpen={locationModal}
                    toggleModal={() => setLocationModal((prev) => !prev)}
                    onCreateLocation={handleCreateLocation}
               />
               <div className="mb-2 pb-2 d-flex align-items-center gap-2 w-100">
                    <Input
                         type="select"
                         value={selectedLocation ? selectedLocation.id : ""}
                         onChange={(e) => {
                              const { value } = e.target;
                              const selectedL = locations.find(
                                   (location) => location.id === parseInt(value),
                              );
                              if (selectedL) setSelectedLocation(selectedL);
                         }}
                    >
                         <option value="">-- Select Locations --</option>
                         {locations.map((location, idx) => (
                              <option key={idx} value={location.id}>
                                   {location.name}
                              </option>
                         ))}
                    </Input>
                    <Button
                         color="primary"
                         onClick={() => setLocationModal((prev) => !prev)}
                         className="rounded-circle"
                    >
                         <IoMdAdd />
                    </Button>
               </div>
               <Row>
                    <Col>
                         <h3>Available/Unassigned Tanks</h3>
                         <DndProvider backend={HTML5Backend}>
                              <UnassignedTanksDropZone />
                         </DndProvider>
                    </Col>
                    <Col
                         style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                         }}
                    >
                         {selectedLocation ? (
                              <h3>Tanks Assigned to {selectedLocation?.name}</h3>
                         ) : (
                              <h3>Select a Location</h3>
                         )}
                         <DndProvider backend={HTML5Backend}>
                              <AssignedTanksDropZone location={assignedTanks[0]} />
                         </DndProvider>
                    </Col>
               </Row>
          </Container>
     );
};

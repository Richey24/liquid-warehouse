/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-check
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
     Spinner,
} from "reactstrap";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
     useGetLocations,
     useGetRoles,
     useGetUsers,
     useSaveTanksConfiguration,
     useSaveUserRoleLocation,
     useUpdateTanksConfiguration,
} from "../hooks";
import { toast } from "react-toastify";
import { Role, User } from "../settings";
import { AppContext } from "../../appState";
import { TankProps } from "../../Dashboard/types";

interface Tank {
     id: number;
     name: string;
     locationId: number;
     users: number[];
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

export const RolesLocation: React.FC = () => {
     const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
     const [locations, setLocations] = useState<Location[]>([]);
     const { tanksStore, user } = useContext<{
          tanksStore: TankProps[] | null;
          user: any;
     }>(AppContext);
     const getLocations = useGetLocations();
     const [assignedTanks, setAssignedTanks] = useState<Location[]>(locations);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [dropType, setDropType] = useState<{ type: string | null; tank: TankProps | null }>({
          type: "",
          tank: null,
     });
     const [selectedUser, setSelectedUser] = useState<null | User>(null);
     const [users, setUsers] = useState<User[]>([]);
     const [selectedRole, setSelectedRole] = useState<null | Role>();
     const [roles, setRoles] = useState<Role[]>([]);
     const [roleLoading, setRoleLoading] = useState(false);
     const [saveLocationLoading, setLocationLoading] = useState(false);
     const [updateRole, setUpdateRole] = useState(false);

     const getUsers = useGetUsers();
     const getRoles = useGetRoles();
     const saveRoleLocations = useSaveUserRoleLocation();
     const saveTanksConfiguration = useSaveTanksConfiguration();
     const updateTanksConfiguration = useUpdateTanksConfiguration();

     useEffect(() => {
          getLocations(setLocations);
          getUsers(setUsers);
          getRoles(setRoles);
     }, []);

     const AssignedTanksDropZone: React.FC<{ location: Location }> = ({ location }) => {
          //@ts-ignore
          const [{ isOver }, drop] = useDrop<any>(
               () => ({
                    accept: "tank",
                    drop: (item) => {
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
                         minHeight: "100px",
                         background: isOver ? "lightblue" : "white",
                         border: "1px dashed rgb(153 126 183)",
                         flex: 1,
                         width: "100%",
                    }}
                    className="p-2 rounded"
               >
                    {tanksStore &&
                         tanksStore
                              .filter((tank) => {
                                   if (
                                        tank?.usersId &&
                                        (tank?.usersId as number[])?.some?.(
                                             (userId) => userId === selectedUser?.id,
                                        )
                                   ) {
                                        return tank;
                                   }
                              })
                              .map((tank) => <AssignedTank key={tank.id} tank={tank} />)}
               </div>
          );
     };

     const AssignedTank: React.FC<AssignedTankProps> = ({ tank }) => {
          //@ts-ignore
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
                         <CardBody>{tank.title}</CardBody>
                    </Card>
               </div>
          );
     };

     const UnassignedTanksDropZone: React.FC = () => {
          //@ts-ignore
          const [{ isOver }, drop] = useDrop<any>(
               () => ({
                    accept: "tank",
                    drop: (item) => {
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
                              .filter((tank) => tank.locationId === selectedLocation?.id)
                              .filter((tank) => {
                                   if (
                                        !tank.usersId ||
                                        !(tank.usersId as number[])?.some?.(
                                             (userId) => userId === selectedUser?.id,
                                        ) ||
                                        tank.usersId?.length === 0
                                   ) {
                                        return tank;
                                   }
                              })
                              .map((tank) => <UnassignedTank key={tank.id} tank={tank} />)}
               </div>
          );
     };

     const UnassignedTank: React.FC<UnassignedTankProps> = ({ tank }) => {
          //@ts-ignore
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
                         <CardBody>{tank.title}</CardBody>
                    </Card>
               </div>
          );
     };

     const handleConfirm = () => {
          // Handle confirmed drop action here
          // setIsModalOpen(true);
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
                         usersId,
                         locationId,
                         fomula,
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
                              formula: fomula ?? "string",
                              locationId: locationId as number,
                              currentFluidLevel: Math.ceil(fillValue),
                              maximumFluidLevel: fillMaxValue,
                              isTankOnline: true,
                              lastUpdatedBy: "string",
                              location: "",
                              usersId: JSON.stringify(
                                   (usersId as number[])?.filter(
                                        (ids) => +ids !== selectedUser?.id,
                                   ),
                              ),
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
                         locationId,
                         usersId,
                         fomula,
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
                                   tempThreshold: minimumTemperature || 0,
                                   temperatureColor: "string",
                                   formula: fomula ?? "string",
                                   locationId: locationId as number,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: fillMaxValue,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                                   location: "",
                                   usersId: JSON.stringify(
                                        usersId
                                             ? [...(usersId as number[]), selectedUser?.id]
                                             : ([selectedUser?.id] as number[]),
                                   ),
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
                                   formula: fomula ?? "string",
                                   locationId: locationId as number,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: fillMaxValue,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                                   location: "",
                                   usersId: JSON.stringify(
                                        usersId
                                             ? [...(usersId as number[]), selectedUser?.id]
                                             : ([selectedUser?.id] as number[]),
                                   ),
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

     const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value: userId } = e.target;

          if (users.find((user) => user.id === +userId))
               setSelectedUser(users.find((user) => user.id === +userId) as User);
     };

     const handleAssignRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target;
          const selectedRoleL = roles.find((role) => role.id === parseInt(value));
          if (selectedRoleL) setSelectedRole(selectedRoleL);
     };

     const handleSaveRole = () => {
          if (selectedRole) {
               if (selectedUser?.id && selectedLocation?.id) {
                    saveRoleLocations(
                         {
                              userId: selectedUser?.id as number,
                              roleId: selectedRole.id,
                              locationId: selectedLocation?.id,
                         },
                         setRoleLoading,
                         setUsers,
                    );
               } else {
                    toast.warn("Make Sure The Location Field is Selected");
               }
          } else {
               toast.warn("Pls, Select a Role");
          }

          setUpdateRole(false);
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
                         <Button color="primary" onClick={handleConfirm}>
                              {saveLocationLoading ? "Dropping..." : "Confirm"}
                         </Button>
                         <Button color="secondary" onClick={handleCancel}>
                              Cancel
                         </Button>
                    </ModalFooter>
               </Modal>

               <Row>
                    <Col>
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
                                   {locations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                             {location.name}
                                        </option>
                                   ))}
                              </Input>
                         </div>
                         {selectedLocation && (
                              <DndProvider backend={HTML5Backend}>
                                   <UnassignedTanksDropZone />
                              </DndProvider>
                         )}
                    </Col>
                    <Col
                         style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                         }}
                    >
                         <div className="mb-2 pb-2 d-flex align-items-end justify-content-end flex-column gap-2 w-100">
                              <Input
                                   type="select"
                                   value={selectedUser ? selectedUser.id : ""}
                                   onChange={(e) => handleChangeUser(e as any)}
                              >
                                   <option value="">-- Select User --</option>
                                   {users &&
                                        users
                                             ?.filter((userM) => userM.id !== user?.userId)
                                             ?.map((user) => (
                                                  <option key={user.id} value={user.id}>
                                                       {user.name}
                                                  </option>
                                             ))}
                              </Input>

                              {(selectedUser &&
                                   (selectedUser?.role === 0 || !selectedUser?.role)) ||
                              updateRole ? (
                                   <>
                                        <div className="w-75 d-flex align-items-end justify-content-end flex-column gap-2">
                                             <Input
                                                  type="select"
                                                  value={selectedRole ? selectedRole.id : ""}
                                                  onChange={(e) => handleAssignRole(e as any)}
                                             >
                                                  <option value="">-- Select Role --</option>
                                                  {roles.map((role: any) => (
                                                       <option key={role.id} value={role.id}>
                                                            {role.name}
                                                       </option>
                                                  ))}
                                             </Input>
                                             <div>
                                                  {updateRole && (
                                                       <Button
                                                            color="danger"
                                                            onClick={() => setUpdateRole(false)}
                                                            style={{ marginRight: 8 }}
                                                       >
                                                            Cancel
                                                       </Button>
                                                  )}
                                                  <Button
                                                       color="primary"
                                                       className="ml-1"
                                                       onClick={handleSaveRole}
                                                  >
                                                       {roleLoading ? (
                                                            <Spinner />
                                                       ) : updateRole ? (
                                                            "Update Role"
                                                       ) : (
                                                            "Assign Role"
                                                       )}
                                                  </Button>
                                             </div>
                                        </div>
                                   </>
                              ) : (
                                   selectedUser &&
                                   (selectedUser.role || selectedUser.role !== 0) && (
                                        <Button color="primary" onClick={() => setUpdateRole(true)}>
                                             Change Role
                                        </Button>
                                   )
                              )}
                         </div>
                         {selectedUser && (selectedUser?.role !== 0 || selectedUser?.role) && (
                              <DndProvider backend={HTML5Backend}>
                                   <AssignedTanksDropZone location={assignedTanks[0]} />
                              </DndProvider>
                         )}
                    </Col>
               </Row>
          </Container>
     );
};

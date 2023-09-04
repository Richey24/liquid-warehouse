// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import React, { useContext, useEffect, useState } from "react";
import {
     Container,
     Nav,
     NavItem,
     NavLink,
     TabContent,
     TabPane,
     Row,
     Col,
     Button,
     FormGroup,
     Label,
     Input,
     Form,
     Spinner,
} from "reactstrap";
import { TankUpdateForm } from "./UpdateTank/UpdateTank";
import { AppContext } from "../appState";
import { TankProps } from "../Dashboard/types";
import Tank from "../../components/waterTank/tank";
import { useSpring, animated } from "@react-spring/web";
import {
     useGetRoles,
     useSaveTanksConfiguration,
     useUpdateTanksConfiguration,
     useUpdateUserProfile,
} from "./hooks";
import { TanksLocation } from "./TanksLocation/TanksLocation";
import { RolesLocation } from "./RolesLocation/RolesLocation";
import { toast } from "react-toastify";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

interface ProfileData {
     name: string;
     email: string;
     image: string | null;
}

interface TankData {
     tankName: string;
     tankSize: string;
}

interface IdleScreenSettings {
     enabled: boolean;
     idleTime: number;
}

export interface Role {
     id: number;
     name: string;
     // tanks: string[];
}

export interface Location {
     id: number;
     name: string;
}

export interface User {
     id: number;
     name: string;
     email: string;
     role: number | null;
}

export const Settings: React.FC = () => {
     const [activeTab, setActiveTab] = useState("profile");
     const [activeTank, setActiveTank] = useState<any>(null);
     const [springs, api] = useSpring(() => ({
          from: { y: 100, opacity: 0 },
     }));
     const [profile, setProfile] = useState<ProfileData>({
          name: "",
          email: "",
          image: null,
     });
     const [polling, setPolling] = useState<any>({
          time: 0,
     });
     const [idleScreenSettingsLocal, setIdleScreenSettingsLocal] = useState<any>({
          enabled: false,
          idleTime: 1,
     });
     const { tanksStore, user, setIdleScreenSettings, idleScreenSettings } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
          user: any;
          idleScreenSettings: any;
          setIdleScreenSettings: any;
     }>(AppContext);
     const [roles, setRoles] = useState<Role[]>([]);
     const [settingsLoading, setSettingsLoading] = useState(false);
     const [updatedDetails, setUpdatedDetails] = useState<any>({});
     const [avatarFile, setAvatarFile] = useState<any>(null);
     const updateTanksConfiguration = useUpdateTanksConfiguration();
     const saveTanksConfiguration = useSaveTanksConfiguration();
     const updateProfile = useUpdateUserProfile();
     const getRoles = useGetRoles();

     const toggleTab = (tabT: string) => {
          if (activeTab !== tabT) {
               setActiveTab(tabT);
          }
     };

     useEffect(() => {
          getRoles(setRoles);
     }, []);

     useEffect(() => {
          if (activeTab === "tanks" && activeTank) {
               setActiveTank(tanksStore?.find((tankS) => tankS.id === activeTank.id));
          }
     }, [tanksStore]);

     useEffect(() => {
          if (user) {
               setProfile(() => {
                    return { name: user.username, email: user.email, image: user.email ?? "" };
               });
          }
     }, [user]);

     useEffect(() => {
          setIdleScreenSettingsLocal(idleScreenSettings);
     }, [idleScreenSettings]);

     useEffect(() => {
          if (localStorage.getItem("idleScreen") !== null) {
               setIdleScreenSettings(JSON.parse(localStorage.getItem("idleScreen") as any));
          }
          else{
               localStorage.setItem("idleScreen",JSON.stringify(idleScreenSettings) as string)
          }
     }, [localStorage.getItem("idleScreen")]);

     useEffect(() => {
          if (localStorage.getItem("polling") !== null) {
               setPolling(JSON.parse(localStorage.getItem("polling") as any));
          }
     }, [localStorage.getItem("polling")]);

     const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
          const { name, value, files } = e.target;
          if (name === "image" && files) {
               setAvatarFile(files[0]);
               const reader = new FileReader();
               reader.onload = () => {
                    if (reader.readyState === 2) {
                         setProfile((prevState) => ({
                              ...prevState,
                              image: reader.result as string,
                         }));
                    }
               };
               reader.readAsDataURL(files[0]);
          } else {
               setProfile((prevState) => ({
                    ...prevState,
                    [name]: value,
               }));
          }
     };

     const handleIdleScreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value, checked } = e.target;
          if (name === "enabled") {
               setIdleScreenSettingsLocal((prevState) => ({
                    ...prevState,
                    enabled: checked,
               }));
          } else if (name === "idleTime") {
               setIdleScreenSettingsLocal((prevState) => ({
                    ...prevState,
                    idleTime: parseInt(value, 10),
               }));
          }
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Handle profile update logic here
          
          if (activeTab === "polling") {
               localStorage.setItem("polling", JSON.stringify(polling));
               toast.success("Saved Settings");
          }

          if (activeTab === "idleScreen") {
               setIdleScreenSettings(idleScreenSettingsLocal);
               localStorage.setItem("idleScreen", JSON.stringify(idleScreenSettingsLocal));
               toast.success("Saved Settings");
          }

          if (activeTab === "profile") {
               const fd = new FormData();
               fd.append("image", avatarFile);

               updateProfile(
                    {
                         userId: user?.userId,
                         email: profile.email,
                         image: "",
                         username: profile.name,
                    },

                    setSettingsLoading,
                    fd,
               );
          }
          if (activeTab === "tanks") {
               setActiveTank(null);
               if (Object.keys(updatedDetails).length !== 0) {
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
                         formula,
                    } = updatedDetails;
                    setSettingsLoading(true);
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
                                   tempThreshold: +minimumTemperature || 0,
                                   temperatureColor: "string",
                                   formula: formula || "string",
                                   locationId,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: fillMaxValue || 0,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                                   usersId: JSON.stringify(usersId),
                                   location: "",
                              },
                              () => {
                                   setSettingsLoading(false);
                                   setActiveTank(
                                        tanksStore?.find((tankS) => tankS.id === activeTank.id),
                                   );
                                   toast.success("You Successfully updated the tank Information");
                              },
                              () => {
                                   setActiveTank(
                                        tanksStore?.find((tankS) => tankS.id === activeTank.id),
                                   );
                                   setSettingsLoading(false);
                                   toast.error("Something Went Wrong");
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
                                   tempThreshold: +minimumTemperature || 0,
                                   temperatureColor: "string",
                                   formula: formula || "string",
                                   locationId,
                                   currentFluidLevel: Math.ceil(fillValue),
                                   maximumFluidLevel: +fillMaxValue || 0,
                                   isTankOnline: true,
                                   lastUpdatedBy: "string",
                                   usersId: JSON.stringify(usersId),
                                   location: "",
                              },
                              () => {
                                   setSettingsLoading(false);
                                   setActiveTank(
                                        tanksStore?.find((tankS) => tankS.id === activeTank.id),
                                   );
                                   toast.success("You Successfully updated the tank Information");
                              },
                              () => {
                                   setActiveTank(
                                        tanksStore?.find((tankS) => tankS.id === activeTank.id),
                                   );
                                   setSettingsLoading(false);
                                   toast.error("Something Went Wrong");
                              },
                         );
                    }
               }
          }
     };

     const handlePollingChange = (e: React.ChangeEvent) => {
          setPolling({ time: (e.target as any).value });
     };

     const handleIdleScreenSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Handle idle screen settings update logic here
     };

     const handleDisplay = () => {
          api.start({
               from: {
                    y: 100,
                    opacity: 0,
               },
               to: {
                    y: 0,
                    opacity: 1,
               },
          });
     };

     const handleSaveAvatar = async () => {
          const formData = new FormData();
          formData.append("file", avatarFile);
          const response = await axios.post(
               `${baseUrl}/api/Sys/uploadavatarimage/${user.userId}`,
               formData,
          );
          
     };

     return (
          <Container>
               <h1 className="mb-4">Settings</h1>
               <Nav tabs>
                    <NavItem>
                         <NavLink
                              className={activeTab === "profile" ? "active" : ""}
                              onClick={() => toggleTab("profile")}
                         >
                              Profile
                         </NavLink>
                    </NavItem>
                    {user?.role?.roleName === "Blending Manager" && (
                         <NavItem>
                              <NavLink
                                   className={activeTab === "tanks" ? "active" : ""}
                                   onClick={() => toggleTab("tanks")}
                              >
                                   Tanks Configuration
                              </NavLink>
                         </NavItem>
                    )}
                    <NavItem>
                         <NavLink
                              className={activeTab === "idleScreen" ? "active" : ""}
                              onClick={() => toggleTab("idleScreen")}
                         >
                              Idle Screen
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "polling" ? "active" : ""}
                              onClick={() => toggleTab("polling")}
                         >
                              Polling
                         </NavLink>
                    </NavItem>
                    {user?.role?.roleName == "Admin" && (
                         <NavItem>
                              <NavLink
                                   className={activeTab === "roles" ? "active" : ""}
                                   onClick={() => toggleTab("roles")}
                              >
                                   Roles & Locations
                              </NavLink>
                         </NavItem>
                    )}
                    {user?.role?.roleName == "Admin" && (
                         <NavItem>
                              <NavLink
                                   className={activeTab === "tanksLocations" ? "active" : ""}
                                   onClick={() => toggleTab("tanksLocations")}
                              >
                                   Tanks & Locations
                              </NavLink>
                         </NavItem>
                    )}
               </Nav>
               <TabContent
                    activeTab={activeTab}
                    style={{
                         display: "flex",
                         alignItems: "flex-start",
                         justifyContent: "flex-start",
                         padding: "32px",
                         backgroundColor: "#fff",
                         marginTop: 10,
                         borderRadius: 8,
                    }}
               >
                    <TabPane
                         tabId="profile"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row className="d-flex align-items-start justify-content-start">
                              <Col sm="6" className="">
                                   <Form>
                                        {/* <FormGroup> */}
                                        
                                        {/* </FormGroup> */}
                                        <FormGroup>
                                             <Label for="name">Name</Label>
                                             <Input
                                                  type="text"
                                                  name="name"
                                                  id="name"
                                                  value={profile.name}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="email">Email</Label>
                                             <Input
                                                  type="email"
                                                  name="email"
                                                  id="email"
                                                  value={profile.email}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup>
                                        {/* <FormGroup>
                                             <Label for="password">Password</Label>
                                             <Input
                                                  type="password"
                                                  name="password"
                                                  id="password"
                                                  value={profile.password}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup> */}
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="tanks"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <TankUpdateForm
                                        tanks={tanksStore}
                                        setActiveTank={setActiveTank}
                                        handleDisplay={handleDisplay}
                                        setUpdatedDetails={setUpdatedDetails}
                                        updatedDetails={updatedDetails}
                                   />
                              </Col>
                              <Col
                                   sm="4"
                                   className="d-flex align-items-center justify-content-center w-50"
                              >
                                   <animated.div
                                        style={{
                                             width: "50%",
                                             ...springs,
                                        }}
                                   >
                                        {activeTank && !settingsLoading ? (
                                             <Tank
                                                  {...(activeTank as TankProps)}
                                                  style={{ width: "100%", maxWidth: 350 }}
                                             />
                                        ) : (
                                             <Spinner />
                                        )}
                                   </animated.div>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="idleScreen"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <Form onSubmit={handleIdleScreenSubmit}>
                                        <FormGroup
                                             switch
                                             className="w-100 d-flex align-items-center justify-content-between m-0 p-0 py-1 pb-2"
                                        >
                                             <Label
                                                  style={{ marginLeft: 0 }}
                                                  className="ml-0"
                                                  for="enabled"
                                                  check
                                             >
                                                  Enable Idle Screen
                                             </Label>
                                             <Input
                                                  type="switch"
                                                  id="enabled"
                                                  name="enabled"
                                                  checked={idleScreenSettingsLocal.enabled}
                                                  onChange={handleIdleScreenChange}
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="idleTime">Idle Time (in minutes)</Label>
                                             <Input
                                                  type="number"
                                                  name="idleTime"
                                                  id="idleTime"
                                                  value={idleScreenSettingsLocal.idleTime}
                                                  onChange={handleIdleScreenChange}
                                                  min={1}
                                                  max={10}
                                             />
                                        </FormGroup>
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="polling"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <Form onSubmit={handleIdleScreenSubmit}>
                                        <FormGroup>
                                             <Label for="idleTime">Polling Time (in minutes)</Label>
                                             <Input
                                                  type="number"
                                                  name="idleTime"
                                                  id="idleTime"
                                                  value={polling?.time || 1}
                                                  onChange={handlePollingChange}
                                                  min={1}
                                             />
                                        </FormGroup>
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="roles"
                         style={{
                              width: "100%",
                         }}
                    >
                         <RolesLocation />
                    </TabPane>
                    <TabPane
                         tabId="tanksLocations"
                         style={{
                              width: "100%",
                         }}
                    >
                         <TanksLocation />
                    </TabPane>
               </TabContent>
               {activeTab !== "roles" && activeTab !== "tanksLocations" && (
                    <div
                         className="w-100 p-4 "
                         style={{
                              backgroundColor: "#fff",
                              marginTop: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              borderRadius: 8,
                         }}
                    >
                         <Button
                              color="primary"
                              style={{ marginLeft: 8 }}
                              className="ml-2"
                              // type="submit"
                              onClick={handleSubmit}
                         >
                              {settingsLoading ? "Saving..." : "Save Settings"}
                         </Button>
                    </div>
               )}
          </Container>
     );
};

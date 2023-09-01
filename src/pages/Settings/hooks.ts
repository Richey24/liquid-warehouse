import axios from "axios";
import { Location, Role, User } from "./settings";
import { toast } from "react-toastify";
import { TankConfigurationProps } from "../Dashboard/types";
import { useGetTanksConfig } from "../Dashboard/hooks";
import { AppContext } from "../appState";
import { useContext } from "react";
import { useGetMe } from "../hooks";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetRoles = () => {
     return async (
          setRoles?: React.Dispatch<React.SetStateAction<Role[]>>,
          role?: (ro: string) => void,
          roleId?: number,
     ) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/GetRoles`);
               if (response.status === 200 || response.status === 201) {
                    setRoles?.(response.data.map((ro) => ({ name: ro.roleName, id: ro.roleId })));
                    if (role && roleId && response.data) {
                         response.data.forEach((ro) => {
                              if (ro.roleId === roleId) {
                                   role(ro);
                              }
                         });
                    }
               }
          } catch (err) {
               console.log(err);
          }
     };
};

export const useGetLocations = () => {
     return async (setLocations: React.Dispatch<React.SetStateAction<Location[]>>) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/GetLocations`);
               if (response.status === 200 || response.status === 201) {
                    setLocations(
                         response.data.map((location) => ({
                              name: location.sitename,
                              id: location.locId,
                         })),
                    );
               }
          } catch (err) {
               console.log(err);
          }
     };
};

export const useSaveLocations = () => {
     return async (locationName: string, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(
                    `${baseUrl}/api/Admin/addLocation/${locationName}`,
               );
               if (response.status === 200 || response.status === 201) {
                    onSuccess?.();
               }
          } catch (err) {
               console.log(err);
               onError();
               toast.error("Something Went Wrong");
          }
     };
};

export const useGetUsers = () => {
     return async (
          setUsers: React.Dispatch<React.SetStateAction<User[]>>,
          setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
     ) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/getusers`);
               if (response.status === 200 || response.status === 201) {
                    setUsers(
                         response.data.map((user) => ({
                              name: user?.username,
                              id: user?.userId,
                              email: user.email,
                              role: user.roleId,
                         })),
                    );
                    setLoading?.(false);
               }
          } catch (err) {
               console.log(err);
          }
     };
};

export const useUpdateUserProfile = () => {
     const { setUser } = useContext<{
          setUser: React.Dispatch<any>;
     }>(AppContext);
     const getMe = useGetMe();
     const saveAvatar = useSaveAvatar();

     return async (
          body: {
               userId: number;
               username: string;
               email: string;
               image: string;
          },
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
          fd?: any,
     ) => {
          try {
               setLoading(true);
               const response = await axios.post(`${baseUrl}/api/Admin/UpdateUserProfile`, body);
               if (response.data) {
                    toast.success("Profile Updated");
                    if (fd) {
                         saveAvatar(
                              body.userId,
                              fd,
                              () => {
                                   getMe(setUser, setLoading);
                              },
                              () => {},
                         );
                    } else {
                         getMe(setUser, setLoading);
                    }
               } else {
                    setLoading(false);
               }
          } catch (err) {
               toast.error("Something Went Wrong");
               setLoading(false);
               console.log(err);
          }
     };
};

export const useSaveUserRoleLocation = () => {
     const getUsers = useGetUsers();
     return async (
          body: { userId: number; roleId: number; locationId: number },
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
          setUsers: React.Dispatch<React.SetStateAction<User[]>>,
     ) => {
          try {
               setLoading(true);
               const response = await axios.post(`${baseUrl}/api/Admin/UpdateRoleLocation`, body);
               if (response.data) {
                    toast.success("Role Assigned");
                    getUsers(setUsers, setLoading);
               } else {
                    setLoading(false);
               }
          } catch (err) {
               setLoading(false);
               console.log(err);
          }
     };
};

export const useSaveTanksConfiguration = () => {
     const getTanksConfig = useGetTanksConfig();

     return async (body: TankConfigurationProps, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(`${baseUrl}/api/Tank/AddTankConfig`, body);
               if (response.status === 200 || response.status === 201) {
                    getTanksConfig();
                    onSuccess();
               }
          } catch (err) {
               onError();
               console.log(err);
          }
     };
};

export const useUpdateTanksConfiguration = () => {
     const getTanksConfig = useGetTanksConfig();

     return async (body: TankConfigurationProps, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(`${baseUrl}/api/Tank/updateTankConfig`, body);
               if (response.status === 200 || response.status === 201) {
                    getTanksConfig();
                    onSuccess();
               }
          } catch (err) {
               onError();
               console.log(err);
          }
     };
};

export const useSaveAvatar = () => {
     return async (userId: number, fd: any, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(`${baseUrl}/api/ImageUpload/upload/${userId}`, fd);
               console.log("response");
               if (response.status === 200 || response.status === 201) {
                    onSuccess();
               }
          } catch (err) {
               onError();
               console.log(err);
          }
     };
};
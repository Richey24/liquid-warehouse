import { createContext, useEffect, useState } from "react";
import { Lockscreen } from "./Auth/Lockscreen";
import { useIdleTimer } from "react-idle-timer";
import { useGetBatch, useGetBatchDetails, useGetMe, useLockScreen, useUnlockScreen, useGetAvatar } from "./hooks";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useGetRoles } from "./Settings/hooks";
import BatchView from "../components/BatchCheck/BatchCheck";


export const AppContext = createContext<any>(null);

const idle = JSON.parse(localStorage.getItem("idleScreen") as any);
const timeout = idle?.idleTime ? idle?.idleTime * 60000 : 120000;

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const [openModal, setOpenModal] = useState(false);
     const [user, setUser] = useState<any>(null);
     const [batchDetails, setBatchDetails] = useState<any>(null);
     const [batch, setBatch] = useState<any>(null);
     const [lowTemperature, setLowTemperature] = useState(false);
     const getAvatar = useGetAvatar();
     //console.log("tanksStore", tanksStore);

     const unLockScreen = useUnlockScreen();

     const getMe = useGetMe();
     const getRoles = useGetRoles();
     const lockScreen = useLockScreen();
     const getBatch = useGetBatch();
     const getBatcDetails = useGetBatchDetails();

     const onIdle = () => {
          if (!location.pathname.match("/auth")) {
               setOpen(true);
               if (user || idle.enabled) {
                    lockScreen(
                         user?.email,
                         () => {
                              getMe(setUser, setLoading);
                         },
                         () => {},
                    );
               }
          }
     };

     useEffect(() => {
          if (localStorage.getItem("token")) {
               getMe(setUser, setLoading);
               // getBatch(417221, setLoading, setBatchDetails);
               getBatcDetails(417211, setLoading, setBatchDetails);
          }
     }, []);

     useEffect(() => {
          const tanks = tanksStore as any;
          if (tanks) {
               
               if (tanks?.some?.((tank) => tank?.minimumTemperature > tank.temperature)) {
                    setLowTemperature(true);
               } else {
                    setLowTemperature(false);
               }
          }
     }, [tanksStore]);

     useEffect(() => {
          if (user && !user?.role) {
               getAvatar(
                    user?.userId,
                    () => {},
                    () => {},
               );
               getRoles(undefined, (role) => setUser((me) => ({ ...me, role })), user?.roleId);
          }
          if (user && user?.locked && !location.pathname.match("/auth")) {
               setOpen(!user?.locked ? false : true);
          }
     }, [user]);

     useIdleTimer({
          onIdle,
          timeout,
          throttle: 500,
     });

     const toggleModal = () => {
          setOpenModal((prev) => !prev);
     };

     return (
          <AppContext.Provider
               value={{
                    tanksStore,
                    setTanksStore,
                    open,
                    setOpen,
                    user,
                    setUser,
                    toggleBatchViewModal: toggleModal,
                    batchDetails,
                    setBatchDetails,
                    loading,
                    setLoading,
                    batch,
                    setBatch,
                    lowTemperature,
                    setLowTemperature,
               }}
          >
               <Lockscreen onClick={unLockScreen} />
               <BatchView open={openModal} toggleModal={toggleModal} />
               {loading && <LoadingScreen />}
               {children}
          </AppContext.Provider>
     );
};

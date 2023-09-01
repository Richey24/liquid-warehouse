import { useState, useEffect, useContext } from "react";
import Tank from "../../components/waterTank/tank.tsx";
import { tabs } from "./data.ts";
import classes from "./styles.module.css";
import { TankProps } from "./types.ts";
import { AppContext } from "../appState.tsx";

export const Dashboard = () => {
     const [activeTab, setActiveTab] = useState(1);
     const { tanksStore, user } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
          user: any;
     }>(AppContext);

     const handleTab = (value: any) => {
          setActiveTab(value);
     };

     return (
          <div>
               <div className="main-container" id="container">
                    <div className="main-content">
                         {user?.role && tanksStore ? (
                              <div className="middle-content">
                                   <div className="mb-4">
                                        <nav
                                             className="breadcrumb-style-one"
                                             aria-label="breadcrumb"
                                        >
                                             <ol className="breadcrumb">
                                                  <li className="breadcrumb-item">
                                                       <a href="#">Storage Area</a>
                                                  </li>
                                             </ol>
                                        </nav>
                                   </div>

                                   <div className="row">
                                        <div className="col-md-12">
                                             <div className="simple-pill">
                                                  <ul
                                                       className="nav nav-pills mb-3"
                                                       id="pills-tab"
                                                       role="tablist"
                                                  >
                                                       {tabs.map((tab, idx) => (
                                                            <li
                                                                 className="nav-item"
                                                                 role="presentation"
                                                                 key={idx}
                                                            >
                                                                 <button
                                                                      onClick={() =>
                                                                           handleTab(idx + 1)
                                                                      }
                                                                      className={`nav-link ${
                                                                           activeTab === idx + 1 &&
                                                                           "active"
                                                                      }`}
                                                                      type="button"
                                                                 >
                                                                      {tab}
                                                                 </button>
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   {activeTab === 1 ? (
                                        <div className={classes.containerRoot}>
                                             {tanksStore
                                                  ?.filter((tank) => {
                                                       if (
                                                            user?.role &&
                                                            user?.role?.roleName !== "Admin"
                                                       ) {
                                                            if (
                                                                 (tank.usersId as number[])?.some?.(
                                                                      (ids) => ids === user?.userId,
                                                                 )
                                                            ) {
                                                                 return true;
                                                            } else {
                                                                 return false;
                                                            }
                                                       }
                                                       return true;
                                                  })
                                                  ?.filter((tank) => tank?.type === "normal")
                                                  ?.map((tankProps, idx) => (
                                                       <Tank {...tankProps} key={idx} />
                                                  ))}
                                        </div>
                                   ) : (
                                        <div className="col layout-top-spacing gy-6">
                                             <div
                                                  className={classes.containerRoot}
                                                  style={{ width: "50%" }}
                                             >
                                                  {tanksStore
                                                       ?.filter((tank) => {
                                                            if (
                                                                 user?.role &&
                                                                 user?.role?.roleName !== "Admin"
                                                            ) {
                                                                 if (
                                                                      (
                                                                           tank.usersId as number[]
                                                                      )?.some?.(
                                                                           (ids) =>
                                                                                ids === user?.userId,
                                                                      )
                                                                 ) {
                                                                      return true;
                                                                 } else {
                                                                      return false;
                                                                 }
                                                            }
                                                            return true;
                                                       })
                                                       ?.filter((tank) => tank?.type === "premix")
                                                       ?.map((tankProps, idx) => (
                                                            <Tank {...tankProps} key={idx} />
                                                       ))}
                                             </div>
                                             <div
                                                  className={classes.containerRoot}
                                                  style={{ width: "50%" }}
                                             >
                                                  {tanksStore
                                                       ?.filter((tank) => {
                                                            if (
                                                                 user?.role &&
                                                                 user?.role?.roleName !== "Admin"
                                                            ) {
                                                                 if (
                                                                      (
                                                                           tank.usersId as number[]
                                                                      )?.some?.(
                                                                           (ids) =>
                                                                                ids === user?.userId,
                                                                      )
                                                                 ) {
                                                                      return true;
                                                                 } else {
                                                                      return false;
                                                                 }
                                                            }
                                                            return true;
                                                       })
                                                       ?.filter((tank) => tank?.type === "HotWater")
                                                       ?.map((tankProps, idx) => (
                                                            <Tank {...tankProps} key={idx} />
                                                       ))}
                                                  {tanksStore
                                                       ?.filter((tank) => {
                                                            if (
                                                                 user?.role &&
                                                                 user?.role?.roleName !== "Admin"
                                                            ) {
                                                                 if (
                                                                      (
                                                                           tank.usersId as number[]
                                                                      )?.some?.(
                                                                           (ids) =>
                                                                                ids === user?.userId,
                                                                      )
                                                                 ) {
                                                                      return true;
                                                                 } else {
                                                                      return false;
                                                                 }
                                                            }
                                                            return true;
                                                       })
                                                       ?.filter((tank) => tank?.type === "mix")
                                                       ?.map((tankProps, idx) => (
                                                            <Tank {...tankProps} key={idx} />
                                                       ))}
                                             </div>
                                        </div>
                                   )}
                              </div>
                         ) : (
                              <div
                                   className="spinner-container d-flex justify-content-center align-items-center"
                                   style={{ width: "100%", minHeight: "400px" }}
                              >
                                   <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                   </div>
                              </div>
                         )}

                         <div className="footer-wrapper">
                              <div className="footer-section f-section-1"></div>
                              <div className="footer-section f-section-2"></div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

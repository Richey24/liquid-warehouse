import { Outlet, Link, useNavigate } from "react-router-dom";
import classes from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/appState";
import { TankProps } from "../pages/Dashboard/types";
import { useGetTanks, useGetTanksConfig } from "../pages/Dashboard/hooks";
import ClickAwayListener from "react-click-away-listener";
import { Button } from "reactstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useGetBatch } from "../pages/hooks";
import animatedBell from "../assets/lotties/ringing_bell.json";
import { useLottie } from "lottie-react";
import moment from "moment";
import { CgOptions } from "react-icons/cg";

const BackButton = ({ onClick }) => {
     return (
          <Button
               color="secondary"
               className={classes.backButton}
               style={{
                    marginRight: 16,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
               }}
               onClick={onClick}
          >
               <IoIosArrowBack className="back-icon" />
               Go Back
          </Button>
     );
};

//const refreshTime =
//     (+JSON.parse(localStorage.getItem("polling") as any)?.time ?? 1 * 10000) || 10000;
const refreshTime =
     (+JSON.parse(localStorage.getItem("polling") as any)?.time ??
          +JSON.parse(localStorage.getItem("polling") as any)?.time * 60000) || 60000;
export const DefaultLayout = () => {
     const [showDropdown, setShowdropdown] = useState(false);
     const [time, setCurrentTime] = useState(new Date());
     const [batchValue, setBatchValue] = useState("");
     const { user, setOpen, toggleBatchViewModal, setBatch, setLoading, lowTemperature } =
          useContext<{
               tanksStore: TankProps[] | null;
               setTanksStore: any;
               setOpen: React.Dispatch<React.SetStateAction<boolean>>;
               user: any;
               toggleBatchViewModal: () => void;
               setBatch: React.Dispatch<any>;
               setLoading: React.Dispatch<boolean>;
               lowTemperature: boolean;
          }>(AppContext);
     const getTanks = useGetTanks();
     const getTanksConfig = useGetTanksConfig();
     const navigate = useNavigate();
     const getBatch = useGetBatch();
  
     const options = {
          animationData: animatedBell,
          loop: true,
     };

     const { View } = useLottie(options);

     useEffect(() => {
          getTanksConfig();
          // const refreshTanks = setInterval(() => {
          //      setCurrentTime(new Date());
          //      getTanksConfig();
          // }, refreshTime);

          // return () => {
          //      clearInterval(refreshTanks);
          // };
     }, []);

     const toggleShowDropDown = () => {
          setShowdropdown((prev) => !prev);
     };

     const handleBatchSearch = () => {
          setLoading(true);
          getBatch(
               +batchValue,
               () => {
                    toggleBatchViewModal();
                    setLoading(false);
               },
               () => {
                    setLoading(false);
               },
               setBatch,
          );
     };

     const handleRefresh = () => {
          // setTanksStore(getTanks());
     };

     return (
          <div
               style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 20,
               }}
          >
               <div
                    className={`header-container ${classes.header}`}
                    style={{ background: "#fff", borderRadius: 50, marginTop: 8 }}
               >
                    <ClickAwayListener onClickAway={() => setShowdropdown(false)}>
                         <header className="header navbar navbar-expand-sm expand-header">
                              <a
                                   href="javascript:void(0);"
                                   className="sidebarCollapse"
                                   data-placement="bottom"
                              >
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-menu"
                                   >
                                        <line x1="3" y1="12" x2="21" y2="12"></line>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <line x1="3" y1="18" x2="21" y2="18"></line>
                                   </svg>
                              </a>
                              {location.pathname !== "/" && (
                                   <BackButton onClick={() => navigate("/")} />
                              )}
                              {location.pathname === "/" && (
                                   <ul
                                        className="navbar-item theme-brand flex-row  text-center"
                                        onClick={() => navigate("/")}
                                   >
                                        <li className="nav-item theme-logo">
                                             <a href="index.html">
                                                  {/* <img src="../src/assets/img/logo2.svg" className="navbar-logo" alt="logo"> */}
                                             </a>
                                        </li>
                                        <li className="nav-item theme-text">
                                             <p className="nav-link"> Last Update </p>
                                        </li>
                                   </ul>
                              )}

                              <div className="search-animated toggle-search mr-1">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-search"
                                   >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                   </svg>
                                   <form
                                        className="form-inline search-full form-inline search"
                                        role="search"
                                   >
                                        <div className="search-bar">
                                             <input
                                                  type="text"
                                                  className="form-control search-form-control  ml-lg-auto"
                                                  placeholder={`${moment(time).format(
                                                       "YYYY-MM-DD hh:mm",
                                                  )}`}
                                             />
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-x search-close"
                                             >
                                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                             </svg>
                                        </div>
                                   </form>
                                   <span
                                        className="badge badge-secondary"
                                        style={{ cursor: "pointer" }}
                                        onClick={handleRefresh}
                                   >
                                        Refresh
                                   </span>
                              </div>
                              <div
                                   className="search-animated toggle-search"
                                   style={{ marginLeft: 10 }}
                              >
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-search"
                                   >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                   </svg>
                                   <form
                                        className="form-inline search-full form-inline search"
                                        role="search"
                                   >
                                        <div className="search-bar">
                                             <input
                                                  type="number"
                                                  className="form-control search-form-control  ml-lg-auto"
                                                  placeholder="Batch Code"
                                                  value={batchValue}
                                                  onChange={(e) => setBatchValue(e.target.value)}
                                             />
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  className="feather feather-x search-close"
                                             >
                                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                             </svg>
                                        </div>
                                   </form>
                                   <span
                                        className="badge badge-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={handleBatchSearch}
                                   >
                                        Check
                                   </span>
                              </div>
                              {location.pathname !== "/batch-history" && (
                                   <div
                                        className="search-animated toggle-search"
                                        style={{ marginLeft: 10 }}
                                   >
                                        <Button
                                             className="d-flex align-items-center justify-content-center"
                                             style={{ height: 35 }}
                                             onClick={() => navigate("/batch-history")}
                                        >
                                             Open History
                                        </Button>
                                   </div>
                              )}
                              <ul className="navbar-item flex-row ms-lg-auto ms-0 action-area">
                                
                                   {/* <li className="nav-item dropdown notification-dropdown">
                                        {!lowTemperature && (
                                             <a
                                                  href="javascript:void(0);"
                                                  className="nav-link dropdown-toggle"
                                                  id="notificationDropdown"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                             >
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       width="24"
                                                       height="24"
                                                       viewBox="0 0 24 24"
                                                       fill="none"
                                                       stroke="currentColor"
                                                       strokeWidth="2"
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       className="feather feather-bell"
                                                  >
                                                       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                                  </svg>
                                                  <span className="badge badge-success"></span>
                                             </a>
                                        )}
                                        <div
                                             style={{
                                                  width: 30,
                                                  height: 30,
                                                  display: lowTemperature ? "block" : "none",
                                             }}
                                        >
                                             {View}
                                        </div>
                                   </li> */}

                                   <li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1 position-relative">
                                        <a
                                             href="javascript:void(0);"
                                             className="nav-link dropdown-toggle user"
                                             id="userProfileDropdown"
                                             // data-bs-toggle="dropdown"
                                             aria-haspopup="true"
                                             aria-expanded="false"
                                             onClick={() => toggleShowDropDown()}
                                        >
                                                <div className="avatar-container">
                                                  <div className="avatar d-flex align-items-center justify-content-center rounded-lg">
                                                       <CgOptions size={30} />
                                                  </div>
                                             </div>
                                        </a>

                                        <div
                                             className={`dropdown-menu position-absolute ${
                                                  showDropdown && classes.activeDropdown
                                             }`}
                                             aria-labelledby="userProfileDropdown"
                                        >
                                             <div className="user-profile-section">
                                                  <div className="media mx-auto">
                                                       <div className="emoji me-2">&#x1F44B;</div>
                                                       <div className="media-body">
                                                            <h5>{user?.username ?? ""}</h5>
                                                            <p>{user?.role?.roleName ?? ""}</p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="dropdown-item">
                                                  <Link to="/settings" onClick={toggleShowDropDown}>
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-inbox"
                                                       >
                                                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                                                            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                                       </svg>{" "}
                                                       <span>Settings</span>
                                                  </Link>
                                             </div>
                                             <div
                                                  className="dropdown-item cursor-pointer"
                                                  onClick={() => {
                                                       setShowdropdown(false);
                                                       setOpen(true);
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                             >
                                                  <a>
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-lock"
                                                       >
                                                            <rect
                                                                 x="3"
                                                                 y="11"
                                                                 width="18"
                                                                 height="11"
                                                                 rx="2"
                                                                 ry="2"
                                                            ></rect>
                                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                       </svg>{" "}
                                                       <span>Lock Screen</span>
                                                  </a>
                                             </div>
                                             <div className="dropdown-item">
                                                  <a
                                                       onClick={() => {
                                                            localStorage.removeItem("token");
                                                            navigate("/auth/login");
                                                            toggleShowDropDown();
                                                       }}
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-log-out"
                                                       >
                                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                            <polyline points="16 17 21 12 16 7"></polyline>
                                                            <line
                                                                 x1="21"
                                                                 y1="12"
                                                                 x2="9"
                                                                 y2="12"
                                                            ></line>
                                                       </svg>{" "}
                                                       <span>Log Out</span>
                                                  </a>
                                             </div>
                                        </div>
                                   </li>
                              </ul>
                         </header>
                    </ClickAwayListener>
               </div>

               <div
                    style={{
                         padding: "32px",
                         background: "#fff",
                         borderRadius: 20,
                         width: "100%",
                    }}
               >
                    <Outlet />
               </div>
          </div>
     );
};

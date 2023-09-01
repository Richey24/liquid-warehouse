import {  Outlet } from "react-router-dom";
import '../assets/css/light/authentication/auth-boxed.css'

export const Auth = () => {
    return (
       <>
            <div className="form">
                 <Outlet />
            </div>
       </>
    );
};
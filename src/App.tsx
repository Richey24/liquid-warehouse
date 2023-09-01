/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layouts/default";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Auth } from "./layouts/auth";
import { Lockscreen } from "./pages/Auth/Lockscreen";
import { Login } from "./pages/Auth/Login/Login";
import { Settings } from "./pages/Settings/settings";
//@ts-ignore
import $ from "jquery";
import { AppState } from "./pages/appState";
import { Profile } from "./pages/Profile/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Register } from "./pages/Auth/Register/Register";
import BatchHistory from "./pages/BatchHistory/BatchHistory";
//@ts-ignore
window.$ = window.jQuery = $;

function App() {
     return (
          <AppState>
               <Routes>
                    <Route
                         path="/"
                         element={
                              <ProtectedRoute>
                                   <DefaultLayout />
                              </ProtectedRoute>
                         }
                    >
                         <Route path="/" element={<Dashboard />} />
                         <Route path="settings" element={<Settings />} />
                         <Route path="profile" element={<Profile />} />
                         <Route path="batch-history" element={<BatchHistory />} />
                    </Route>
                    <Route path="/auth" element={<Auth />}>
                         <Route path="login" element={<Login />} />
                         <Route path="Register" element={<Register />} />
                    </Route>
               </Routes>
          </AppState>
     );
}

export default App;

import { useContext } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation } from "react-router-dom";
import { Context } from "../context";
import { Dashboard, Home, Login, New, Specialist, Specialty } from "../pages";
import Credentials from "../pages/Credentials";

const VerifySession = () => {
  const { state:{token} } = useContext(Context);
  if(token) return <Navigate to={'/dashboard'} />;
  return <Login />;
};

const ProtecteRoutes = () => {
  const {pathname} = useLocation();
  const { state:{token} } = useContext(Context);
  if(pathname !== "/"){
    if(!token){
      return <Navigate to={'/'} />;
    }else
      return <Dashboard />;
  }else{
    return null;
  }
};

export const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<VerifySession/>} />,
        <Route path="dashboard" element={<ProtecteRoutes/>} >
          <Route path="" element={<Home />} />
          <Route path="new" element={<New />} />
          <Route path="report" element={<>Report</>} />
          <Route path="specialty" element={<Specialty />} />
          <Route path="Specialist" element={<Specialist />} />
          <Route path="Credentials" element={<Credentials />} />
        </Route>
      ,
    ])
);
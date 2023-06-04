import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Login } from "../pages";

const VerifySession = () => {
  // const {token} = useSelector((state:store) => state.session);
  // if(token) return <Navigate to={'/dashboard/home'} />
  return <Login />;
  // return null;
};

const ProtecteRoutes = () => {
  // const location = useLocation();
  // const {token} = useSelector((state:store) => state.session);

  // if(location!==null){
  //   if((location.pathname==='/dashboard' || location.pathname==='/dashboard/') && token){
  //     return <Navigate to={'/dashboard/home'} />
  //   }
  //   if(location.pathname!=='/dashboard' && location.pathname!=='/dashboard/' && token){
  //     return <Outlet/>
  //   }
  //   if(!token){
  //     return <Navigate to={'/'} />
  //   }
  // }
  return null;
};

export const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<VerifySession/>} />,
      // <Route path="dashboard"  element={<Navigate to="/dashboard/home" />} >
        <Route path="dashboard" element={<ProtecteRoutes/>} >
          {/* <Route path="home" element={<Inicio />} />,
          <Route path="classes" element={<Classes />} />,
          <Route path="profession" element={<Profession />} />,
          <Route path="pensums" element={<Pensum />} />,
          <Route path="teachers" element={<Teacher />} />,
          <Route path="students" element={<Students />} />,
          <Route path="record" element={<Scores />} /> */}
        </Route>
      ,
    ])
);
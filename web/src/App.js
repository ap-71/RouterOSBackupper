import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import MonitorinPage from "./components/pages/MonitoringPage";
import AddPage from "./components/pages/AddPage";
import BackupPage from "./components/pages/BackupsPage";
// import LoginPage from './Components/Pages/LoginPage';
// import RegisterPage from './Components/Pages/RegisterPage';
// import AuthService from './services/auth.service';
import "./App.module.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        >
          <Route index element={<MonitorinPage />} />
          <Route path="monitor" element={<MonitorinPage />} />
          <Route path="add" element={<AddPage />} />
          <Route path="backups" element={<BackupPage />} />
        </Route>
        {/* <Route path="/register" element={ <RegisterPage /> }></Route>
        <Route path="/login" element={ <LoginPage />} ></Route>
        <Route path="/logout" element={ <Logout />} ></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

// function Logout({ data }){
//   const location = useLocation();
//   // AuthService.logout()
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }
function RequireAuth({ children }) {
  // const location = useLocation();
  // const token = AuthService.getToken()

  // if (!token || token === null || token === undefined) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default App;

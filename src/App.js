import "./App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout";
import Employees from "./Screens/Employees/Employees";
import EmployeesAddEdit from "./Screens/Employees/EmployeesAddEdit";
import Login from "./Screens/Login/Login";
import SelectProject from "./Screens/NewProject/SelectProject";
import Chat from "./Screens/Dashboard/chat";
import Projects from "./Screens/Projects/Projects";

function App() {
  return (
    <Router basename={"/management"}>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="selectproject" element={<SelectProject edit={true} />} />
        </Routes>
      </PortalLayout>
    </Router>
  );
}

export default App;

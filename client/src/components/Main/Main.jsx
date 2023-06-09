import React, { useState } from "react";
import Home from './Home';
import Admin from './Admin';
import AdminDashboard from './AdminDashboard';
import Client from './Client';
import ClientDashboard from './ClientDashboard';
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import RoleManager from "../../utils/RoleManager/RoleManager";

const Main = () => {

  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState('');

  return <main className="main">
    <Routes>
      <Route element={
        <Home
          logged={{ logged, setLogged }}
          role={{ role, setRole }} />}
        path="/" />

      <Route>
        <Route path="admin/*">
          <Route
            path="dashboard"
            element={<ProtectedRoutes
              component={<RoleManager
                component={<AdminDashboard />}
                role={role}
                allowedRoles={["admin"]} />}
              logged={logged} />} />

          <Route
            path="other"
            element={<ProtectedRoutes
              component={<RoleManager
                component={<Admin />}
                role={role}
                allowedRoles={["admin"]} />}
              logged={logged} />} />
        </Route>
        <Route path="client/*">
          <Route
            path="dashboard"
            element={<ProtectedRoutes
              component={<RoleManager
                component={<ClientDashboard />}
                role={role}
                allowedRoles={["client"]} />}
              logged={logged} />} />
          <Route
            path="other"
            element={<ProtectedRoutes
              component={<RoleManager
                component={<Client />}
                role={role}
                allowedRoles={["client"]} />}
              logged={logged} />} />
        </Route>
      </Route>
    </Routes>

  </main>;
};

export default Main;

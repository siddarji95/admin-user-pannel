import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    group: 'auth',
  },
  {
    name: "Add Users",
    path: "/add_users",
    icon: <AddCircleIcon />,
    group: 'admin',
  },
  {
    name: "Admin Users",
    path: "/show_users",
    icon: <AdminPanelSettingsIcon />,
    group: 'admin',
  },
  {
    name: "Login",
    path: "/login",
    icon: <LoginIcon />,
    group: 'guest',
  },
  {
    name: "Sign Up",
    path: "/register",
    icon: <HowToRegIcon />,
    group: 'guest',
  },
];

export default routes;
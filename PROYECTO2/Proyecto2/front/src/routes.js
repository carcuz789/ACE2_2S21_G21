/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Calorias from "views/Calorias.js";
import Historial from "views/Historial.js";
import DiasUso from "views/DiasUso";
import Login from "views/login";
global.miNumero = 205;

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-paper-2",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/historial",
    name: "Historial",
    icon: "nc-icon nc-notes",
    component: Historial,
    layout: "/admin",
  },
  {
    path: "/diasUso",
    name: "UsoDiario",
    icon: "nc-icon nc-paper-2",
    component: DiasUso,
    layout: "/admin",
  },
  {
    path: "/calorias",
    name: "Calorias",
    icon: "nc-icon nc-bell-55",
    component: Calorias,
    layout: "/admin",
  },
];

export default dashboardRoutes;

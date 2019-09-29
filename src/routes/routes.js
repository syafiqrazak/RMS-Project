import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import loginLayout from "@/pages/Layout/loginLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import leaveApplication from "@/pages/leaveApplication.vue";
import stepForm from "@/pages/2stepForm.vue";
import dynamicForm from "@/pages/dynamicForm.vue";
import purchaseOrder from "@/pages/purchaseOrder.vue";
import login from "@/pages/login.vue";
import PSR from "@/pages/PSR.vue";
import notifications from "@/pages/notification.vue";
import editPO from "@/pages/editPO.vue";
import leaveSubmitSuccess from "@/pages/leaveSubmitSuccess.vue";
import POSubmitSuccess from "@/pages/POSubmitSuccess.vue";





const routes = [
  {
        path: "/login",
        name: "Login Page",
        component: login,
        // redirect: "/login"
      },
  {
    path: "/dashboard",
    component: DashboardLayout,
    // redirect: "/dashboard",
    children: [
      {
        path: "/editPO/:PO_num",
        name: "Edit PO",
        component: editPO
      },
      {
        path: "/leaveSubmitSuccess",
        name: "Leave Application Successful",
        component: leaveSubmitSuccess
      },
       {
        path: "/POSubmitSuccess",
        name: "Purchase Order Application Successful",
        component: POSubmitSuccess
      },
      {
        path: "/notification",
        name: "Notification",
        component: notifications
      },
      {
        path: "/PSR",
        name: "PSR",
        component: PSR
      },
      {
        path: "/leaveApplication/:nama",
        name: "Leave Application",
        component: leaveApplication
      },
      {
        path: "/purchaseOrder",
        name: "Purchase Order",
        component: purchaseOrder
      },
      {
        path: "/dynamicForm",
        name: "Dynamic Form",
        component: dynamicForm
      },
      {
        path: "/stepForm",
        name: "2 Step Form",
        component: stepForm
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "/table",
        name: "Table List",
        component: TableList
      },
      {
        path: "/typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "/icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "/maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  },
  // {
  //   path:"/",
  //   component: loginLayout,
  //   redirect:"/login",
  // },
];

export default routes;

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

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
import displayPO from "@/pages/displayPO.vue";
import displayPSR from "@/pages/displayPSR.vue";
import displayLeave from "@/pages/displayLeave.vue";
import register from "@/pages/Register.vue";
import template from "@/pages/TableTemplate.vue";
import resetPassword from "@/pages/ResetPassword.vue";
import enterPSR from "@/pages/EnterPSR.vue";
import myApplication from "@/pages/MyApplication.vue";


const routes = [
  {
    path: "/",
    name: "Login Page",
    component: login,
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login Page",
    component: login
  },
  {
    path: "/dashboard/:id",
    component: DashboardLayout,
    // redirect: "/dashboard",
    children: [
      {
        path: "/enterPSR/:id",
        name: "Enter PSR",
        component: enterPSR
      },
      {
        path: "/resetPassword/:id",
        name: "Reset Password",
        component: resetPassword
      },
      {
        path: "/myApplication/:id",
        name: "My Applications",
        component: myApplication
      },
      {
        path: "/table/",
        name: "Table Template",
        component: template
      },
      {
        path: "/register/:id",
        name: "Staff Registration",
        component: register
      },
      {
        path: "/displayPO/:id/:po_no",
        name: "Display Purchase Order",
        component: displayPO
      },
      {
        path: "/displayPSR/:id/:psr_no",
        name: "Display PSR",
        component: displayPSR
      },
      {
        path: "/displayLeave/:id/:leave_id",
        name: "Display Leave",
        component: displayLeave
      },
      {
        path: "/editPO/:id",
        name: "Edit PO",
        component: editPO
      },
      {
        path: "/leaveSubmitSuccess/:id",
        name: "Leave Application Successful",
        component: leaveSubmitSuccess
      },
      {
        path: "/POSubmitSuccess/:id",
        name: "Purchase Order Application Successful",
        component: POSubmitSuccess
      },
      {
        path: "/notification/:id",
        name: "Notification",
        component: notifications
      },
      {
        path: "/PSR/:id",
        name: "PSR",
        component: PSR
      },
      {
        path: "/leaveApplication/:id",
        name: "Leave Application",
        component: leaveApplication
      },
      {
        path: "/purchaseOrder/:id/:psr_no",
        name: "Purchase Order",
        component: purchaseOrder
      },
      {
        path: "/dynamicForm/:id",
        name: "Dynamic Form",
        component: dynamicForm
      },
      {
        path: "/stepForm/:id",
        name: "2 Step Form",
        component: stepForm
      },
      {
        path: "/dashboard/:id",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/user/:id",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "/table/:id",
        name: "Table List",
        component: TableList
      },
      {
        path: "/typography/:id",
        name: "Typography",
        component: Typography
      },
      {
        path: "/icons/:id",
        name: "Icons",
        component: Icons
      },
      {
        path: "/maps/:id",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "/notifications/:id",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade/:id",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  }
  // {
  //   path:"/",
  //   component: loginLayout,
  //   redirect:"/login",
  // },
];

export default routes;

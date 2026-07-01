import { LayoutDashboard, ClipboardList, User, Trophy, History } from "lucide-react";

import { ROUTES } from "./routes";

export const STUDENT_NAVIGATION = [
  {
    title: "Dashboard",
    path: ROUTES.STUDENT_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Assessments",
    path: ROUTES.STUDENT_ASSESSMENTS,
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: ROUTES.STUDENT_PROFILE,
    icon: ClipboardList,
  },
];

export const ADMIN_NAVIGATION = [

    {
        title: "Dashboard",
        path: ROUTES.ADMIN_DASHBOARD,
        icon: LayoutDashboard,
    },

    {
        title: "Assessments",
        path: ROUTES.ADMIN_ASSESSMENTS,
        icon: ClipboardList,
    },

    {
        title: "Profile",
        path: ROUTES.ADMIN_PROFILE,
        icon: User,
    },

];

import { LayoutDashboard, ClipboardList, Trophy, History } from "lucide-react";

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

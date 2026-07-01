import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "@/pages/auth/LoginPage";

import StudentLayout from "@/layouts/StudentLayout";

import AssessmentInstructions from "@/pages/student/AssessmentInstructions";

import AssessmentAttempt from "@/pages/student/AssessmentAttempt";

import AssessmentLayout from "@/layouts/AssessmentLayout";

import AssessmentTerminated from "@/pages/student/AssessmentTerminated";

import AssessmentSubmitted from "@/pages/student/AssessmentSubmitted";

import StudentResult from "@/pages/student/StudentResult";

import SignupPage from "@/pages/auth/SignupPage";

import AdminLayout from "@/layouts/AdminLayout";

import StudentDashboard from "@/pages/student/Dashboard";
import StudentAssessments from "@/pages/student/Assessments";
import StudentProfile from "@/pages/student/Profile";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminAssessments from "@/pages/admin/Assessments";
import AdminProfile from "@/pages/admin/Profile";

import CreateAssessment from "@/pages/admin/CreateAssessment";

import ManageAssessment from "@/pages/admin/ManageAssessment";

// function StudentDashboard() {
//     return <h1>Student Dashboard</h1>;
// }

// function AdminDashboard() {
//   return <h1>Admin Dashboard</h1>;
// }

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route
          path={ROUTES.STUDENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path={ROUTES.STUDENT_INSTRUCTIONS}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <AssessmentInstructions />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STUDENT_ATTEMPT}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <AssessmentLayout>
                <AssessmentAttempt />
              </AssessmentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STUDENT_TERMINATED}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <AssessmentTerminated />
            </ProtectedRoute>
          }
        />

        {/* result */}
        <Route
          path={ROUTES.STUDENT_SUBMITTED}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <AssessmentSubmitted />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STUDENT_RESULT}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <StudentResult />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STUDENT_ASSESSMENTS}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <StudentAssessments />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.STUDENT_PROFILE}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />

          <Route
            path={ROUTES.ADMIN_ASSESSMENTS}
            element={<AdminAssessments />}
          />

          <Route path={ROUTES.ADMIN_PROFILE} element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />

        <Route
          path={ROUTES.ADMIN_CREATE_ASSESSMENT}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateAssessment />} />
        </Route>

        <Route
          path={ROUTES.ADMIN_ASSESSMENT_DETAILS}
          element={<ManageAssessment />}
        />
        <Route
          path={ROUTES.ADMIN_CREATE_ASSESSMENT}
          element={<CreateAssessment />}
        />
      </Routes>
    </BrowserRouter>
  );
}

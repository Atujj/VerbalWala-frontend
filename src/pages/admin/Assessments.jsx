import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import { useAdminAssessments } from "@/hooks/useAdminAssessments";

import AdminAssessmentCard from "@/components/admin/assessment/AdminAssessmentCard";

export default function AdminAssessments() {
  const navigate = useNavigate();

  const {
    assessments,

    loading,
  } = useAdminAssessments();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Assessments</h2>

          <p className="text-slate-500 mt-2">Manage all your assessments.</p>
        </div>

        <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_ASSESSMENT)}>
          Create Assessment
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {assessments.map((assessment) => (
            <AdminAssessmentCard
              key={assessment.assessmentId}
              assessment={assessment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

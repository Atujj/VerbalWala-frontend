import { ClipboardCheck, Trophy, Clock, TrendingUp } from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import StatCard from "@/components/dashboard/StatCard";

import AssessmentCard from "@/components/assessment/AssessmentCard";
import { useAssessments } from "@/hooks/useAssessments";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Dashboard() {
  const { assessments, loading: assessmentLoading } = useAssessments();

  const navigate = useNavigate();

  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Student Dashboard</h2>

        <p className="text-slate-500 mt-2">
          Track your progress and start new assessments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Completed Tests"
          value={dashboard.completedAssessments}
          subtitle="Overall attempts"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Average Score"
          value={`${dashboard.averageScore}`}
          subtitle="Across all tests"
          icon={TrendingUp}
        />

        <StatCard
          title="Best Score"
          value={`${dashboard.bestScore}`}
          subtitle="Highest score"
          icon={Trophy}
        />

        <StatCard
          title="Pending"
          value={dashboard.pendingAssessments}
          subtitle="Assessments left"
          icon={Clock}
        />
      </div>

      <section className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">
      Latest Assessments
    </h2>

    <Button
      variant="outline"
      onClick={() => navigate(ROUTES.STUDENT_ASSESSMENTS)}
    >
      View All Assessments
    </Button>
  </div>

  {assessmentLoading ? (
    <p>Loading assessments...</p>
  ) : (
    <div className="grid gap-6 lg:grid-cols-2">
      {assessments.slice(0, 2).map((assessment) => (
        <AssessmentCard
          key={assessment.assessmentId}
          assessment={assessment}
        />
      ))}
    </div>
  )}



</section>
    </div>
  );
}

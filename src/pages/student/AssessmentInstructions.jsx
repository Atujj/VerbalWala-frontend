import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate, useParams } from "react-router-dom";
import { startAssessment } from "@/services/student/assessmentService";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

import { useAssessment } from "@/hooks/useAssessment";

import { useAssessmentDetails } from "@/hooks/useAssessmentDetails";

export default function AssessmentInstructions() {

  const {
    assessment,
    loading,
} = useAssessmentDetails();

    const { startAssessment: saveAssessment } = useAssessment();
    
  const navigate = useNavigate();

  const { assessmentId } = useParams();

  const handleStart = async () => {
    try {
        const response = await startAssessment(assessmentId);

        

        saveAssessment(response);

        toast.success("Assessment started");

        navigate(
            ROUTES.STUDENT_ATTEMPT.replace(
                ":attemptId",
                response.attemptId
            )
        );

    } catch (error) {
        toast.error(
            error.response?.data?.message ??
            "Unable to start assessment."
        );
    }
};

if (loading || !assessment) {
    return <p>Loading...</p>;
}

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold">
            {assessment.title}
          </h1>

          <p className="mt-3 text-slate-500">
            {assessment.description}
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-slate-500">Duration</p>

              <h2 className="text-xl font-semibold">{assessment.duration} Minutes</h2>
            </div>

            <div>
              <p className="text-slate-500">Questions</p>

              <h2 className="text-xl font-semibold">{assessment.totalQuestions}</h2>
            </div>

            <div>
              <p className="text-slate-500">Attempts</p>

              <h2 className="text-xl font-semibold">{assessment.attemptsUsed} / {assessment.maxAttempts}</h2>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">Instructions</h2>

            <ul className="mt-4 space-y-3 list-disc list-inside text-slate-600">
              <li>Complete all sections of the assessment.</li>

              <li>Once you move to the next section, you cannot return to the previous section.</li>

              <li>You cannot skip ahead to future sections.</li>

              <li>Each section will be submitted automatically when the timer expires.</li>

              <li>Once you click Start Assessment, the timer begins immediately and cannot be paused or restarted.</li>

              <li>Do not refresh the browser.</li>

              <li>Switching tabs may end your assessment.</li>
            </ul>
          </div>

          <Button className="mt-10 w-full" onClick={handleStart}>
            Start Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

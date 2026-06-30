import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate, useParams } from "react-router-dom";
import { startAssessment } from "@/services/student/assessmentService";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

import { useAssessment } from "@/hooks/useAssessment";

export default function AssessmentInstructions() {

    const { startAssessment: saveAssessment } = useAssessment();
    
  const navigate = useNavigate();

  const { assessmentId } = useParams();

  const handleStart = async () => {
    try {
        const response = await startAssessment(assessmentId);

        console.log(response);

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

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold">
            Communication Skills Assessment
          </h1>

          <p className="mt-3 text-slate-500">
            Read the instructions carefully before starting.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-slate-500">Duration</p>

              <h2 className="text-xl font-semibold">30 Minutes</h2>
            </div>

            <div>
              <p className="text-slate-500">Questions</p>

              <h2 className="text-xl font-semibold">22</h2>
            </div>

            <div>
              <p className="text-slate-500">Attempts</p>

              <h2 className="text-xl font-semibold">3</h2>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">Instructions</h2>

            <ul className="mt-4 space-y-3 list-disc list-inside text-slate-600">
              <li>Complete all sections.</li>

              <li>Do not refresh the browser.</li>

              <li>Passage and Email are AI evaluated.</li>

              <li>Timer cannot be paused.</li>

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

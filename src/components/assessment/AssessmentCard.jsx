import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, RotateCcw, CircleCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

import { ATTEMPT_STATUS } from "@/constants/attemptStatus";

import AttemptHistoryItem from "@/components/assessment/AttemptHistoryItem";

export default function AssessmentCard({ assessment }) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold">{assessment.title}</h2>

        <p className="mt-2 text-slate-500">{assessment.description}</p>

        <div className="mt-4 flex gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {assessment.duration} min
          </div>

          <div className="flex items-center gap-2">
            <FileText size={16} />
            {assessment.totalQuestions}
          </div>

          <div className="flex items-center gap-2">
            <RotateCcw size={16} />
            {assessment.attemptsUsed} / {assessment.maxAttempts}
          </div>
        </div>

        {assessment.attempts.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-slate-700">Attempt History</h3>

            {assessment.attempts.map((attempt) => (
              <AttemptHistoryItem key={attempt.attemptId} attempt={attempt} />
            ))}
          </div>
        )}

        {assessment.attemptsUsed < assessment.maxAttempts && (
          <Button
            className="mt-6 w-full"
            onClick={() =>
              navigate(
                ROUTES.STUDENT_INSTRUCTIONS.replace(
                  ":assessmentId",
                  assessment.assessmentId,
                ),
              )
            }
          >
            {assessment.latestStatus === ATTEMPT_STATUS.STARTED
    ? "Restart Assessment"
    : assessment.attemptsUsed === 0
        ? "Start Assessment"
        : `Start Attempt ${assessment.attemptsUsed + 1}`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

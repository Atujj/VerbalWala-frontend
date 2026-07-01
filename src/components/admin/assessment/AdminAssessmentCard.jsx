import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

export default function AdminAssessmentCard({ assessment }) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardContent className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{assessment.title}</h2>

          <p className="text-slate-500 mt-2">{assessment.description}</p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium
    ${
      assessment.status === "PUBLISHED"
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700"
    }`}
        >
          {assessment.status}
        </span>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p>
            Fill Blank :
            <span className="font-semibold ml-2">
              {assessment.fillBlankCount}
            </span>
          </p>

          <p>
            Passage :
            <span className="font-semibold ml-2">
              {assessment.passageCount}
            </span>
          </p>

          <p>
            Email :
            <span className="font-semibold ml-2">{assessment.emailCount}</span>
          </p>

          <p>
            Students :
            <span className="font-semibold ml-2">
              {assessment.studentCount}
            </span>
          </p>
        </div>

        <Button
          className="w-full"
          onClick={() =>
            navigate(
              ROUTES.ADMIN_ASSESSMENT_DETAILS.replace(
                ":assessmentId",
                assessment.assessmentId,
              ),
            )
          }
        >
          Manage Assessment
        </Button>
      </CardContent>
    </Card>
  );
}

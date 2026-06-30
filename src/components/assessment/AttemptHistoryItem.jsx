import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import { ATTEMPT_STATUS } from "@/constants/attemptStatus";

export default function AttemptHistoryItem({ attempt }) {

  const navigate = useNavigate();

  function getStatusColor() {

    switch (attempt.status) {

      case ATTEMPT_STATUS.COMPLETED:
        return "text-green-600";

      case ATTEMPT_STATUS.SUBMITTED:
      case ATTEMPT_STATUS.EVALUATING:
        return "text-amber-600";

      case ATTEMPT_STATUS.TERMINATED:
        return "text-red-600";

      case ATTEMPT_STATUS.ABANDONED:
        return "text-gray-600";

      default:
        return "text-blue-600";

    }

  }

  function getStatusText() {

    switch (attempt.status) {

        case ATTEMPT_STATUS.COMPLETED:
            return "Completed";

        case ATTEMPT_STATUS.SUBMITTED:
            return "Submitted";

        case ATTEMPT_STATUS.EVALUATING:
            return "Evaluation Pending";

        case ATTEMPT_STATUS.TERMINATED:
            return "Terminated";

        

        default:
            return "In Progress";

    }

}

  return (

    <div className="flex items-center justify-between rounded-lg border p-4">

      <div>

        <p className="font-medium">
          Attempt {attempt.attemptNumber}
        </p>

        <p className={`text-sm ${getStatusColor()}`}>
          {getStatusText()}
        </p>

      </div>

      <div className="flex items-center gap-4">

        {attempt.percentage != null && (

          <span className="font-semibold">

            {attempt.percentage.toFixed(1)}%

          </span>

        )}

        {attempt.canViewResult && (

          <Button
            size="sm"
            onClick={() =>
              navigate(
                ROUTES.STUDENT_RESULT.replace(
                  ":attemptId",
                  attempt.attemptId,
                ),
              )
            }
          >
            View Result
          </Button>

        )}

      </div>

    </div>

  );

}
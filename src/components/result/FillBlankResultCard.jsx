import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function FillBlankResultCard({ result }) {
  const correct = result.score === 1;

  return (
    <Card
      className={`border-l-4 ${
        correct ? "border-green-500" : "border-red-500"
      }`}
    >
      <CardContent className="p-6 space-y-5">

        <div className="flex items-start justify-between">

          <div className="flex gap-3">

            {correct ? (
              <CheckCircle className="text-green-600 mt-1" size={22} />
            ) : (
              <XCircle className="text-red-600 mt-1" size={22} />
            )}

            <div>

              <h3 className="font-semibold text-lg">
                {result.questionText}
              </h3>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Score
            </p>

            <p className="text-2xl font-bold">
              {result.score}/1
            </p>

          </div>

        </div>

        <div>

          <p className="text-sm text-slate-500 mb-2">
            Your Answer
          </p>

          <div
            className={`rounded-lg p-3 ${
              correct
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {result.studentAnswer || "No Answer"}
          </div>

        </div>

        {!correct && (

          <>
            <div>

              <p className="text-sm text-slate-500 mb-2">
                Correct Answer
              </p>

              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                {result.expectedAnswer}
              </div>

            </div>

            {result.alternativeAnswers?.length > 0 && (

              <div>

                <p className="text-sm text-slate-500 mb-2">
                  Alternative Answers
                </p>

                <div className="rounded-lg bg-slate-50 border p-3">

                  {result.alternativeAnswers.join(", ")}

                </div>

              </div>

            )}

          </>

        )}

      </CardContent>
    </Card>
  );
}
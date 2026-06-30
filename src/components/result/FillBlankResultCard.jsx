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
      <CardContent className="flex items-center justify-between p-5">

        <div className="flex items-center gap-4">

          {correct ? (
            <CheckCircle className="text-green-600" size={24} />
          ) : (
            <XCircle className="text-red-600" size={24} />
          )}

          <div>

            <p className="font-medium">
              {result.questionText}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {result.feedback[0]}
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-500">
            Score
          </p>

          <p className="font-bold text-lg">
            {result.score}
          </p>

        </div>

      </CardContent>
    </Card>
  );

}
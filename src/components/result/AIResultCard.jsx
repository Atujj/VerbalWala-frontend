import { Card, CardContent } from "@/components/ui/card";

export default function AIResultCard({ result }) {
  function getBorderColor() {
    if (result.score >= 8) {
      return "border-green-500";
    }

    if (result.score >= 5) {
      return "border-yellow-500";
    }

    return "border-red-500";
  }

  return (
    <Card className={`border-l-4 shadow-md ${getBorderColor()}`}>

      <CardContent className="p-6 space-y-6">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-semibold">
              {result.questionText}
            </h2>

          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Score
            </p>

            <p className="text-3xl font-bold text-violet-600">
              {result.score}/10
            </p>

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            Your Answer
          </h3>

          <div className="rounded-lg bg-slate-50 border p-4 whitespace-pre-wrap leading-7">

            {result.studentAnswer || "No Answer"}

          </div>

        </div>

        <div className="border-t pt-5">

          <h3 className="font-semibold mb-4">
            AI Feedback
          </h3>

          <ul className="space-y-3">

            {result.feedback.map((item, index) => (

              <li
                key={index}
                className="flex gap-3"
              >

                <span className="text-green-600 font-bold">
                  ✓
                </span>

                <span>
                  {item}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </CardContent>

    </Card>
  );
}
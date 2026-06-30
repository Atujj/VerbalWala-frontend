import { Card, CardContent } from "@/components/ui/card";

export default function ResultCard({ result }) {
  function getBorderColor() {

    if (result.questionType === "FILL_BLANK") {

        return result.score === 1
            ? "border-green-500"
            : "border-red-500";

    }

    if (result.score >= 8) {
      return "border-green-500";
    }

    if (result.score >= 5) {
      return "border-amber-500";
    }

    return "border-red-500";
  }
  return (
    <Card className={`shadow-md border-l-4 ${getBorderColor()}`}>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {result.questionType === "FILL_BLANK"
                ? "Fill in the Blank"
                : result.questionType === "PASSAGE"
                  ? "Passage Recall"
                  : "Email Writing"}
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {result.questionText}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">Score</p>

            <h2 className="text-3xl font-bold text-violet-600">
              {result.score}
            </h2>
          </div>
        </div>

        <div className="border-t pt-5">
          <h3 className="font-semibold mb-3">AI Feedback</h3>

          <ul className="space-y-3">
            {result.feedback.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>

                <span className="text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

import { useResult } from "@/hooks/useResult";

import ResultCard from "@/components/result/ResultCard";

import FillBlankResultCard from "@/components/result/FillBlankResultCard";

import AIResultCard from "@/components/result/AIResultCard";

import ResultSection from "@/components/result/ResultSection.jsx";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function StudentResult() {
  const navigate = useNavigate();

  const { result, loading } = useResult();

  if (loading) {
    return <div className="p-10">Loading result...</div>;
  }

  const fillBlankResults = result.results.filter(
    (question) => question.questionType === "FILL_BLANK",
  );

  const passageResults = result.results.filter(
    (question) => question.questionType === "PASSAGE",
  );

  const emailResults = result.results.filter(
    (question) => question.questionType === "EMAIL",
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold">Assessment Result</h1>

        <p className="text-slate-500 mt-2">
          Your assessment has been evaluated successfully.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">Overall Score</p>

            <h2 className="text-4xl font-bold mt-2">{result.overallScore}</h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">Total Marks</p>

            <h2 className="text-4xl font-bold mt-2">{result.totalMarks}</h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">Percentage</p>

            <h2 className="text-4xl font-bold mt-2">
              {result.percentage.toFixed(1)}%
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {/* Fill Blank */}

        {
          <ResultSection title="Fill in the Blank">
            {fillBlankResults.map((question) => (
              <FillBlankResultCard
                key={question.questionId}
                result={question}
              />
            ))}
          </ResultSection>
        }

        {/* Passage */}

        {passageResults.length > 0 && (
          <ResultSection title="Passage Recall">

            {passageResults.map((question) => (
              <AIResultCard key={question.questionId} result={question} />
            ))}
          </ResultSection>
        )}

        {/* Email */}

        {emailResults.length > 0 && (
          <ResultSection title="Email Writing">

            {emailResults.map((question) => (
              <AIResultCard key={question.questionId} result={question} />
            ))}
          </ResultSection>
        )}
      </div>

      <div className="flex justify-center py-10">
        <Button size="lg" onClick={() => navigate(ROUTES.STUDENT_DASHBOARD)}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

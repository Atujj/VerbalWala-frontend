import { Input } from "@/components/ui/input";
import AssessmentTimer from "./AssessmentTimer";

export default function FillBlankSection({
    timeLeft,
    warningCount,
    maxWarnings,
    currentIndex,
    totalQuestions,
    currentQuestion,
    answers,
    updateAnswer,
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-10 space-y-10">

            <AssessmentTimer
                timeLeft={timeLeft}
            />

            <div>

                <p className="text-sm text-slate-500">

                    Question {currentIndex + 1}

                    {" / "}

                    {totalQuestions}

                </p>

                <h2 className="mt-6 text-3xl font-semibold">

                    {currentQuestion.questionText}

                </h2>

                <Input

                    className="mt-8"

                    placeholder="Type your answer..."

                    value={
                        answers[currentQuestion.id] ?? ""
                    }

                    onChange={(e) =>
                        updateAnswer(e.target.value)
                    }

                />

            </div>

        </div>

    );

}
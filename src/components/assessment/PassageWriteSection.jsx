import AssessmentTimer from "./AssessmentTimer";

export default function PassageWriteSection({
    passageTimeLeft,
    passageAnswer,
    setPassageAnswer,
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">

            <AssessmentTimer
                timeLeft={passageTimeLeft}
            />

            <h1 className="text-3xl font-bold">
                Write a summary based on what you remember.
            </h1>

            <textarea
                rows={12}
                className="w-full rounded-lg border border-slate-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Write your passage here..."
                value={passageAnswer}
                onChange={(e) =>
                    setPassageAnswer(e.target.value)
                }
            />

        </div>

    );

}
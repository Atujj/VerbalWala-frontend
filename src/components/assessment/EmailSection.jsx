import AssessmentTimer from "./AssessmentTimer";

export default function EmailSection({
    email,
    emailTimeLeft,
    emailAnswer,
    setEmailAnswer,
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">

            <AssessmentTimer
                timeLeft={emailTimeLeft}
            />

            <h1 className="text-3xl font-bold">
                Email Writing
            </h1>

            <p className="leading-8 whitespace-pre-line">
                {email.questionText}
            </p>

            <textarea
                rows={14}
                className="w-full rounded-lg border border-slate-300 p-4 resize-none"
                placeholder="Write your email..."
                value={emailAnswer}
                onChange={(e) =>
                    setEmailAnswer(e.target.value)
                }
            />

        </div>

    );

}
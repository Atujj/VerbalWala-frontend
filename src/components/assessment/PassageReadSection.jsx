import AssessmentTimer from "./AssessmentTimer";

export default function PassageReadSection({
    passage,
    passageTimeLeft,
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-10">

            <AssessmentTimer
                timeLeft={passageTimeLeft}
            />

            <h1 className="mt-8 text-3xl font-bold">
                Read the passage carefully
            </h1>

            <p className="mt-8 whitespace-pre-line leading-8">
                {passage.questionText}
            </p>

        </div>

    );

}
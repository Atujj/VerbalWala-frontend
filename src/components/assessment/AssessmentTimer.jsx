export default function AssessmentTimer({ timeLeft }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-center">
            <p className="text-sm text-slate-500">
                Time Remaining
            </p>

            <h1 className="text-5xl font-bold text-violet-600">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </h1>
        </div>
    );
}
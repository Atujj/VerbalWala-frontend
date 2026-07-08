import { Loader2, CheckCircle2 } from "lucide-react";

export default function AssessmentCompleted() {

  return (

    <div className="min-h-[70vh] flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">

        <CheckCircle2
          className="mx-auto h-20 w-20 text-green-600"
        />

        <h1 className="mt-6 text-4xl font-bold">

          Assessment Completed

        </h1>

        <p className="mt-4 text-slate-600">

          Your responses have been recorded successfully.

        </p>

        <div className="mt-10">

          <Loader2
            className="mx-auto h-10 w-10 animate-spin text-violet-600"
          />

          <p className="mt-6 text-lg font-medium">

            Submitting your responses...

          </p>

          <p className="mt-2 text-slate-500">

            Please wait a few moments.

          </p>

        </div>

      </div>

    </div>

  );

}
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

export default function AssessmentSubmitted() {

    const navigate = useNavigate();

    return (

        <div className="min-h-[80vh] flex items-center justify-center">

            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">

                <div className="text-6xl mb-6">
                    ✅
                </div>

                <h1 className="text-4xl font-bold text-slate-900">
                    Assessment Submitted
                </h1>

                <p className="mt-4 text-slate-600 leading-7">

                    Thank you for completing your assessment.

                    <br />

                    Your responses have been submitted successfully.

                </p>

                <div className="mt-10 rounded-xl border bg-slate-50 p-6">

                    <p className="text-sm text-slate-500">
                        Current Status
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-amber-600">
                        Evaluation Pending
                    </h2>

                    <p className="mt-4 text-sm text-slate-600">

                        Our evaluation system is processing your responses.

                        <br />

                        Your result will appear once evaluation is completed.

                    </p>

                </div>

                <Button
                    className="mt-10"
                    onClick={() =>
                        navigate(
                            ROUTES.STUDENT_DASHBOARD
                        )
                    }
                >
                    Back to Dashboard
                </Button>

            </div>

        </div>

    );

}
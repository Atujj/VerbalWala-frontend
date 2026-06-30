import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function AssessmentTerminated() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-xl p-10 text-center space-y-6">

                <h1 className="text-4xl font-bold text-red-600">
                    Assessment Terminated
                </h1>

                <p>
                    Your assessment was terminated due to multiple
                    assessment integrity violations.
                </p>

                <Button
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
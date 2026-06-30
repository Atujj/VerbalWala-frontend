import { useAssessments } from "@/hooks/useAssessments";

import AssessmentCard from "@/components/assessment/AssessmentCard";

export default function Assessments() {

    const {

        assessments,

        loading,

    } = useAssessments();

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Assessments
                </h1>

                <p className="text-slate-500 mt-2">

                    View available assessments and your previous attempts.

                </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {assessments.map(assessment => (

                    <AssessmentCard

                        key={assessment.assessmentId}

                        assessment={assessment}

                    />

                ))}

            </div>

        </div>

    );

}
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useAssessments } from "@/hooks/useAssessments";

export function useAssessmentDetails() {

    const { assessmentId } = useParams();

    const { assessments, loading } = useAssessments();

    const assessment = useMemo(() =>

        assessments.find(
            item => item.assessmentId === assessmentId
        ),

        [assessments, assessmentId]

    );

    return {

        assessment,

        loading,

    };

}
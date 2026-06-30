import { useEffect, useState } from "react";
import { getAssessments } from "@/services/student/assessmentService";

export function useAssessments() {

    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadAssessments() {

            try {

                const data = await getAssessments();

                setAssessments(data);

            } finally {

                setLoading(false);

            }

        }

        loadAssessments();

    }, []);

    return {
        assessments,
        loading,
    };

}
import { useEffect, useState } from "react";

import { getAssessments } from "@/services/admin/assessmentService";

export function useAdminAssessments() {

    const [assessments, setAssessments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadAssessments() {

            try {

                const data = await getAssessments();

                setAssessments(data);

            } catch (error) {

                console.error(error);

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
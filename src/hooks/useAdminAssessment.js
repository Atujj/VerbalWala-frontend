import { useEffect, useState } from "react";

import {
    getAssessment,
} from "@/services/admin/assessmentService";

export function useAdminAssessment(assessmentId) {

    const [assessment, setAssessment] = useState(null);

    const [loading, setLoading] = useState(true);

    async function loadAssessment() {

        try {

            const data = await getAssessment(assessmentId);

            setAssessment(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadAssessment();

    }, [assessmentId]);

    return {

        assessment,

        loading,

        refresh: loadAssessment,

    };

}
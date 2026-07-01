import { useEffect, useState } from "react";

import {
    getAssessmentStudents,
} from "@/services/admin/assessmentService";

export function useAssessmentStudents(
    assessmentId
) {

    const [students, setStudents] =
        useState([]);

    useEffect(() => {

        async function load() {

            const data =
                await getAssessmentStudents(
                    assessmentId
                );

            setStudents(data);

        }

        load();

    }, [assessmentId]);

    return students;

}
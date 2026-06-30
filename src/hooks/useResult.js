import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getResult } from "@/services/student/resultService";

export function useResult() {

    const { attemptId } = useParams();

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchResult() {

            try {

                const data = await getResult(attemptId);

                setResult(data);

            } finally {

                setLoading(false);

            }

        }

        fetchResult();

    }, [attemptId]);

    return {

        result,

        loading,

    };

}
import { useEffect, useState } from "react";

import { getDashboard } from "@/services/admin/dashboardService";

export function useAdminDashboard() {

    const [dashboard, setDashboard] = useState({

        totalAssessments: 0,

        publishedAssessments: 0,

        totalStudents: 0,

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setDashboard(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    return {

        dashboard,

        loading,

    };

}
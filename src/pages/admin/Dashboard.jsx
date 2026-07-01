import {
    ClipboardCheck,
    CheckCircle,
    BookOpen,
    Users,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminDashboard() {

    const {

        dashboard,

        loading,

    } = useAdminDashboard();

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <div className="space-y-8">

            <div>

                <h2 className="text-3xl font-bold">

                    Admin Dashboard

                </h2>

                <p className="text-slate-500 mt-2">

                    Manage assessments and monitor students.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Assessments"
                    value={dashboard.totalAssessments}
                    subtitle="Created by you"
                    icon={ClipboardCheck}
                />

                <StatCard
                    title="Published"
                    value={dashboard.publishedAssessments}
                    subtitle="Currently live"
                    icon={CheckCircle}
                />

                <StatCard
                    title="Students"
                    value={dashboard.totalStudents}
                    subtitle="Registered students"
                    icon={Users}
                />

                <StatCard
                    title="Drafts"
                    value={
                        dashboard.totalAssessments -
                        dashboard.publishedAssessments
                    }
                    subtitle="Not published"
                    icon={BookOpen}
                />

            </div>

        </div>

    );

}
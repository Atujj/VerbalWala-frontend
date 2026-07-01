export const API = {
    BASE_URL: import.meta.env.VITE_API_URL,

    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
    },

    STUDENT: {
        START_ASSESSMENT: "/student/assessments",
    },

    ADMIN: {
        ASSESSMENTS: "/admin/assessments",
    },
};
import axiosInstance from "@/api/axios";

export async function getAssessments() {
    const response = await axiosInstance.get(
        "/student/assessments"
    );

    return response.data.data;
}

export async function startAssessment(assessmentId) {

    const response = await axiosInstance.post(
        `/student/assessments/${assessmentId}/start`
    );

    return response.data.data;

}

export async function submitFillBlanks(attemptId, answers) {

    const response = await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/submit-fill-blanks`,
        {
            answers,
        }
    );

    return response.data.data;
}

export async function submitPassage(attemptId, answers) {

    const response = await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/submit-passage`,
        {
            answers,
        }
    );

    return response.data.data;

}

export async function submitEmail(attemptId, answers) {

    const response = await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/submit-email`,
        {
            answers,
        }
    );

    return response.data.data;

}

export async function terminateAssessment(
    attemptId,
    reason
) {

    await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/terminate`,
        {
            reason,
        }
    );

}

export async function createAssessment(data) {

    const response = await axiosInstance.post(
        "/admin/assessments",
        data
    );

    return response.data.data;

}




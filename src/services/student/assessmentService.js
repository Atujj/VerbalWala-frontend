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

export async function submitPassage(attemptId, answer) {

    const response = await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/submit-passage`,
        {
            answer,
        }
    );

    return response.data.data;

}

export async function submitEmail(attemptId, answer) {

    const response = await axiosInstance.post(
        `/student/assessments/attempts/${attemptId}/submit-email`,
        {
            answer,
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




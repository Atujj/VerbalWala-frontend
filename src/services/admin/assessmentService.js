import axiosInstance from "@/api/axios";

export async function getAssessments() {

    const response = await axiosInstance.get(
        "/admin/assessments"
    );

    return response.data.data;

}

export async function createAssessment(data) {

    const response = await axiosInstance.post(
        "/admin/assessments",
        data
    );

    return response.data.data;

}

//Get Assessment by AssessmentID
export async function getAssessment(assessmentId) {

    const response = await axiosInstance.get(
        `/admin/assessments/${assessmentId}`
    );

    return response.data.data;

}

// Add Question
export async function addQuestion(
    assessmentId,
    question
) {

    await axiosInstance.post(
        `/admin/assessments/${assessmentId}/questions`,
        question
    );

}

//Update Question
export async function updateQuestion(
    questionId,
    question
) {

    await axiosInstance.put(
    `/admin/assessments/questions/${questionId}`,
    question
);

}

//Delete Question
export async function deleteQuestion(questionId) {

    await axiosInstance.delete(
    `/admin/assessments/questions/${questionId}`
);

}

//Publish Assessment
export async function publishAssessment(
    assessmentId
) {

    await axiosInstance.put(
        `/admin/assessments/${assessmentId}/publish`
    );

}

export async function getAssessmentStudents(
    assessmentId
) {

    const response =
        await axiosInstance.get(

            `/admin/assessments/${assessmentId}/students`

        );

    return response.data.data;

}
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useAdminAssessment } from "@/hooks/useAdminAssessment";

import QuestionForm from "@/components/admin/assessment/QuestionForm";

import { addQuestion } from "@/services/admin/assessmentService";

import { deleteQuestion } from "@/services/admin/assessmentService";

import { updateQuestion } from "@/services/admin/assessmentService";

import { publishAssessment } from "@/services/admin/assessmentService";

import { useAssessmentStudents } from "@/hooks/useAssessmentStudents";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

import { toast } from "sonner";

import { useState } from "react";

export default function ManageAssessment() {
  const navigate = useNavigate();

  const { assessmentId } = useParams();

  const { assessment, loading, refresh } = useAdminAssessment(assessmentId);

  const [selectedType, setSelectedType] = useState(null);

  const [editingQuestion, setEditingQuestion] = useState(null);

  const students = useAssessmentStudents(assessmentId);

  async function handleAddQuestion(question) {
    try {
      await addQuestion(assessment.assessmentId, question);

      setSelectedType(null);

      refresh();
    } catch (error) {
      console.error(error);
    }
  }

  //delete Question
  async function handleDeleteQuestion(questionId) {
    try {
      await deleteQuestion(questionId);

      refresh();
    } catch (error) {
      console.error(error);
    }
  }

  //edit Question
  async function handleUpdateQuestion(question) {
    try {
      await updateQuestion(
        editingQuestion.id,

        question,
      );

      setEditingQuestion(null);

      setSelectedType(null);

      refresh();
    } catch (error) {
      console.error(error);
    }
  }

  //publish
  

async function handlePublish() {

    try {

        await publishAssessment(assessment.assessmentId);

        toast.success("Assessment published successfully");

        refresh();

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ??
            "Failed to publish assessment"
        );

    }

}

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!assessment) {
    return <p>Assessment not found.</p>;
  }

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="w-fit"
        onClick={() => navigate(ROUTES.ADMIN_ASSESSMENTS)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assessments
      </Button>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{assessment.title}</h1>

          <p className="text-slate-500 mt-2">{assessment.description}</p>
        </div>

        <Button
          disabled={assessment.status === "PUBLISHED"}
          onClick={handlePublish}
        >
          {assessment.status === "PUBLISHED"
            ? "Published"
            : "Publish Assessment"}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-slate-500">Status</p>

          <h2 className="text-xl font-semibold">{assessment.status}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-slate-500">Attempts</p>

          <h2 className="text-xl font-semibold">{assessment.maxAttempts}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-slate-500">Fill Blank</p>

          <h2 className="text-xl font-semibold">{assessment.fillBlankTime}s</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-slate-500">Passage</p>

          <h2 className="text-xl font-semibold">
            {assessment.passageReadTime}/{assessment.passageWriteTime}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-slate-500">Email</p>

          <h2 className="text-xl font-semibold">
            {assessment.emailWritingTime}s
          </h2>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => setSelectedType("FILL_BLANK")}>
          Add Fill Blank
        </Button>

        <Button onClick={() => setSelectedType("PASSAGE")}>Add Passage</Button>

        <Button onClick={() => setSelectedType("EMAIL")}>Add Email</Button>
      </div>

      {selectedType && (
        <QuestionForm
          type={editingQuestion ? editingQuestion.type : selectedType}
          initialData={editingQuestion}
          onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
        />
      )}

      <div className="space-y-4">
        {assessment.questions.map((question) => (
          <div key={question.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{question.type}</h3>

                <p className="mt-2">{question.questionText}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedType(question.type);

                    setEditingQuestion(question);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Students Attempted</h2>

        {students.length === 0 ? (
          <p className="text-slate-500">
            No students have attempted this assessment.
          </p>
        ) : (
          students.map((student) => (
            <div
              key={student.attemptId}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{student.studentName}</h3>

                <p className="text-slate-500">
                  Score : {student.score}/{student.totalMarks}
                </p>
              </div>

              <Button variant="outline">View Result</Button>
            </div>
          ))
        )}
      </div>

      <div className="pt-8">
        <Button
          className="w-full h-12 text-base"
          onClick={() => navigate(ROUTES.ADMIN_ASSESSMENTS)}
        >
          Save & Return to Assessments
        </Button>
      </div>
    </div>
  );
}

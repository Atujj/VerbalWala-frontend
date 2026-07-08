import { useState, useEffect } from "react";

import FillBlankSection from "@/components/assessment/FillBlankSection";
import PassageReadSection from "@/components/assessment/PassageReadSection";
import PassageWriteSection from "@/components/assessment/PassageWriteSection";
import EmailSection from "@/components/assessment/EmailSection";

import { useAssessment } from "@/hooks/useAssessment";
import { useAssessmentEngine } from "@/hooks/useAssessmentEngine";

// import { submitFillBlanks } from "@/services/student/assessmentService";

import { ASSESSMENT_PHASES } from "@/constants/assessmentPhases";

import { useAssessmentIntegrity } from "@/hooks/useAssessmentIntegrity";

import AssessmentWarningDialog from "@/components/assessment/AssessmentWarningDialog";

import TransitionSection from "@/components/assessment/TransitionSection";

import AssessmentCompleted from "@/components/assessment/AssessmentCompleted";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

import {
  submitFillBlanks,
  submitPassage,
  submitEmail,
} from "@/services/student/assessmentService";

export default function AssessmentAttempt() {
  let content = null;

  const navigate = useNavigate();

  const { assessment } = useAssessment();

  //Engine
  const { currentQuestion, currentIndex, answers, updateAnswer, nextQuestion } =
    useAssessmentEngine(assessment.fillBlankQuestions);

  const { warningCount, maxWarnings, dialogOpen, closeDialog } =
    useAssessmentIntegrity({
      attemptId: assessment.attemptId,
    });

  //States
  const [timeLeft, setTimeLeft] = useState(assessment?.fillBlankTime ?? 0);

  if (!assessment) {
    return null;
  }

  const [phase, setPhase] = useState(ASSESSMENT_PHASES.FILL_BLANK);

  const [passageTimeLeft, setPassageTimeLeft] = useState(0);

  const [emailTimeLeft, setEmailTimeLeft] = useState(0);

  const [passages, setPassages] = useState([]);

  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);

  const [passageAnswers, setPassageAnswers] = useState({});

  const [emails, setEmails] = useState([]);

  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

  const [emailAnswers, setEmailAnswers] = useState({});

  const [passageReadingTime, setPassageReadingTime] = useState(0);

  const [passageWritingTime, setPassageWritingTime] = useState(0);

  const [transitionTime, setTransitionTime] = useState(10);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passageReady, setPassageReady] = useState(false);

  const [emailReady, setEmailReady] = useState(false);

  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const currentPassage = passages[currentPassageIndex];

  const currentEmail = emails[currentEmailIndex];

  //helper function

  const handleSubmitAssessment = () => {

  setSubmissionCompleted(true);

  submitEmailSection();

};

  const submitCurrentSection = async () => {
    const requestAnswers = assessment.fillBlankQuestions.map((question) => ({
      questionId: question.id,

      answer: answers[question.id] ?? "",
    }));

    try {
      const response = await submitFillBlanks(
        assessment.attemptId,
        requestAnswers,
      );

      setPassages(response.passageQuestions);

      setCurrentPassageIndex(0);

      setPassageReadingTime(response.readingTime);

      setPassageWritingTime(response.writingTime);

      setPassageTimeLeft(response.readingTime);

      setPassageReady(true);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPassageSection = async () => {
    const requestAnswers = passages.map((question) => ({
      questionId: question.id,

      answer: passageAnswers[question.id] ?? "",
    }));

    try {
      const response = await submitPassage(
        assessment.attemptId,

        requestAnswers,
      );

      setEmails(response.emailQuestions);

      setCurrentEmailIndex(0);

      setEmailTimeLeft(response.writingTime);

      setEmailReady(true);
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmailSection = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const requestAnswers = emails.map((question) => ({
      questionId: question.id,
      answer: emailAnswers[question.id] ?? "",
    }));

    try {
      await submitEmail(assessment.attemptId, requestAnswers);

      navigate(ROUTES.STUDENT_SUBMITTED);
    } catch (error) {
      console.error(error);

      setIsSubmitting(false);

      setSubmissionCompleted(false);
    }
  };

  //UseEffect
  useEffect(() => {
    if (phase !== ASSESSMENT_PHASES.FILL_BLANK) {
      return;
    }

    if (timeLeft === 0) {
      const moved = nextQuestion();

      if (moved) {
        setTimeLeft(assessment.fillBlankTime);
      } else {
        setPassageReady(false);

        setTransitionTime(15);

        setPhase(ASSESSMENT_PHASES.PASSAGE_TRANSITION);

        submitCurrentSection();
      }

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase !== ASSESSMENT_PHASES.PASSAGE_READ) {
      return;
    }

    if (passageTimeLeft === 0) {
      setPassageTimeLeft(passageWritingTime);

      setPhase(ASSESSMENT_PHASES.PASSAGE_WRITE);

      return;
    }

    const timer = setTimeout(() => {
      setPassageTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, passageTimeLeft]);

  useEffect(() => {
    if (phase !== ASSESSMENT_PHASES.PASSAGE_WRITE) {
      return;
    }

    if (passageTimeLeft === 0) {
      // More passages remaining
      if (currentPassageIndex < passages.length - 1) {
        setCurrentPassageIndex((prev) => prev + 1);

        setPassageTimeLeft(passageReadingTime);

        setPhase(ASSESSMENT_PHASES.PASSAGE_READ);

        return;
      }

      // Last passage finished
      setEmailReady(false);

      setTransitionTime(15);

      setPhase(ASSESSMENT_PHASES.EMAIL_TRANSITION);

      submitPassageSection();

      return;
    }

    const timer = setTimeout(() => {
      setPassageTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    phase,
    passageTimeLeft,
    currentPassageIndex,
    passages,
    passageReadingTime,
  ]);

  useEffect(() => {
    if (phase !== ASSESSMENT_PHASES.EMAIL || isSubmitting) {
      return;
    }

    if (emailTimeLeft === 0) {
      if (currentEmailIndex < emails.length - 1) {
        setCurrentEmailIndex((prev) => prev + 1);

        setEmailTimeLeft(assessment.emailWritingTime);

        return;
      }

      setSubmissionCompleted(true);

      submitEmailSection();

      return;
    }

    const timer = setTimeout(() => {
      setEmailTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, emailTimeLeft, currentEmailIndex, emails, isSubmitting]);

  useEffect(() => {
    if (
      phase !== ASSESSMENT_PHASES.PASSAGE_TRANSITION &&
      phase !== ASSESSMENT_PHASES.EMAIL_TRANSITION
    ) {
      return;
    }

    if (transitionTime === 0) {
      if (phase === ASSESSMENT_PHASES.PASSAGE_TRANSITION && passageReady) {
        setPhase(ASSESSMENT_PHASES.PASSAGE_READ);
      }

      if (phase === ASSESSMENT_PHASES.EMAIL_TRANSITION && emailReady) {
        setPhase(ASSESSMENT_PHASES.EMAIL);
      }

      return;
    }

    const timer = setTimeout(() => {
      setTransitionTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, transitionTime, passageReady, emailReady]);

  //Visibility Change

  // Fill Blank Phase
  if (phase === ASSESSMENT_PHASES.FILL_BLANK) {
    content = (
      <FillBlankSection
        timeLeft={timeLeft}
        currentIndex={currentIndex}
        totalQuestions={assessment.fillBlankQuestions.length}
        currentQuestion={currentQuestion}
        answers={answers}
        updateAnswer={updateAnswer}
      />
    );
  }

  if (phase === ASSESSMENT_PHASES.PASSAGE_TRANSITION) {
    content = (
      <TransitionSection
        title="📖 Passage Recall"
        subtitle="Fill in the Blank section completed successfully."
        timeLeft={transitionTime}
        instructions={[
          "Read the passage carefully.",
          "You cannot return to previous questions or skip to the next one.",
          "Write from memory after reading.",
          "The timer begins after this screen.",
        ]}
      />
    );
  }

  //Passage Read
  if (phase === ASSESSMENT_PHASES.PASSAGE_READ) {
    content = (
      <PassageReadSection
        passage={currentPassage}
        passageTimeLeft={passageTimeLeft}
      />
    );
  }

  //Passage Write
  if (phase === ASSESSMENT_PHASES.PASSAGE_WRITE) {
    content = (
      <PassageWriteSection
        passageTimeLeft={passageTimeLeft}
        passageAnswer={passageAnswers[currentPassage?.id] ?? ""}
        setPassageAnswer={(value) =>
          setPassageAnswers((prev) => ({
            ...prev,
            [currentPassage.id]: value,
          }))
        }
      />
    );
  }

  if (phase === ASSESSMENT_PHASES.EMAIL_TRANSITION) {
    content = (
      <TransitionSection
        title="✉️ Email Writing"
        subtitle="Passage Recall section completed successfully."
        timeLeft={transitionTime}
        instructions={[
          "Write a professional email.",
          "Use proper grammar and formatting.",
          "Be concise and relevant.",
          "The timer begins after this screen.",
        ]}
      />
    );
  }

  if (submissionCompleted) {
  content = <AssessmentCompleted />;
}

  //Email
  if (phase === ASSESSMENT_PHASES.EMAIL) {
    content = (
      
      <EmailSection
        email={currentEmail}
        emailTimeLeft={emailTimeLeft}
        emailAnswer={emailAnswers[currentEmail?.id] ?? ""}
        setEmailAnswer={(value) =>
          setEmailAnswers((prev) => ({
            ...prev,
            [currentEmail.id]: value,
          }))
        }
        onSubmit={handleSubmitAssessment}
      />
    );
  }

  return (
    <>
      <AssessmentWarningDialog
        open={dialogOpen}
        warningCount={warningCount}
        maxWarnings={maxWarnings}
        onClose={closeDialog}
      />

      {content}
    </>
  );
}

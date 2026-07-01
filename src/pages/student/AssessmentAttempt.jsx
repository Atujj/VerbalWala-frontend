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

  const currentPassage = passages[currentPassageIndex];

  const currentEmail = emails[currentEmailIndex];

  //helper function
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

      setPhase(ASSESSMENT_PHASES.PASSAGE_READ);
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

      setPhase(ASSESSMENT_PHASES.EMAIL);
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmailSection = async () => {
    const requestAnswers = emails.map((question) => ({
      questionId: question.id,

      answer: emailAnswers[question.id] ?? "",
    }));

    try {
      await submitEmail(
        assessment.attemptId,

        requestAnswers,
      );

      navigate(ROUTES.STUDENT_SUBMITTED);
    } catch (error) {
      console.error(error);
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
    if (phase !== ASSESSMENT_PHASES.EMAIL) {
      return;
    }

    if (emailTimeLeft === 0) {
      if (currentEmailIndex < emails.length - 1) {
        setCurrentEmailIndex((prev) => prev + 1);

        setEmailTimeLeft(assessment.emailWritingTime);

        return;
      }

      submitEmailSection();

      return;
    }

    const timer = setTimeout(() => {
      setEmailTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, emailTimeLeft, currentEmailIndex, emails]);

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

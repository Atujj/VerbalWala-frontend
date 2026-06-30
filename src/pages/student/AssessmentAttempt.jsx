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
    useAssessmentEngine(assessment);

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

  const [passage, setPassage] = useState(null);

  const [passageTimeLeft, setPassageTimeLeft] = useState(0);

  const [passageAnswer, setPassageAnswer] = useState("");

  const [email, setEmail] = useState(null);

  const [emailTimeLeft, setEmailTimeLeft] = useState(0);

  const [emailAnswer, setEmailAnswer] = useState("");

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

      setPassage(response);

      setPassageTimeLeft(response.readingTime);

      setPhase(ASSESSMENT_PHASES.PASSAGE_READ);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPassageSection = async () => {
    try {
      const response = await submitPassage(assessment.attemptId, passageAnswer);

      setEmail(response);

      setEmailTimeLeft(response.writingTime);

      setPhase(ASSESSMENT_PHASES.EMAIL);
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmailSection = async () => {
    try {
      await submitEmail(assessment.attemptId, emailAnswer);

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
      setPassageTimeLeft(passage.writingTime);

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
      submitPassageSection();

      return;
    }

    const timer = setTimeout(() => {
      setPassageTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, passageTimeLeft]);

  useEffect(() => {
    if (phase !== ASSESSMENT_PHASES.EMAIL) {
      return;
    }

    if (emailTimeLeft === 0) {
      submitEmailSection();

      return;
    }

    const timer = setTimeout(() => {
      setEmailTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, emailTimeLeft]);

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
      <PassageReadSection passage={passage} passageTimeLeft={passageTimeLeft} />
    );
  }

  //Passage Write
  if (phase === ASSESSMENT_PHASES.PASSAGE_WRITE) {
    content = (
      <PassageWriteSection
        passageTimeLeft={passageTimeLeft}
        passageAnswer={passageAnswer}
        setPassageAnswer={setPassageAnswer}
      />
    );
  }

  //Email
  if (phase === ASSESSMENT_PHASES.EMAIL) {
    content = (
      <EmailSection
        email={email}
        emailTimeLeft={emailTimeLeft}
        emailAnswer={emailAnswer}
        setEmailAnswer={setEmailAnswer}
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

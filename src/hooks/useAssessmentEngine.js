import { useState } from "react";

export function useAssessmentEngine(assessment) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    const currentQuestion =
        assessment.fillBlankQuestions[currentIndex];

    const updateAnswer = (value) => {

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value,
        }));

    };

    const nextQuestion = () => {

        if (
            currentIndex <
            assessment.fillBlankQuestions.length - 1
        ) {

            setCurrentIndex(prev => prev + 1);

            return true;
        }

        return false;

    };

    return {

        currentQuestion,

        currentIndex,

        answers,

        updateAnswer,

        nextQuestion,

    };

}
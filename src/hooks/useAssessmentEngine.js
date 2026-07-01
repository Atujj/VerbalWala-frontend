import { useState, useMemo } from "react";

export function useAssessmentEngine(questions = []) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    const currentQuestion = useMemo(() => {

        if (!questions || questions.length === 0) {
            return null;
        }

        return questions[currentIndex] ?? null;

    }, [questions, currentIndex]);

    function updateAnswer(value) {

        if (!currentQuestion) {
            return;
        }

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value,
        }));

    }

    function nextQuestion() {

        if (currentIndex < questions.length - 1) {

            setCurrentIndex(prev => prev + 1);

            return true;

        }

        return false;

    }

    function resetEngine() {

        setCurrentIndex(0);

        setAnswers({});

    }

    return {

        currentQuestion,

        currentIndex,

        answers,

        updateAnswer,

        nextQuestion,

        resetEngine,

        totalQuestions: questions.length,

    };

}
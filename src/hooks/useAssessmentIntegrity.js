import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { terminateAssessment } from "@/services/student/assessmentService";

import { ATTEMPT_END_REASONS } from "@/constants/attemptEndReasons";

import { ROUTES } from "@/constants/routes";



const MAX_WARNINGS = 3;

export function useAssessmentIntegrity({ attemptId }) {

    const navigate = useNavigate();

    const [warningCount, setWarningCount] = useState(0);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [isTerminating, setIsTerminating] = useState(false);

    function closeDialog() {

        setDialogOpen(false);

    }

    useEffect(() => {

        const handleVisibilityChange = () => {

            if (!document.hidden) {
                return;
            }

            setWarningCount(prev => prev + 1);

        };

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

        };

    }, []);

    useEffect(() => {
    

    if (warningCount === 0) {
        return;
    }

    if (warningCount < MAX_WARNINGS) {
        
        setDialogOpen(true);
        return;
    }

    

    if (isTerminating) {
        
        return;
    }

    async function terminate() {

        

        setIsTerminating(true);

        try {

            await terminateAssessment(
                attemptId,
                ATTEMPT_END_REASONS.TAB_SWITCH
            );

            

        } catch (error) {

            console.error("Terminate API failed", error);

        } finally {

            navigate(
                ROUTES.STUDENT_TERMINATED,
                { replace: true }
            );

        }

    }

    terminate();

}, [warningCount, isTerminating, attemptId, navigate]);


//Block Copy Paste
useEffect(() => {

    const preventContextMenu = (event) => {
        event.preventDefault();
    };

    const preventCopy = (event) => {
        event.preventDefault();
    };

    const preventCut = (event) => {
        event.preventDefault();
    };

    const preventPaste = (event) => {
        event.preventDefault();
    };

    document.addEventListener(
        "contextmenu",
        preventContextMenu
    );

    document.addEventListener(
        "copy",
        preventCopy
    );

    document.addEventListener(
        "cut",
        preventCut
    );

    document.addEventListener(
        "paste",
        preventPaste
    );

    return () => {

        document.removeEventListener(
            "contextmenu",
            preventContextMenu
        );

        document.removeEventListener(
            "copy",
            preventCopy
        );

        document.removeEventListener(
            "cut",
            preventCut
        );

        document.removeEventListener(
            "paste",
            preventPaste
        );

    };

}, []);

//Block Copy Paste by keyboard key
useEffect(() => {

    const handleKeyDown = (event) => {

        if (!event.ctrlKey && !event.metaKey) {
            return;
        }

        const key = event.key.toLowerCase();

        if (
            key === "c" ||
            key === "v" ||
            key === "x"
        ) {
            event.preventDefault();
        }

    };

    window.addEventListener(
        "keydown",
        handleKeyDown
    );

    return () => {

        window.removeEventListener(
            "keydown",
            handleKeyDown
        );

    };

}, []);

//Abondoned



    return {

        warningCount,

        maxWarnings: MAX_WARNINGS,

        dialogOpen,

        closeDialog,

    };

}
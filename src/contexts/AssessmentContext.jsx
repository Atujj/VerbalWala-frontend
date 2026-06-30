import { createContext, useMemo, useState } from "react";

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
    const [assessment, setAssessment] = useState(null);

    const startAssessment = (data) => {
        setAssessment(data);
    };

    const clearAssessment = () => {
        setAssessment(null);
    };

    const value = useMemo(
        () => ({
            assessment,
            startAssessment,
            clearAssessment,
        }),
        [assessment]
    );

    return (
        <AssessmentContext.Provider value={value}>
            {children}
        </AssessmentContext.Provider>
    );
}

export default AssessmentContext;
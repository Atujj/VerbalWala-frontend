import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/contexts/AuthContext";

import { AssessmentProvider } from "@/contexts/AssessmentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <AssessmentProvider>
                <App />
            </AssessmentProvider>
            <Toaster richColors />
        </AuthProvider>
    </React.StrictMode>
);
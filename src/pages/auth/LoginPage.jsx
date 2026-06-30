import Logo from "@/components/common/Logo";
import AuthCard from "@/components/common/AuthCard";
import LoginForm from "@/components/common/LoginForm";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";


export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <AuthCard>

                <div className="space-y-8">

                    <Logo />

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">
                            Welcome Back 👋
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Sign in to continue your assessment journey.
                        </p>
                    </div>

                    <LoginForm />

                </div>

                <div className="text-center text-sm">

    <span className="text-slate-500">
        New to VerbalWala?
    </span>

    <button
        onClick={() => navigate(ROUTES.SIGNUP)}
        className="ml-1 font-medium text-violet-600 hover:underline"
    >
        Create Account
    </button>

</div>

            </AuthCard>

        </div>
    );
}
import Logo from "@/components/common/Logo";
import AuthCard from "@/components/common/AuthCard";
import SignupForm from "@/components/common/SignupForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <AuthCard>

                <div className="space-y-8">

                    <Logo />

                    <div className="text-center">

                        <h2 className="text-2xl font-semibold">
                            Create Account
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Join VerbalWala and start your assessment journey.
                        </p>

                    </div>

                    <SignupForm />

                </div>

            </AuthCard>

        </div>
    );
}
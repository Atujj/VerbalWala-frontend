import { useAuth } from "@/hooks/useAuth";

export default function Header() {

    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between bg-white border-b px-8 py-5">

            <div>
                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>

                <p className="text-slate-500">
                    Welcome back, {user?.fullName} 👋
                </p>
            </div>

        </header>
    );
}
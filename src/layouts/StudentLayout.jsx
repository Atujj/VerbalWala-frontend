import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function StudentLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Header />

                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}
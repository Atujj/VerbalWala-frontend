import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/admin/layout/AdminSidebar";

import AdminHeader from "@/components/admin/layout/AdminHeader";

export default function AdminLayout() {

    return (

        <div className="min-h-screen flex bg-slate-100">

            <AdminSidebar />

            <div className="flex-1 flex flex-col">

                <AdminHeader />

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
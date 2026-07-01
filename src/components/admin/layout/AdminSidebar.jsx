import { NavLink, useNavigate } from "react-router-dom";

import Logo from "@/components/common/Logo";

import { ADMIN_NAVIGATION } from "@/constants/navigation";

import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";

import { ROUTES } from "@/constants/routes";

import { useAuth } from "@/hooks/useAuth";

export default function AdminSidebar() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate(ROUTES.LOGIN);

    }

    return (

        <aside className="w-64 bg-white border-r flex flex-col">

            <div className="p-6 border-b">

                <Logo />

            </div>

            <nav className="flex-1 p-4">

                {ADMIN_NAVIGATION.map(item => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition ${
                                    isActive
                                        ? "bg-violet-100 text-violet-700 font-semibold"
                                        : "hover:bg-violet-50 hover:text-violet-600"
                                }`
                            }
                        >

                            <Icon size={20} />

                            {item.title}

                        </NavLink>

                    );

                })}

            </nav>

            <div className="p-4 border-t">

                <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                >

                    <LogOut className="mr-2 h-4 w-4" />

                    Logout

                </Button>

            </div>

        </aside>

    );

}
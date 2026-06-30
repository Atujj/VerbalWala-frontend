import { useMemo, useState } from "react";
import { STORAGE } from "@/constants/storage";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(STORAGE.USER);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (loginData) => {
    localStorage.setItem(STORAGE.TOKEN, loginData.token);
    localStorage.setItem(
        STORAGE.USER,
        JSON.stringify(loginData.user)
    );

    setUser(loginData.user);
};

    const logout = () => {
        localStorage.removeItem(STORAGE.TOKEN);
        localStorage.removeItem(STORAGE.USER);

        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            isAuthenticated: !!user,
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
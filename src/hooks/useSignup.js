import { useState } from "react";

import { signup } from "@/services/auth/authService";

export function useSignup() {

    const [loading, setLoading] = useState(false);

    async function register(values) {

        setLoading(true);

        try {

            await signup(values);

        } finally {

            setLoading(false);

        }

    }

    return {

        register,

        loading,

    };

}
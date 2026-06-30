import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signup } from "@/services/auth/authService";

import { ROUTES } from "@/constants/routes";

export default function SignupForm() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await signup({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });

            alert("Account created successfully.");

            navigate(ROUTES.LOGIN);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to create account."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <Input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
            />

            <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />

            <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
            />

            {error && (

                <p className="text-sm text-red-600">
                    {error}
                </p>

            )}

            <Button
                className="w-full"
                disabled={loading}
            >
                {loading
                    ? "Creating Account..."
                    : "Create Account"}
            </Button>

            <p className="text-center text-sm text-slate-500">

                Already have an account?{" "}

                <button
                    type="button"
                    className="text-violet-600 hover:underline"
                    onClick={() => navigate(ROUTES.LOGIN)}
                >
                    Sign In
                </button>

            </p>

        </form>

    );

}
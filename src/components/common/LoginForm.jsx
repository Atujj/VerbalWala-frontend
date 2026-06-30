import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { loginSchema } from "@/validations/authValidation";
import { login as loginService } from "@/services/auth/authService";

import { useAuth } from "@/hooks/useAuth";

import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const response = await loginService(data);

            login(response);

            toast.success("Login successful");

            if (response.user.role === ROLES.ADMIN) {
                navigate(ROUTES.ADMIN_DASHBOARD);
            } else {
                navigate(ROUTES.STUDENT_DASHBOARD);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <div>

                <Label>Email</Label>

                <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}

            </div>

            <div>

                <Label>Password</Label>

                <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}

            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Signing In..." : "Login"}
            </Button>

        </form>
    );

}
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    createAssessment,
    publishAssessment,
} from "@/services/admin/assessmentService";

import {
    createAssessmentSchema,
} from "@/validations/adminValidation";

import { ROUTES } from "@/constants/routes";

export default function CreateAssessment() {

    const navigate = useNavigate();

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm({

        resolver: zodResolver(
            createAssessmentSchema
        ),

        defaultValues: {

            maxAttempts: 2,

            fillBlankTime: 25,

            passageReadTime: 30,

            passageWriteTime: 90,

            emailWritingTime: 540,

        },

    });

    async function handleCreate(
        data,
        publish = false
    ) {

        try {

            const assessmentId =
                await createAssessment(data);

            if (publish) {

                await publishAssessment(
                    assessmentId
                );

            }

            toast.success(
                "Assessment created successfully"
            );

            navigate(

                ROUTES.ADMIN_ASSESSMENT_DETAILS.replace(

                    ":assessmentId",

                    assessmentId

                )

            );

        } catch (error) {

            console.error(error);

            toast.error("Failed to create assessment");

        }

    }

    return (

        <form
            onSubmit={handleSubmit(
                data => handleCreate(data)
            )}
            className="space-y-6 max-w-3xl mx-auto"
        >

            <div>

                <h1 className="text-3xl font-bold">

                    Create Assessment

                </h1>

                <p className="text-slate-500">

                    Configure your assessment before adding questions.

                </p>

            </div>

            <div>

                <Label>Title</Label>

                <Input
                    {...register("title")}
                />

                <p className="text-red-500 text-sm">

                    {errors.title?.message}

                </p>

            </div>

            <div>

                <Label>Description</Label>

                <Input
                    {...register("description")}
                />

                <p className="text-red-500 text-sm">

                    {errors.description?.message}

                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <Label>Max Attempts</Label>

                    <Input
                        type="number"
                        {...register(
                            "maxAttempts",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                </div>

                <div>

                    <Label>Fill Blank Time</Label>

                    <Input
                        type="number"
                        {...register(
                            "fillBlankTime",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                </div>

                <div>

                    <Label>Passage Read Time</Label>

                    <Input
                        type="number"
                        {...register(
                            "passageReadTime",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                </div>

                <div>

                    <Label>Passage Write Time</Label>

                    <Input
                        type="number"
                        {...register(
                            "passageWriteTime",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                </div>

                <div>

                    <Label>Email Writing Time</Label>

                    <Input
                        type="number"
                        {...register(
                            "emailWritingTime",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <Button type="submit">

                    Create

                </Button>

                <Button
                    type="button"
                    onClick={handleSubmit(
                        data =>
                            handleCreate(
                                data,
                                true
                            )
                    )}
                >

                    Create & Publish

                </Button>

            </div>

        </form>

    );

}
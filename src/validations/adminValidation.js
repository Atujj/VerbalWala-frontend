import { z } from "zod";

export const createAssessmentSchema = z.object({

    title: z.string().min(3),

    description: z.string().min(10),

    maxAttempts: z.number().min(1),

    fillBlankTime: z.number().min(1),

    passageReadTime: z.number().min(1),

    passageWriteTime: z.number().min(1),

    emailWritingTime: z.number().min(1),

});
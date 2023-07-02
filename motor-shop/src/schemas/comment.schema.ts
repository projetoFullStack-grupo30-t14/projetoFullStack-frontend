import { z } from "zod";

export const commentRequestSchema = z.object({
    content: z.string()
})

export const commentSchema = z.object({
    id: z.string(),
    car_id: z.string(),
    user: z.object({
        name: z.string(),
        id: z.string()
    }),
    content: z.string(),
    created_at: z.string().or(z.string().datetime()),
    updated_at: z.string().or(z.string().datetime()),
})

export type commentRequestType = z.infer<typeof commentRequestSchema>
export type CommentType = z.infer<typeof commentSchema>
import z, { email } from "zod"

export const User = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
})

export const LoginUser = z.object({
    email: z.email(),
    password: z.string().min(6)
})
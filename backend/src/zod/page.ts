import z, { string } from "zod"

export const Page = z.object({
    name: string(),
    category: string()
})
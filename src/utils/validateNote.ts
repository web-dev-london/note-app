import { z } from "zod";
import notes from "../data";

const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    created: z.date(),
});

export const noteArraySchema = z.array(noteSchema);

export const note = noteArraySchema.parse(notes)

export type Note = z.infer<typeof noteArraySchema>; // infer the type
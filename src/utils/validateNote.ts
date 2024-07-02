import { z } from "zod";
import notesData from "../data";

const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    created: z.string(),
});

export const noteArraySchema = z.array(noteSchema);

export const parsedNotes = noteArraySchema.parse(notesData)

export type Note = z.infer<typeof noteArraySchema>; // infer the type
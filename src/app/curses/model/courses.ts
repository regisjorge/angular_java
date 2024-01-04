import { Lesson } from "./lesson";

export interface Courses {
    id: string;
    name: string;
    category: string;
    lessons?: Lesson[];
}

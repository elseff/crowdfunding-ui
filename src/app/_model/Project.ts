import { Author } from "./Author";
import { Comment } from "./Comment";
import { Image } from "./Image";
import { ProjectCategory } from "./ProjectCategory";

export interface Project {
    id: number,
    name: string,
    description: string,
    author: Author,
    images: Image[],
    comments: Comment[],
    category: ProjectCategory,
    target: number,
    createdAt: Date
}
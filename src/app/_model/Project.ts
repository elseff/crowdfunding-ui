import { Author } from "./Author";
import { Comment } from "./Comment";
import { Image } from "./Image";

export interface Project {
    id: number,
    name: string,
    description: string,
    author: Author,
    images: Image[],
    comments: Comment[]
}
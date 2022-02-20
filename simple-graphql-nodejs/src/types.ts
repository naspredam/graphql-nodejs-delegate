export interface Post {
    id: string
    text: string
    tags: [string]
    comments: [Comment]
}

interface Comment {
    id: number
    text: string
}
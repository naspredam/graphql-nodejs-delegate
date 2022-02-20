export interface Post {
    id: number
    text: string
    tags: [string]
    comments: [Comment]
}

interface Comment {
    id: number
    text: string
}
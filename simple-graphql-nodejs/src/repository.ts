import { Post } from '@core/types';

export const all: Post[] = [
    { id: "1", text: 'text1', tags: ['tag1'], comments: [{ id: 11, text: 'comment text 1-1' }] },
    { id: "2", text: 'text2', tags: ['tag2'], comments: [{ id: 21, text: 'comment text 2-1' }] },
    { id: "3", text: 'text3', tags: ['tag3'], comments: [{ id: 31, text: 'comment text 3-1' }] },
    { id: "4", text: 'text4', tags: ['tag4'], comments: [{ id: 41, text: 'comment text 4-1' }] },
    { id: "5", text: 'text5', tags: ['tag5'], comments: [{ id: 51, text: 'comment text 5-1' }] },
    { id: "6", text: 'text6', tags: ['tag6'], comments: [{ id: 61, text: 'comment text 6-1' }] },
    { id: "7", text: 'text7', tags: ['tag7'], comments: [{ id: 71, text: 'comment text 7-1' }] },
    { id: "8", text: 'text8', tags: ['tag8'], comments: [{ id: 81, text: 'comment text 8-1' }] }
];

export const findByIdIn = (ids: string[]) =>
    all.filter((post: Post) => ids.includes(post.id))
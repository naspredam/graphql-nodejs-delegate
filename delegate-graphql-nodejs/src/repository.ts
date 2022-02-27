import { always, cond, gte, lt } from 'ramda'

export const getIds =
    cond([
        [ gte(3), (group: number) => ([`${group}`, `${group + 3}`]) ],
        [ lt(3), always(['8']) ]
    ])
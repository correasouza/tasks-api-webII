import {create} from "../controllers/tasks/create.js"

export const tasks = [
    {
        method: 'POST',
        path: '/tasks',
        controller: create
    }
]
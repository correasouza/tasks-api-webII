import { create } from "../controllers/tasks/create.js"
import { index } from "../controllers/tasks/index.js"
import { list } from "../controllers/tasks/list.js"
import { search } from "../controllers/tasks/search.js"
import { update } from "../controllers/tasks/update.js"
import { deleteTask } from "../controllers/tasks/delete.js"
import { complete } from "../controllers/tasks/complete.js"

export const tasks = [
    {
        method: 'POST',
        path: '/tasks',
        controller: create
    },
    {
        method: 'GET',
        path: '/tasks',
        controller: index
    },
    {
        method: 'GET',
        path: '/tasks/list',
        controller: list
    },
    {
        method: 'GET',
        path: '/tasks/search',
        controller: search
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        controller: update
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        controller: deleteTask
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        controller: complete
    }
]
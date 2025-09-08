import {randomUUID} from 'node:crypto'

export function create ({req, res, database}){
    const { title, description } = req.body

    const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        create_at: new Date(),
        update_at: new Date()
    }

    database.insert("task", task)

    return res.writeHead(201).end(JSON.stringify(task))
}
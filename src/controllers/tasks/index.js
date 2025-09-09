export function index({req, res, database}){
    try {
        const tasks = database.select("task")
        return res.writeHead(200, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify(tasks))
    } catch (error) {
        return res.writeHead(500, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify({ error: 'Erro interno do servidor' }))
    }
}
export function search({req, res, database}) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const query = url.searchParams.get('q')
        const title = url.searchParams.get('title')
        const description = url.searchParams.get('description')
        
        const tasks = database.select("task")
        let filteredTasks = tasks
        
        if (query) {
            filteredTasks = filteredTasks.filter(task => 
                (task.title && task.title.toLowerCase().includes(query.toLowerCase())) ||
                (task.description && task.description.toLowerCase().includes(query.toLowerCase()))
            )
        }

        if (title) {
            filteredTasks = filteredTasks.filter(task => 
                task.title && task.title.toLowerCase().includes(title.toLowerCase())
            )
        }
        
        if (description) {
            filteredTasks = filteredTasks.filter(task => 
                task.description && task.description.toLowerCase().includes(description.toLowerCase())
            )
        }
        
        const sortedTasks = filteredTasks.sort((a, b) => 
            new Date(b.create_at) - new Date(a.create_at)
        )
        
        return res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).end(JSON.stringify({
            success: true,
            data: sortedTasks,
            total: sortedTasks.length,
            filters: {
                query: query || null,
                title: title || null,
                description: description || null
            }
        }))
    } catch (error) {
        console.error('Erro ao buscar tasks:', error)
        return res.writeHead(500, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify({ 
                      success: false,
                      error: 'Erro interno do servidor ao buscar tasks' 
                  }))
    }
}

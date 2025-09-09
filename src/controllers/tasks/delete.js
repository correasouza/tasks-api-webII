export function deleteTask({req, res, database}) {
    try {
        const { id } = req.params
        
        if (!id) {
            return res.writeHead(400, { 'Content-Type': 'application/json' })
                      .end(JSON.stringify({
                          success: false,
                          error: 'ID da task é obrigatório'
                      }))
        }
        
        const existingTask = database.findById("task", id)
        if (!existingTask) {
            return res.writeHead(404, { 'Content-Type': 'application/json' })
                      .end(JSON.stringify({
                          success: false,
                          error: 'Task não encontrada'
                      }))
        }
        
        const deletedTask = database.delete("task", id)
        
        return res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).end(JSON.stringify({
            success: true,
            data: deletedTask,
            message: 'Task removida com sucesso'
        }))
        
    } catch (error) {
        console.error('Erro ao remover task:', error)
        return res.writeHead(500, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify({ 
                      success: false,
                      error: 'Erro interno do servidor ao remover task' 
                  }))
    }
}
export function complete({req, res, database}) {
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
        
        const isCurrentlyCompleted = existingTask.completed_at !== null
        const updateData = {
            completed_at: isCurrentlyCompleted ? null : new Date().toISOString()
        }
        
        const updatedTask = database.update("task", id, updateData)
        
        const action = isCurrentlyCompleted ? 'desmarcada como incompleta' : 'marcada como completa'
        
        return res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }).end(JSON.stringify({
            success: true,
            data: updatedTask,
            message: `Task ${action} com sucesso`
        }))
        
    } catch (error) {
        console.error('Erro ao alterar status da task:', error)
        return res.writeHead(500, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify({ 
                      success: false,
                      error: 'Erro interno do servidor ao alterar status da task' 
                  }))
    }
}
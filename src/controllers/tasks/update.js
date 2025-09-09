export function update({req, res, database}) {
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
        
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        
        req.on('end', () => {
            try {
                const updateData = JSON.parse(body)
                
                if (!updateData.title && !updateData.description) {
                    return res.writeHead(400, { 'Content-Type': 'application/json' })
                              .end(JSON.stringify({
                                  success: false,
                                  error: 'Pelo menos um campo (title ou description) deve ser fornecido'
                              }))
                }
                
                const fieldsToUpdate = {}
                if (updateData.title !== undefined) {
                    fieldsToUpdate.title = updateData.title
                }
                if (updateData.description !== undefined) {
                    fieldsToUpdate.description = updateData.description
                }
                
                const updatedTask = database.update("task", id, fieldsToUpdate)
                
                return res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }).end(JSON.stringify({
                    success: true,
                    data: updatedTask,
                    message: 'Task atualizada com sucesso'
                }))
                
            } catch (parseError) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                          .end(JSON.stringify({
                              success: false,
                              error: 'JSON inválido no body da requisição'
                          }))
            }
        })
        
    } catch (error) {
        console.error('Erro ao atualizar task:', error)
        return res.writeHead(500, { 'Content-Type': 'application/json' })
                  .end(JSON.stringify({ 
                      success: false,
                      error: 'Erro interno do servidor ao atualizar task' 
                  }))
    }
}
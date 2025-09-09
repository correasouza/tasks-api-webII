import {routes} from "../routes/index.js"
import { Database } from "../database/database.js"

const database = new Database()

export function routeHandler(req, res){
    const route = routes.find((route)=>{
        if (route.path === req.url) {
            return route.method === req.method
        }
        
        if (route.path.includes(':')) {
            const routeParts = route.path.split('/')
            const urlParts = req.url.split('?')[0].split('/')
            
            if (routeParts.length === urlParts.length) {
                const isMatch = routeParts.every((part, index) => {
                    return part.startsWith(':') || part === urlParts[index]
                })
                
                if (isMatch && route.method === req.method) {

                    const params = {}
                    routeParts.forEach((part, index) => {
                        if (part.startsWith(':')) {
                            const paramName = part.slice(1)
                            params[paramName] = urlParts[index]
                        }
                    })
                    req.params = params
                    return true
                }
            }
        }
        
        return false
    })

    if(route){
        return route.controller({req, res, database})
    }

    return res.writeHead(404).end()
}
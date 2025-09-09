import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(DATABASE_PATH,"utf8")
            .then((data) => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }


    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
    }

    select(table){
        let data = this.#database[table] ?? []
        return data
    }

    findById(table, id) {
        const data = this.#database[table] ?? []
        return data.find(item => item.id === id)
    }

    update(table, id, updateData) {
        const data = this.#database[table] ?? []
        const index = data.findIndex(item => item.id === id)
        
        if (index === -1) {
            return null
        }
        
        const updatedItem = {
            ...data[index],
            ...updateData,
            update_at: new Date().toISOString()
        }
        
        data[index] = updatedItem
        this.#persist()
        
        return updatedItem
    }

    delete(table, id) {
        const data = this.#database[table] ?? []
        const index = data.findIndex(item => item.id === id)
        
        if (index === -1) {
            return null
        }
        
        const deletedItem = data[index]
        data.splice(index, 1)
        this.#persist()
        
        return deletedItem
    }
}
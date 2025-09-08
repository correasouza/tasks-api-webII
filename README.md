# UNIFESSPA - Universidade Federal do Sul e Sudeste do Pará

**Curso:** Sistemas de Informação  
**Disciplina:** Desenvolvimento de Sistemas Web II  
**Professor:** Warley Junior  
**Semestre:** 2025-4  

## 📌 Atividade Prática 01 - NODE

> ⚠️ Exercício pode ser feito individual ou em dupla  
> ❌ Códigos desenvolvidos por Inteligência Artificial (IA) ou plágios acarretam nota zero.

---

## 🎯 Objetivo

Desenvolver uma **API para realizar o CRUD de tasks (tarefas)**.

---

## ✅ Funcionalidades da API

- Criar uma task
- Listar todas as tasks
- Atualizar uma task pelo `id`
- Remover uma task pelo `id`
- Marcar uma task como completa (ou reverter)

---

## 🧱 Estrutura da Task

Cada task deve conter as seguintes propriedades:

| Propriedade     | Descrição                                                                 |
|-----------------|---------------------------------------------------------------------------|
| `id`            | Identificador único da task                                               |
| `title`         | Título da task                                                            |
| `description`   | Descrição detalhada da task                                               |
| `completed_at`  | Data de conclusão da task (inicialmente `null`)                           |
| `created_at`    | Data de criação da task                                                   |
| `updated_at`    | Data da última atualização da task                                        |

---

## 🔁 Rotas da API

### 📥 POST `/tasks`

- Cria uma nova task.
- Campos esperados no `body`: `title`, `description`
- Campos gerados automaticamente: `id`, `created_at`, `updated_at`, `completed_at`

---

### 📤 GET `/tasks`

- Lista todas as tasks salvas.
- Permite busca por `title` e `description`.

---

### ✏️ PUT `/tasks/:id`

- Atualiza uma task pelo `id`.
- Campos aceitos no `body`: `title` e/ou `description`
- Se apenas um campo for enviado, o outro não deve ser alterado.
- Deve validar se o `id` existe no banco de dados.

---

### 🗑️ DELETE `/tasks/:id`

- Remove uma task pelo `id`.
- Deve validar se o `id` existe no banco de dados.

---

### ✅ PATCH `/tasks/:id/complete`

- Marca a task como completa ou reverte para incompleta.
- Deve validar se o `id` existe no banco de dados.

---

## 💡 Sugestões de Implementação

- Validar se `title` e `description` estão presentes nas rotas `POST` e `PUT`.
- Nas rotas com `/:id`, retornar mensagem clara se o registro não existir.

---


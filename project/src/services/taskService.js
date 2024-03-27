import {getToken} from './tokenService.js';

class TaskService{
    constructor() {
        this.token = getToken();
    }

    async getAll(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/tasks/all',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async getAllByUser(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/tasks/allByUser',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async create(data){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
            })

            if(!res.ok){
                throw new Error('Error al crear la tarea');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async delete(id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/tasks/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            })

            if(res.status != 204){
                throw new Error('Error al eliminar la tarea');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async updateStatus(newStatus, id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/tasks/update/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(newStatus)
            })

            if(res.status != 204){
                throw new Error('Error al actualizar la tarea');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async updateDescription(newDescription, id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/tasks/update/description/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(newDescription)
            })

            if(res.status != 204){
                throw new Error('Error al actualizar la tarea');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }
}

export const taskService = Object.freeze(new TaskService())
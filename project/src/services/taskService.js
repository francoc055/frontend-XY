import {getToken} from './tokenService.js';
import Swal from 'sweetalert2';

class TaskService{


    async getAll(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/tasks/all',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async getAllByUser(){
        try {
            // console.log(this.token)
            const res = await fetch('http://127.0.0.1:8000/api/tasks/allByUser',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
            });
            const data = await res.json();
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
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
            })

            if(res.status == 401){
                Swal.fire({
                    icon: "error",
                    title: "No tienes autorizacion",
                });
            }
            else if(res.status == 201){
                Swal.fire({
                    icon: "success",
                    title: "Tarea creada",
                });
            }
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
                'Authorization': `Bearer ${getToken()}`
            }
            })

            if(res.status == 401){
                Swal.fire({
                    icon: "error",
                    title: "No tienes autorizacion",
                });
            }
            else if(res.status == 204){
                Swal.fire({
                    icon: "success",
                    title: "Eliminado",
                });
            }
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
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(newStatus)
            })

            if(res.status == 204){
                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                });
            }
            if(res.status == 404){
                Swal.fire({
                    icon: "error",
                    title: "No tienes autorizacion",
                });
            }
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
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(newDescription)
            })

            if(res.status == 401){
                Swal.fire({
                    icon: "error",
                    title: "No tienes autorizacion",
                });
            }
            else if(res.status == 204){
                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                });
            }
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }
}

export const taskService = Object.freeze(new TaskService())
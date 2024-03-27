import {getToken} from './tokenService.js';

class CommentService{
    constructor() {
        this.token = getToken();
    }

    async getAllByTask(id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/comments/task/${id}`,{
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
            const res = await fetch('http://127.0.0.1:8000/api/comments/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
            })

            if(res.status != 201){
                throw new Error('Error al crear el comentario');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }


    async delete(id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/comments/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            })

            if(res.status != 204){
                throw new Error('Error al eliminar el comentario');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

}


export const commentService = Object.freeze(new CommentService())

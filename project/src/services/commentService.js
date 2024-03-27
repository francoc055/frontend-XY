import {getToken} from './tokenService.js';
import Swal from 'sweetalert2';


class CommentService{

    async getAllByTask(id){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/comments/task/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
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
                'Authorization': `Bearer ${getToken()}`
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
                'Authorization': `Bearer ${getToken()}`
            }
            })

            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

}


export const commentService = Object.freeze(new CommentService())

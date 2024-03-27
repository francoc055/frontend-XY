import {getToken} from './tokenService.js';
import Swal from 'sweetalert2';


class UserService{

    async getAll(){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/all',{
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

    async login(data){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
            })
            if(res.status == 400){
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                });
            }
            data = await res.json();
            localStorage.setItem('token', data.token);
            return res.status;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async create(data){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/create/', {
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
            if(res.status == 201){
                Swal.fire("email enviado")
            }
            return res.status;
        } catch (error) {
            console.error(error)
        }
    }

    async resetPass(data){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/reset-password/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
            })

            if(res.status == 401){
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                });
            }
            return res.status;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async sendEmail(email){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(email)
            })

            if(res.status == 404){
                Swal.fire({
                    icon: "error",
                    title: "No existe el email",
                });
            }
            if(res.status == 200){
                Swal.fire("email enviado")
            }
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }
}


export const userService = Object.freeze(new UserService())

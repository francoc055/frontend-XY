import {getToken} from './tokenService.js';


class UserService{
    constructor() {
        this.token = getToken();
    }

    async login(data){
        try {
            const res = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
            })

            if(res.status != 200){
                throw new Error('Error al loguearse');
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
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
            })

            if(res.status != 201){
                throw new Error('Error al crear usuario');
            }
            console.log(res)
            return res.status;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }

    async resetPass(data){
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/reset-password/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
            })

            if(res.status != 204){
                throw new Error(`error al actualizar: ${res.status}`);
            }
            console.log(res)
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
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(email)
            })

            if(res.status != 200){
                throw new Error('Error al enviar email');
            }
            console.log(res)
            return res;
        } catch (error) {
            console.error(`error: ${error}`)
        }
    }
}


export const userService = Object.freeze(new UserService())

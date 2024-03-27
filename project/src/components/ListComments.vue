<template>
    <div>
      <ul v-if="existe" class="divide-y divide-gray-200">
        <li v-for="comment in comments" :key="comment.id" class="py-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900">{{ comment.message }}</h3>
            <h3 class="text-sm text-gray-500">{{ comment.file }}</h3>
            <button @click="deleteComment(comment.id)"><img src="./../assets/btnEliminar.png" alt=""></button>
          </div>
        </li>
      </ul>
      <p v-else class="text-gray-500">Cargando comentarios...</p>

         <div class="bg-slate-100 rounded-lg shadow-lg p-4 w-full flex mt-10 flex-wrap">
            <textarea
                v-model="newComment"
                class="w-2/4 resize-none border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Agregar comentario"
            ></textarea>
            <input
                type="file"
                class="mt-2 block"
                @change="handleFile"
            />
            <button @click="createComment" class="m-2 p-2 bg-green-400 rounded-md duration-300 hover:bg-green-600">Agregar</button>
        </div>
    </div>
  </template>
  
<script>
    import { commentService } from './../services/commentService.js';
  
    export default {
        data() {
        return {
            comments: [],
            existe: false,
            uploadedFileName: null,
            newComment: null
        };
        },
        props: {
        id: Number
        },
        methods: {
        async getComments() {
            try {
            const response = await commentService.getAllByTask(this.id);
            this.comments = response.comments || [];
            this.existe = true;
            } catch (error) {
            console.error(error);
            }
            },
            async deleteComment(id){
                const res = await commentService.delete(id);
                await this.getComments();
            },
            async createComment(){
                await commentService.create({file: this.uploadedFileName, message: this.newComment, task_id: this.id})
                await this.getComments();
            },
            handleFile(event) {
                const file = event.target.files[0];
                console.log('Archivo seleccionado:', file.name);
                this.uploadedFileName = file.name;
            }
        },
        mounted() {
        this.getComments();
    }
}

</script>
  
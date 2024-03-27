
<template>
  <div class="bg-white rounded-lg shadow p-4 w-60 m-5">
    <!-- Mensaje de la tarea -->
    <div class="flex items-center">
      <!-- <p class="text-gray-700 mb-2">{{ taskMessage }}</p> -->
      <!-- <input class="mb-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 w-full" type="text" v-model="message" required> -->
      <textarea class="mb-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 w-full resize-none" v-model="message" required></textarea>
      <button class="p-2" @click="changeDescription"><img src="./../assets/btnEdit.png" alt=""></button>
    </div>

    <!-- Menú desplegable para el estado de la tarea -->
    <div class="mb-2">
      <label for="taskStatus" class="block text-sm font-medium text-gray-700">Estado de la tarea:</label>
      <select @change="handleChangeStatus" id="taskStatus" v-model="taskStatus" class="mt-1 block w-full px-2 py-1 border border-gray-300 
              bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
              sm:text-sm">
        <option value="" hidden>{{ status }}</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En proceso">En proceso</option>
        <option value="Bloqueado">Bloqueado</option>
        <option value="Completado">Completado</option>
      </select>
    </div>

    <div class="flex justify-center items-center">
      <button @click="deleteTask" class="w-8 h-8 bg-red-400 rounded-md duration-300 hover:bg-red-600">
        X
      </button>
      <button class="p-2 text-3xl" @click="edit">...</button>
    </div>



    <!-- TaskDetail modal -->
    <TaskDetail :id="id" :taskTitle="taskMessage" :taskStatus="status" :popUp="popUp" @close="popUp = false"/>
  </div>
</template>
  
<script>
import TaskDetail from './../components/TaskDetail.vue';
import { taskService } from './../services/taskService.js';

export default {
  data() {
    return {
      message: '',
      taskComment: '',
      taskStatus: '',
      inputActive: false,
      popUp: false,
    };
  },
  props: {
    taskMessage: String,
    status: String,
    id: Number
  },
  methods: {
    saveTask() {
      // Aquí puedes implementar la lógica para guardar la tarea
      console.log('Comentario:', this.taskComment);
      console.log(this.taskStatus);

      // Puedes enviar los datos a un backend para guardar la tarea
    },
    edit() {
      this.popUp = true;
    },
    deleteTask() {
      this.$emit('taskDeleted', this.id); // Emitir el evento taskDeleted con el ID de la tarea
    },
    async changeDescription(){
      this.$emit('taskDescriptionChange', this.message, this.id);
    },
    handleChangeStatus() {
      this.$emit('taskStatusChange', this.taskStatus, this.id);
    }
  },
  mounted() {
    this.message = this.taskMessage;
  },
  components: { TaskDetail },
};
</script>

<style>
.disabled {
  pointer-events: none;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  color: #999;
}
</style>

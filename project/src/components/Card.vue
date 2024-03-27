
<template>
  <div class="bg-white rounded-lg shadow p-4 w-60 m-5">
    <!-- Mensaje de la tarea -->
    <div class="flex items-center">
      <p class="text-gray-700 mb-2">{{ taskMessage }}</p>
      <button class="p-2" @click="edit"><img src="./../assets/btnEdit.png" alt=""></button>
      <button @click="deleteTask" class="w-8 h-8 bg-red-400 rounded-md duration-300 hover:bg-red-600">
        X
      </button>
    </div>

    <!-- Menú desplegable para el estado de la tarea -->
    <div class="mb-2">
      <label for="taskStatus" class="block text-sm font-medium text-gray-700">Estado de la tarea:</label>
      <select id="taskStatus" v-model="taskStatus" class="mt-1 block w-full px-2 py-1 border border-gray-300 
              bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
              sm:text-sm">
        <option value="" hidden>{{ status }}</option>
        <option value="pendiente">Pendiente</option>
        <option value="en-proceso">Proceso</option>
        <option value="bloqueado">Bloqueado</option>
        <option value="completado">Completado</option>
      </select>
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

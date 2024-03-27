<template>
    <div class="flex justify-center flex-wrap space-x-4 p-10">
      <h2 v-if="cargando">Cargando...</h2>
      <div v-for="task in tasks" :key="task.id">
        <Card
          :taskMessage="task.description"
          :status="task.status"
          :id="task.id"
          @taskDeleted="handleTaskDeleted" 
          @taskDescriptionChange= "handleChangeDescription" 
          @taskStatusChange="handleChangeStatus"
        />
      </div>
    </div>
</template>


<script>
import Card from './../components/Card.vue';
import { taskService } from './../services/taskService.js';

export default {
    data(){
        return{
            tasks: [],
            cargando: true,
        }
    },
    components:{
        Card
    },
    methods:{
        async getMyTasks(){
            const res = await taskService.getAllByUser();
            this.tasks = res.tasks;
            this.cargando = false;
        },   
        async handleTaskDeleted(id) {
            await taskService.delete(id);
            await this.getMyTasks(); 
        },
        async handleChangeDescription(message, id){
            await taskService.updateDescription({description: message}, id);
            await this.getMyTasks(); 
        },
        async handleChangeStatus(status, id){
            await taskService.updateStatus({status: status}, id);
            await this.getMyTasks();
        }
    },
    mounted(){
        this.getMyTasks();
    }
}

</script>
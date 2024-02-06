<template>
    <div>
        <h4>Create Task</h4>
        <form @submit.prevent="addTask">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="title"  class="form-label">Task Title</label>
                        <input type="text" class="form-control" id="title" v-model="newTask.title" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="description"  class="form-label">Description</label>
                        <textarea class="form-control" id="description" row="3" v-model="newTask.description"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="start-date"  class="form-label">Start Date</label>
                        <input type="datetime-local" class="form-control" id="start-date" v-model="newTask.start_date">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="end-date"  class="form-label">End Date</label>
                        <input type="datetime-local" class="form-control" id="end-date" v-model="newTask.end_date">
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" type="submit">Save Task</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                start_date: '',
                end_date: ''
            },
        };
    },
    mounted(){
        this.emitter.on('edit-task', (task) => {
            this.newTask = {...task};
        });
    },
    methods: {
        addTask() {
            let request;
            if(this.newTask.id){
                request = axios.put(`/api/tasks/${this.newTask.id}`, this.newTask);
            }else{
                request = axios.post('/api/tasks', this.newTask);
            }
            request.then((response) => {
                console.log(response.status);
                this.emitter.emit('task-updated', this.newTask);
            });
        }
    },
    beforeUnmount() {
        this.emitter.off('edit-task');
    }
};
</script>
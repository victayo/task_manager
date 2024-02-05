<template>
    <div class="mt-5">
        <h2 class="text-center">Task List</h2>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td>{{ task.title }}</td>
                        <td>{{ task.description }}</td>
                        <td>{{ task.start_date }}</td>
                        <td>{{ task.end_date }}</td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-primary">Edit</button>
                                <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data(){
        return {
            tasks: []
        }
    },
    mounted(){
        this.fetchTasks();
    },
    methods: {
        fetchTasks() {
            axios.get(`/api/tasks`).then(response => {
                let tasks = response.data;
                // transform the tasks list
                this.tasks = tasks.map(task => {
                    if(task.start_date){ //format the date time using moment
                        task.start_date = moment().format('YYYY-MM-DD hh:mm a');
                    }
                    if(task.end_date){
                        task.end_date = moment().format('YYYY-MM-DD hh:mm a');
                    }
                    return task;
                })
            })
        },

        deleteTask(task){
            if(window.confirm('Are you sure?')){
            //    axios.delete('') 
            console.log(task);
            }
        }
    }
};
</script>
<template>
    <div>
        <h4 v-if="task">Update Task</h4>
        <h4 v-else>Create Task</h4>
        <div class="alert alert-success alert-dismissible fade show small" role="alert" v-if="showSuccess">
            <strong>Task operation successful.</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="hideAlert('success')"></button>
        </div>
        <div class="alert alert-danger alert-dismissible fade show small" role="alert" v-if="showError">
            <strong>Task operation failed. Please try again</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="hideAlert('error')"></button>
        </div>
        <Loading v-if="fetching"></Loading>
        <form class="small" @submit.prevent="addTask" v-else>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="title" class="form-label">Task Title</label>
                        <input type="text" class="form-control" id="title" v-model="newTask.title" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" row="3" v-model="newTask.description"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="start-date" class="form-label">Start Date</label>
                        <input type="datetime-local" class="form-control" id="start-date" v-model="newTask.start_date">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="end-date" class="form-label">End Date</label>
                        <input type="datetime-local" class="form-control" id="end-date" v-model="newTask.end_date">
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <button class="btn btn-primary btn-sm mx-1" type="submit" :disabled="saving">
                    Save Task
                </button>
                <router-link class="btn btn-danger btn-sm" to="/">
                    Cancel
                </router-link>

            </div>
        </form>
    </div>
</template>
  
<script>
import axios from '@/axios';
import moment from 'moment';
import Loading from '@/components/Loading'


export default {
    props: ['task'],
    components: {
        Loading,
    },
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                start_date: '',
                end_date: ''
            },
            fetching: false,
            showSuccess: false,
            showError: false,
            saving: false
        };
    },
    mounted() {
        if (this.task) {
            this.fetchTask();
        }
    },
    methods: {
        fetchTask() {
            this.fetching = true;
            axios.get(`/api/tasks/${this.task}`).then(response => {
                let task = response.data;
                if (task.start_date) { //format the date time using moment
                    task.start_date = moment(task.start_date).format('yyyy-MM-DDThh:mm');
                }
                if (task.end_date) {
                    task.end_date = moment(task.end_date).format('yyyy-MM-DDThh:mm');
                }
                this.newTask = { ...task };
            }).finally(() => this.fetching = false);
        },
        addTask() {
            let request;
            this.saving = true;
            this.showError = false;
            this.showSuccess = false;
            if (this.newTask.id) {
                request = axios.put(`/api/tasks/${this.newTask.id}`, this.newTask);
            } else {
                request = axios.post('/api/tasks', this.newTask);
            }
            request.then((response) => {
                if(response.status == 200 || response.status == 201){
                    this.showSuccess = true;
                }else{
                    this.showError = true;
                }
            }).finally(() => this.saving = false);
        },
        hideAlert(type){
            switch(type){
                case 'success':
                    this.showSuccess = false;
                    break;
                case 'error':
                    this.showError = false;
                    break;
            }
        }
    }
};
</script>
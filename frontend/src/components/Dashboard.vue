<template>
    <div class="row">
        <task-form @addTask="handleAddTask" />
        <task-list />
    </div>
</template>
  
<script>
import TaskList from './Task/TaskList.vue';
import TaskForm from './Task/TaskForm.vue';

export default {
    data() {
        return {
            tasks: []
        };
    },
    methods: {
        handleAddTask(newTask) {
            this.tasks.push({
                id: this.tasks.length + 1,
                title: newTask.title,
                status: 'Pending'
            });
        }
    },
    components: {
        TaskList,
        TaskForm
    }
};
</script>
  
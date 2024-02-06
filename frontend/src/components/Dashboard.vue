<template>
    <div class="row">
        <task-list />
    </div>
</template>
  
<script>
import TaskList from './Task/TaskList.vue';

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
    }
};
</script>
  
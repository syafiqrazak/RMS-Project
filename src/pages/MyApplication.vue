<template>
    <div>
        {{leaves}}<br>
        {{error}}<br>
        {{page}}
    </div>
</template>

<script>
import leave from "@/js/leave.js"; //directory to leave.js

export default {
    data(){
        return {
            page: 1,
            leaves: '',
            error: '',
        }
    },
    async created() {
        try {
            const data = await leave.show_own_leave(this.page);
            this.leaves = data.map(leave => ({
                ...leave
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
}
</script>
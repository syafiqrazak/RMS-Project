<template>
    <div>
        <h5>testing</h5>
        {{pos}}
    </div>
</template>

<script>
import leave from "@/js/psr.js"; //directory to psr.js


export default {
     name: "notify-PSR",
    data(){
        return{
            psrs:[],  //for psr in psrs {{psr.[var name]}}
            page: 1,
            error: ''
        };
    },
    async created() {
        try {
            const data = await psr.report(this.psr_id);
            this.psrs = data.map(psrs => ({
                ...psrs,
                createdAt: new Date(psrs.createdAt)
            })) 
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
                const data = await psr.report(this.page);
                this.psrs = data.map(psrs => ({
                    ...psrs,
                    createdAt: new Date(psrs.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async get_submits() {
            try {
                const data = await psr.report(this.page);
                this.psrs = data.map(psrs => ({
                    ...psrs,
                    createdAt: new Date(psrs.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await psr.report(this.psr_id);
                this.psrs = data.map(psrs => ({
                    ...psrs,
                    createdAt: new Date(psrs.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>
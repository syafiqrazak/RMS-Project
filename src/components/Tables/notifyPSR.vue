<template>
    <div>
        <h5>testing123</h5>
        {{psrs}}
    </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js


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
            const data = await psr.show_all_psr();
                this.psrs = data.map(psrs => ({
                ...psrs
                }))
        } catch (err) {
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
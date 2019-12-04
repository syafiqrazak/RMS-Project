<template>
  <div >
      <h5>
          {{psrs}}
          {{error}}
      </h5>
  </div>

</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
export default {
    name: "my-PSR",
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: '',
            isLoading: false,
            id: localStorage.id,
            page: 1,
            psrs:[],
            total_page:'',
        };
    },
    async created() {
            try {
                const data = await psr.show_own_psr_page(this.page);
                const limit = 8;
                
                const psrs1 = data.result[0]
                this.total_page = data.result[1]
                this.psrs = psrs1.map(psrs => ({
                    ...psrs
                }))
            } catch(err) {
                this.error = err.message;
                alert(err);
            }
    },
        methods: {
            
        }
    
    
}
</script>

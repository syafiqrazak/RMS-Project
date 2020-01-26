<template>
  <div >
      <h5>
          <!-- {{psrs}}
          {{error}} -->
      </h5>
      <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true" > 
        <template slot-scope="props">
            <b-table-column field="id" label="PSR Number" width="500" >
                <a @click="detail(props.row)">
                    PSR/TRD-{{ props.row.psr_no |numeral('000000') }}
                </a>
            </b-table-column>
            <b-table-column v-if="props.row.status_decline == false && props.row.status_t2 == false" field="id" label="Status" width="300" >
                <p>
                    Pending
                </p>
            </b-table-column>
            <b-table-column v-else-if="props.row.status_decline == true " field="id" label="Status" width="300" >
                <p>
                    Decline
                </p>
            </b-table-column>
            <b-table-column v-else field="id" label="Status" width="300" >
                <p>
                    Approved
                </p>
            </b-table-column>
        </template>
   </b-table>
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
            detail(value){
            console.log(value.psr_no);
            this.$router.push({ path: `/displayPSR/${this.id}/${value.psr_no}/status` });
        },
            
        }
    
    
}
</script>

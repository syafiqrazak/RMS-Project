<template>
  <div >
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <h5>
          {{pos}}
          {{error}}
      </h5>
  </div>

</template>

<script>
import purchaseOrder from "@/js/po.js"; //directory to po.js
export default {
    name: "my-PO",
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: '',
            isLoading: false,
            id: localStorage.id,
            page: 1,
            pos:[],
            error: '',
            total_page:'',
        };
    },
    async created() {
        try {
            this.isLoading = true;
            const data = await purchaseOrder.show_own_po_page(this.page);
                const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))
            this.isLoading = false;
        } catch (err) {
            this.error = err.message;
            alert(err);
            this.isLoading = false;
        }
    },
        methods: {
            
        }
    
    
}
</script>

<template>
  <div class="container" border="3px" height="5000px">  
      {{psrs}}
      {{error}}
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js

export default {
    name: "display-PSR",
    data(){
        return{
            psrs:[],
            id: this.$route.params.id,
            psr_no: this.$route.params.psr_no,
            error: '',

        };
    },
    async created() {
            try {
                const data = await psr.find(this.psr_no);
                this.psrs = data;
            } catch (err) {
                this.error = err.message;
            }
    },
    methods: {
        detail(value){
            console.log(value.po_no);
            this.$router.push({ path: `/displayPO/${this.id}/${value.po_no}` });
        },
        async get_pending() {
            try {
            const data = await po.get_submits(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))
                return this.pos

            } catch(err) {
                this.error = err.message;
                return this.error
            }
            
        },
        async get_submits() {
            try {
            const data = await po.get_pending(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))

            } catch(err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await po.find(this.po_no);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        //create in vue:
        // if page == 1, hide previous button, show next button
        // if page == total_page, show previous button, show next button
        async nextPage() {
           this.isPrevious = false;
            if(this.page >= this.total_page-1) {
                this.page = this.total_page;
            }
            else
                this.page += 1;
            if(this.page==this.total_page)
                this.isNext = true
            try {
                const data = await po.show_po_page(this.page);
                
                const pos1 = data.result[0]
                    this.total_page = data.result[1]
                    this.pos = pos1.map(pos => ({
                        ...pos
                    }))

                } catch(err) {
                    this.error = err.message;
                }
        },
        async previousPage() {
            this.isNext = false;
            if(this.page <= 1) {
                this.page = 1;
                this.isPrevious = true
            }
            else
                this.page -= 1;
            if(this.page==1)
                this.isPrevious = true
            try {
                const data = await po.show_po_page(this.page);
                
                const pos1 = data.result[0]
                    this.total_page = data.result[1]
                    this.pos = pos1.map(pos => ({
                        ...pos
                    }))

                } catch(err) {
                    this.error = err.message;
                }
        },
        async pagination() {
            if(this.page>=this.total_page){
                this.page = this.total_page;
                this.isNext =false;
            }
                
            else if(this.page<1){
                this.page = 1;
                this.isPrevious =false;
            }
                
            else    
                this.page=this.page;
            try {
                const data = await po.show_po_page(this.page);
                
                const pos1 = data.result[0]
                    this.total_page = data.result[1]
                    this.pos = pos1.map(pos => ({
                        ...pos
                    }))

                } catch(err) {
                    this.error = err.message;
                }
        }
    }
    
}
</script>

<style scoped>
.md-card {
  display: inline-block;
  position: relative;
  /* width: 390%; */
  width: 1000px;
  margin: 25px 0;
  overflow: unset;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
}
.md-textarea {
  border: 1px solid #ccc !important;
  border-radius: 16px;
}
tr {
  border: 1px;
}
</style>

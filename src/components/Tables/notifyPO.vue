<template>
    <div>
        <b-table :data="isEmpty ? [] : pos" :striped="true" :hoverable="true" > 
            <template slot-scope="props">
                <b-table-column field="po_no" label="PO Number">
                        PO/TRD-{{ props.row.po_no |numeral('0000') }}
                </b-table-column>
                <b-table-column field="po_date" label="Date Created">
                        {{ props.row.po_date  | moment("dddd, MMMM Do YYYY")}}
                </b-table-column>
                <b-table-column field="id" label="ID" width="300" >
                    <a @click="detail(props.row)">
                        {{ props.row.id }}
                    </a>
                </b-table-column>
            </template>
        </b-table>
        <br><br>
         <div style=" width:15%; float:right; ">
             <form v-on:submit="pagination" >
                <md-input style="width:30px; float: left; height:28px;text-align: right; " type="number"  v-model="page" :disabled="false" />
            </form> &nbsp;<b>/{{total_page}}</b>
              &nbsp;&nbsp;
             <b-tooltip label="Previous" type="is-light" position="is-bottom">
                    <b-button @click="previousPage"
                        :disabled="isPrevious"
                        size="is-small"
                        float="right"
                        type="is-light">
                        <md-icon>navigate_before</md-icon>
                    </b-button>
            </b-tooltip>
            <!-- &nbsp; -->
            <b-tooltip label="Next" type="is-light" position="is-bottom">
                    <b-button @click="nextPage"
                        :disabled="isNext"
                        size="is-small"
                        float="right"
                        type="is-light">
                        <md-icon>navigate_next</md-icon>
                    </b-button>
                    &nbsp;&nbsp;
            </b-tooltip>
                
            </div>
        <!-- Error: {{error}} -->
        {{pos}}
    </div>
</template>




<script>
import po from "@/js/po.js"; //directory to po.js

export default {
    name: "notify-PO",
    data(){
        return{
            pos:[],  //for po in pos {{po.[var name]}}
            page:1,
            error: '',
            total_page:'',
            isNext:false,
            isPrevious:true,
            id: this.$route.params.id
        };
    },
    async created() {
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
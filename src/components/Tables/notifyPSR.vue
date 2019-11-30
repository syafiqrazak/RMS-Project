<template>
    <div>
        <!-- <div>{{ new Date() | dateFormat('YYYY.MM.DD') }}</div> -->
        <!-- <div>Date: {{psrs.psr_date[0]}}</div> -->
        {{psrs.psr_date}}
        <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true" > 
            <template slot-scope="props">
                <b-table-column field="po_no" label="PO Number" sortable>
                    <a @click="detail(props.row)">
                        PSR/TRD-{{ props.row.psr_no |numeral('000000') }}
                    </a>
                </b-table-column>
                <b-table-column field="po_date" label="Date Created">
                    {{ props.row.psr_date | moment("dddd, MMMM Do YYYY") }}
                </b-table-column>
                <b-table-column>
                    {{ props.row.status }}
                </b-table-column>
                 <b-table-column field="id" label="ID" width="300" >
                    {{ props.row.id }}
                </b-table-column>
            </template>
        </b-table>
        <br><br>
         <div style=" width:15%; float:right; display:block-inline; ">
             <form v-on:submit="pagination" >
                <md-input style="width:30px; float: left; height:28px; text-align: right; " type="number"  v-model="page" :disabled="false" />
            </form>&nbsp; <b>/{{total_page}}</b>
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
        <!-- {{psrs}}
        {{page}} -->
        {{error}}
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
            error: '',
            total_page:'',
            isNext:false,
            isPrevious:true,
            id: this.$route.params.id,
            t1: null,
            t2: null,
            t22: null,
            t3: null,
            is_admin: null,

        };
    },
     async created() {
        if (localStorage.t1) 
            this.t1 = localStorage.t1;
        if (localStorage.t2)
            this.t2 = localStorage.t2;
        if (localStorage.t22)
            this.t22 = localStorage.t22;
        if (localStorage.t3)
            this.t3 = localStorage.t3;
        if (localStorage.is_admin)
            this.is_admin = localStorage.is_admin;
        

        try {
            if(this.is_admin == "true"){
                const data = await psr.show_psr_page(this.page);
        
                const psrs1 = data.result[0]
                    this.total_page = data.result[1]
                    this.psrs = psrs1.map(psrs => ({
                        ...psrs
                    }))

            }
            else if(this.t2 == "true" || this.t22== "true"){
                try {
                    const data = await psr.get_submits(this.page);
                    const limit = 8;
                    
                    const psrs1 = data.result[0]
                    this.total_page = data.result[1]
                    this.psrs = psrs1.map(psrs => ({
                        ...psrs
                    }))
                } catch(err) {
                    this.error = err.message;
                }
            }
            else if(this.t3 == "true"){
                try {
                const data = await psr.get_pending(this.page);
                const limit = 8;
                
                const psrs1 = data.result[0]
                this.total_page = data.result[1]
                this.psrs = psrs1.map(psrs => ({
                    ...psrs
                }))
                
                } catch(err) {
                    this.error = err.message;
                }
            }
            else{
                alert("Invalid user! Please contact your system admin.")
            }
            
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        detail(value){
            console.log(value.psr_no);
            this.$router.push({ path: `/displayPSR/${this.id}/${value.psr_no}` });
        },
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
        },
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
                // alert(this.page);
                const data = await psr.show_psr_page(this.page);
                
                const psrs1 = data.result[0]
                    this.total_page = data.result[1]
                    this.psrs = psrs1.map(psrs => ({
                        ...psrs
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
                const data = await psr.show_psr_page(this.page);
                
                const psrs1 = data.result[0]
                    this.total_page = data.result[1]
                    this.psrs = psrs1.map(psrs => ({
                        ...psrs
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
                const data = await psr.show_psr_page(this.page);
                
                const psrs1 = data.result[0]
                    this.total_page = data.result[1]
                    this.psrs = psrs1.map(psrs => ({
                        ...psrs
                    }))

                } catch(err) {
                    this.error = err.message;
                }
        }
    }
    
}
</script>
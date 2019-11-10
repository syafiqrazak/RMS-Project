<template>
      
      <div class="container" border="3px" >  
<!-- C
      {{error}} -->
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">PURCHASE SERVICE AND REQUISITION DETAILS</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
            <br>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> PURCHASE CLASSIFICATION:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.purchase_class}}</h5>
                </div>
            </div>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> PURCHASE TYPE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.purchase_typ}}</h5>
                </div>
            </div>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong>JUSTIFICATION OF PURCHASE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.purchase_just}}</h5>
                </div>
            </div>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> REQUIRED DATE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.date_req}}</h5>
                </div>
            </div>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> DELIVERY:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.delv}}</h5>
                </div>
            </div>
            <div class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> COST TYPE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.delv}}</h5>
                </div>
            </div>
            <div v-show="psrs.project_title" class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> PROJECT TITLE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.project_title}}</h5>
                </div>
            </div>
            <div v-show="psrs.vessel_code" class="alert alert-info" style="background-color:white;width:100%; display: inline-block; height:80px">
                <div  style="width:40%; display: inline-block;">
                    <h5><strong> VESSEL CODE:</strong></h5>
                </div>
                <div style="width:49%; display: inline-block; color:black; ">
                    <h5> {{psrs.vessel_code}}</h5>
                </div>
            </div>
            <div  class="alert alert-info" style="background-color:#bdfffc;width:100%; display: inline-block;">
                <b-table :data="isEmpty ? [] : psrs.psr_desc" :striped="true" :hoverable="true" > 
                    <template slot-scope="props">
                    <b-table-column field="index" label="No" width="5%" centered>
                                {{ props.row.index}}
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="25%" centered>
                                {{ props.row.description }}
                        </b-table-column>
                        <b-table-column field="unitPrice" label="Price" centered>
                            RM   {{ props.row.unitPrice  |numeral('0.00') }}
                        </b-table-column>
                        <b-table-column field="quantity" label="Quantity"  centered >
                                {{ props.row.quantity }}
                        </b-table-column>
                        <b-table-column field="total" label="Total Price"  align="right" width="10px" margin-left="0px">
                            <div style="float:left;">RM</div><div style="float=right;"> {{ props.row.quantity *  props.row.unitPrice |numeral('0.00')}}</div>
                        </b-table-column>
                    </template>
                </b-table>
                <div style="float:right;">
                    <p>-------------------------</p>
                </div>
            </div>
            <div  style=" margin-left: 40%; margin-right: 40%;">
                <b-button style="float:left;" type="is-success" @click.prevent="approve()">Approve</b-button>
                <b-button style="float:right;" type="is-danger">Decline</b-button>
            </div>
            <br><br><br>
        </md-card-content>
        </md-card>
                {{error}}
        <!-- <div>{{psrs}}</div> -->
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
            status_t1:'',
            status_t1: '',
            totalPrice:0,
            i: 0,

        };
    },
    async created() {
            try {
                const data = await psr.find(this.psr_no);
                this.psrs = data;
                // alert(data.psr_desc[0].quantity);
                for(this.i=0; this.i<data.psr_desc.length; this.i++){
                    this.totalPrice = this.totalPrice + (data.psr_desc[this.i].quantity * data.psr_desc[this.i].unitPrice)
                }
                // alert("Total Price: "+this.totalPrice);
                console.log(this.totalPrice);
            } catch (err) {
                this.error = err.message;
            }
    },
    methods: {
        detail(value){
            console.log(value.po_no);
            this.$router.push({ path: `/displayPO/${this.id}/${value.po_no}` });
        },
        async approve(){
          if(localStorage.t2 == "true" || this.t22== "true"){
            try {
                const psra = await psr.psr_stat_1(this.psrs.id);
                this.status_t1 = psra.status_t1;
                console.log(psr); //can be ignored
                alert("Tier 2 manager");
            } catch (err) {
                this.error = err.message;
            }
          }
          else if(localStorage.t3 == "true"){
            try {
                const psra = await psr.psr_stat_2(this.psrs.id);
                this.status_t2 = psra.status_t1;
                console.log(psr); //can be ignored
                alert("Tier 3 manager");
            } catch (err) {
                this.error = err.message;
            }
          }
          else{
            alert("Invalid user! Only manager tier 1 & 2 can approve record. Please contact system admin for assistance.")
          }
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

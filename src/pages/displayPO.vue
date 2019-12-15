<template>
  <div class="container" border="3px" height="5000px">  
    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Purchase Order Details</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          {{pos}}
          <div v-if="action == 'status'" style="width:80%; margin-left:10%;">
            <div v-if="pos.status_decline == false && pos.status_t2 == false" class="alert alert-warning" style="border-radius:30px;" >
              <h4><center><strong> Status: Pending </strong></center></h4>
            </div>
            <div v-else-if="pos.status_decline == true " class="alert alert-danger" style="border-radius:30px;">
              <h4><center><strong> Status: Declined </strong></center></h4>
            </div>
            <div v-else class="alert alert-success" style="border-radius:30px;">
              <h4><center><strong> Status: Approved </strong></center></h4>
            </div>
          </div>
          <div class="alert alert-info" style="background-color:white; color:black;">

          <table style="width:100%">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td style="width:50%">
                <b>{{ company }}</b>
              </td>
              <td>
                <p><b>Purchase Order Number:</b></p>
              </td>
              <td>
                <p>PO/TRD-{{ pos.po_no |numeral('0000') }}</p>
              </td>
            </tr>
            <td rowspan="8"><b>Address:</b> {{ pos.address }}</td>
            <tr>
              <td>
                <p><b>Date</b></p>
              </td>
              <td>
                <p>{{ pos.createdAt | moment("Do MMMM YYYY") }}</p>
              </td>
            </tr>
            <!-- <tr>
              <td>
                <p><b>Page:</b></p>
              </td>
              <td>
                <p>{{ Page_no }}</p>
              </td>
            </tr> -->
            <tr>
              <td>
                <p><b>Our Ref:</b></p>
              </td>
              <td>
                <p>{{ pos.po_ref }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Your Quotation:</b></p>
              </td>
              <td>
                <p>{{ pos.quot }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Delivery Due Date:</b></p>
              </td>
              <td>
                <p>{{ pos.delv_due | moment("Do MMMM YYYY") }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Mode of Shipment:</b></p>
              </td>
              <td>
                <p>{{ pos.ship_mode }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>PSR No.:</b></p>
              </td>
              <td>
                <p>{{ pos.psr_no }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>CCA No.:</b></p>
              </td>
              <td>
                <p>{{ pos.cca_no }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>To: </b> {{ to }}</p>
              </td>
              <td>
                <p><b>Mode of Payment:</b></p>
              </td>
              <td>
                <p>{{ pos.pay_mode }}</p>
              </td>
            </tr>
          </table>
        </div>
          <!-- <div>
            <md-table
              style="width:100%"
              v-model="pos.po_desc"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              md-card
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Description">{{
                  item.description
                }}</md-table-cell>
                <md-table-cell md-label="Quantity">{{
                  item.quantity
                }}</md-table-cell>
                <md-table-cell md-label="Price">{{ item.unitPrice }}</md-table-cell>
                <md-table-cell md-label="Total Price"
                  ><b>RM {{ item.quantity * item.unitPrice }}</b></md-table-cell
                >
              </md-table-row>
            </md-table>
          </div> -->
            <div v-if="pos.po_desc" class="alert alert-info" style="background-color:white;">

            <b-table :data="isEmpty ? [] : pos.po_desc" :striped="true" :hoverable="true" > 
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
          </div><br><br>
         <div v-if="action == 'approval'" style=" margin-left: 40%; margin-right: 40%;">
            <b-button type="is-success" @click.prevent="approve()">Approve</b-button>
            <b-button type="is-danger" @click.prevent="decline_po()">Decline</b-button>
            <!-- {{error}} -->
          </div>
          <!-- {{pos}} -->
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import po from "@/js/po.js"; //directory to po.js

export default {
    name: "display-PO",
    data(){
        return{
            pos:[],  //for po in pos {{po.[var name]}}
            page:1,
            error: '',
            total_page:'',
            isNext:false,
            isPrevious:true,
            id: this.$route.params.id,
            action: this.$route.params.action,
            po_no: this.$route.params.po_no,
            po_id:'',
            status_t1:'',
            status_t1: '',
        };
    },
    async created() {
        try {
                const data = await po.find(this.po_no); 
                this.pos = data;
                this.po_id = this.pos.id;
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
          if(localStorage.t2 == "true" || localStorage.t3 == "true"){
            try {
                const pos = await po.po_stat_1(this.po_id);
                this.status_t1 = pos.status_t1;
                console.log(po); //can be ignored
                alert("Tier 2 manager");
            } catch (err) {
                this.error = err.message;
            }
          }
          else if(localStorage.t4 == "true"){
            try {
                const pos = await po.po_stat_2(this.po_id);
                this.status_t2 = pos.status_t1;
                console.log(pos); //can be ignored
                alert("Tier 3 manager");
            } catch (err) {
                this.error = err.message;
            }
          }
          else{
            alert("Invalid user! Only manager tier 1 & 2 can approve record. Please contact system admin for assistance.")
          }
        },
        async decline_po() {
            try {
                const data = await po.po_decline(this.po_id);
                console.log(data); //can be ignored
            } catch (err) {
                this.error = err.message;
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
strong{
  color: white;
}
.alert{
  padding:2px 15px;
  color: #fff;
}
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

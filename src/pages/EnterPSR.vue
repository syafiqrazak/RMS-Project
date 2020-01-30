<template>
    <div v-if="match">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase Order Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>
          <md-card-content>
            <div >
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                    <div class="block" style="border:1px">
                        <h3><strong>PSR INPUT METHOD: </strong></h3>
        <!-- {{psrs}} -->
        {{error}}
                        <md-radio v-model="inputMethod" value="1" class="md-primary">Enter PSR</md-radio>
                        <md-radio v-model="inputMethod" value="2" class="md-primary">SEARH PSR</md-radio>

                    </div>
                  </section>
                <div v-if="inputMethod =='1'">
                    <md-card-content>
                    <table  cls="clsForm" width="90%:">
                        <col width="8%">
                        <col width="10%">
                        <col width="70%">
                        <tr>
                        <td class="clsLabel">
                            <h4>PSR NO: </h4>
                        </td>
                        <td class="clsLabel">
                            <h4>PSR/TRD  </h4>
                        </td>
                        <td class="clsValue" style="padding:0.6rem;">
                            <b-input v-model="PSRNo" style="width:38%"></b-input>
                        </td>
                        </tr>
                    </table>
                    
                    <md-button
                        class="md-raised md-success"
                        @click.once="matchPSR()"
                        style="float:right"
                        >GO</md-button ><br><br>
                    </md-card-content>
                </div>
            <div v-else-if="inputMethod == '2'">
                {{psrs}}
               <md-card-content>
                  <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true" :paginated="true" :per-page="10" aria-next-label="Next page"
                        aria-previous-label="Previous page"
                        aria-page-label="Page"
                        aria-current-label="Current page"
                        :pagination-simple="true"> 
                    <template slot-scope="props">
                        <b-table-column field="po_no" label="PO Number" sortable>
                            <a @click="passPSR(props.row)">
                                PO/TRD-{{ props.row.psr_no |numeral('000000') }}
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
                </md-card-content>
            </div>
            </div>
            </div>
          </md-card-content>
        </md-card>
    </div>
    <!-- <div v-else>
        <h3>Not match</h3>
    </div> -->
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to psr_class.js
export default {
    data(){
        return {
            match: true,
            inputMethod: '0',
            PSRNo: '',
            PSR_id:'',
            psrs: [],
            error:'',
            i: 0,
            isLoading: false,
            psrObj: new psrClass(),
        }
    },
    async created() {
        try {
            this.isLoading = true;
            this.psrObj.in_page = 1;
            const data = await psr.get_approved(this.psrObj);
            console.log(data.result);
            this.psrs = data.result[0];
            // this.psrs = data.map(psr => ({
            //     ...psr
            // }))
            this.isLoading = false;
        } catch (err) {
            console.log(err);
            this.error = err.message;
            this.isLoading = false;
            // alert(err);
        }
    },
    methods: {
        passPSR(value){
            console.log(value.id);
            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${value.id}` });
        },
        matchPSR(){
            if(this.psrs != null){
                // alert(this.psrs.length);
                this.PSRNo = parseInt(this.PSRNo);
                alert(this.PSRNo);
                for(var i=0; i<this.psrs.length; i++){
                    alert("Enter Matching 123: "+i+" Compare with: "+ this.PSRNo);
                    if(this.psrs[i].psr_no == this.PSRNo){
                        // alert("Match");
                        try{
                            this.match = true;
                            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${this.PSRNo}` });
                            break;
                        }
                        catch(error){
                            alert("failed");
                        }
                    }
                }
                if(!this.match){
                    alert("PSR not found!!!");
                }
            }
            else{
                alert("No Approved PSR yet");
            }
        // alert("Not Found");
    }
}
}
</script>

<style scoped src="@/assets/style/style.css">

</style>
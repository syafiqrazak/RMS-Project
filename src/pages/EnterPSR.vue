<template>
    <div v-if="match">
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
                        <p><strong>PSR INPUT METHOD: </strong></p>
        {{psrs}}
                        <md-radio v-model="inputMethod" value="1" class="md-primary">Enter PSR</md-radio>
                        <md-radio v-model="inputMethod" value="2" class="md-primary">SEARH PSR</md-radio>

                    </div>
                  </section>
                <div v-if="inputMethod =='1'">
                    <md-card-content>
                    <table  cls="clsForm" width="80%:">
                        <col width="10%">
                        <col width="70%">
                        <tr>
                        <td class="clsLabel">
                            <h4>PSR NO: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="PSRNo" style="width:98%"></b-input>
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
               <md-card-content>
                  <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true" > 
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
    <div v-else>
        <h3>Not match</h3>
    </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
export default {
    data(){
        return {
            match: true,
            inputMethod: '0',
            PSRNo: '',
            psrs: [],
            error:'',
            i: 0,
        }
    },
    async created() {
        try {
            const data = await psr.show_all_psr();
            this.psrs = data.map(psr => ({
                ...psr
            }))
            console.log(psrs); 
        } catch (err) {
            console.log(error);
            this.error = err.message;
            // alert(err);
        }
    },
    methods: {
        passPSR(value){
            console.log(value.psr_no);
            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${value.psr_no}` });
        },
        matchPSR(){
            alert(this.psrs.length);
            for(var i=0; i<this.psrs.length; i++){
                // alert("Enter Matching 123: "+i+" Compare with: "+ this.PSRNo);
                if(this.psrs[i].psr_no == this.PSRNo){
                    // alert("Match");
                    this.match = true;
                    this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${this.PSRNo}` });
                    break;
                }
        }
        // alert("Not Found");
    }
}
}
</script>

<style scoped src="@/assets/style/style.css">

</style>
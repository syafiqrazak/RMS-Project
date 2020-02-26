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
                            <td class="clsValue" style="padding:0.6rem;">
                                <b-input v-model="PSRNo" style="width:38%"></b-input>
                            </td>
                        </tr>
                    </table>
                    
                    <md-button
                        class="md-raised md-success"
                        @click="matchPSR()"
                        style="float:right"
                        >GO</md-button ><br><br>
                    </md-card-content>
                </div>
            <div v-else-if="inputMethod == '2'">
               <md-card-content>
                  <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true"> 
                    <template slot-scope="props">
                        <b-table-column field="po_no" label="PSR Number" sortable>
                            <a @click="passPSR(props.row)">
                                {{ props.row.psr_no }}
                            </a>
                        </b-table-column>
                        <b-table-column field="po_date" label="Date Created">
                            {{ props.row.created_at | moment(" Do MMMM YYYY") }}
                        </b-table-column>
                        <!-- <b-table-column>
                            {{ props.row.status }}
                        </b-table-column>
                        <b-table-column field="id" label="ID" width="300" >
                            {{ props.row.id }}
                        </b-table-column> -->
                    </template> 
                </b-table>
    <br>
    <br><br><br>
    <div style=" width:20%; float:right; ">
      <form v-on:submit="pagination">
        <md-input
          style="width:60px; float: left; height:28px;text-align: right; "
          type="number"
          v-model="page"
          :disabled="false"
        />
      </form>
      &nbsp;<b>/{{ total_page }}</b>
      &nbsp;&nbsp;
      <b-tooltip label="Previous" type="is-light" position="is-bottom">
        <b-button
          @click="previousPage"
          :disabled="isPrevious"
          size="is-small"
          float="right"
          type="is-light" 
          display="inline"
        >
          <md-icon>navigate_before</md-icon>
        </b-button>
      </b-tooltip>
      <b-tooltip label="Next" type="is-light" position="is-bottom">
        <b-button
          @click="nextPage"
          :disabled="isNext"
          size="is-small"
          float="right"
          type="is-light"
        >
          <md-icon>navigate_next</md-icon>
        </b-button>
        &nbsp;&nbsp;
      </b-tooltip>
    </div>
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
            page: 1,
            total_page:0,
        }
    },
    async created() {
            this.psrObj.in_page = 1;
            this.psrObj.in_param_5 = true;
            this.getPSR();
    },
    methods: {
        passPSR(value){
            console.log(value.id);
            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${value.id}` });
        },
        async getPSR(){
            try {
            this.isLoading = true;
            this.psrObj.in_param_5 = true;
            console.log(this.psrObj);
            const data = await psr.psr_search(this.psrObj);
            console.log(data.result);
            this.psrs = data.result[0];
            this.total_page =data.result[1];
            this.psrs = data.map[0](psr => ({
                ...psr
            }))
            this.isLoading = false;
        } catch (err) {
            console.log(err);
            this.error = err.message;
            this.isLoading = false;
            // alert(err);
        }
        },
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) 
        this.isNext = true;
      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) 
        this.isPrevious = true;
      
      this.psrObj.in_page = this.page;
      this.getPSR();
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else this.page = 1;

      this.psrObj.in_page = this.page;
      this.getPSR();
    },
        matchPSR(){
            if(this.psrs != null){
                // alert(this.psrs.length);
                // this.PSRNo = parseInt(this.PSRNo);
                alert(this.PSRNo);
                for(var i=0; i<this.psrs.length; i++){
                    alert("Enter Matching 123: "+i+" Compare with: "+ this.PSRNo);
                    if(this.psrs[i].psr_no == this.PSRNo){
                        alert("Match");
                        try{
                            this.match = true;
                            this.$router.push({ path: `/purchaseOrder/${localStorage.id}/${this.psrs[i].id}` });
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
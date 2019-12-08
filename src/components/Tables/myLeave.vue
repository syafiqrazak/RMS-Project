<template>
  <div >
      <!-- {{leaves}} -->
     <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
   <b-table :data="isEmpty ? [] : passLeave" :striped="true" :hoverable="true" > 
     <template slot-scope="props">
       <b-table-column field="id" label="Applicant" width="300" >
          <a @click="detail(props.row)">
              {{ props.row.user_leave.firstname }}
          </a>
        </b-table-column>
        <b-table-column field="date_from" label="Start">
            {{ props.row.date_from }}
        </b-table-column>
        <b-table-column field="date_to" label="End">
            {{ props.row.date_to }}
        </b-table-column>
        <b-table-column field="date_from" label="Status" v-if="props.row.status == false && props.row.approver_id == null">
            Pending
        </b-table-column>
        <b-table-column field="date_from" label="Status" v-else-if="props.row.status == false && props.row.approver_id != null">
            Declined
        </b-table-column>
        <b-table-column field="date_from" label="Status" v-else>
            Approved
        </b-table-column>

     </template>
   </b-table>
  </div>

</template>

<script>
import leave from "@/js/leave.js"; //directory to leave.js
export default {
    name: "my-leave",
    data(){
        return{
            leaves: '', //do for leave in leaves
            passLeave: [],
            error: '',
            isLoading: false,
            id: localStorage.id,
            page: 1,
        };
    },
    async created() {
        try {
            this.isLoading = true;
            const data = await leave.show_own_leave(this.page);
            this.leaves = data.map(leave => ({
                ...leave
            })) 
            this.isLoading = false;
        } catch (err) {
            this.error = err.message;
            this.isLoading = false;
            alert(err);
        }
        for( var i=0; this.leaves[0][i] != null; i++){
            this.passLeave.push(this.leaves[0][i]);
        }
    },
        methods: {
            detail(value){
                console.log(value.id);
                this.$router.push({ path: `/displayLeave/${this.id}/${value.id}/status` });
            },
        }
    
    
}
</script>

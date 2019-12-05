<template>
  <div >
      {{passLeave}}
     <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
   <b-table :data="isEmpty ? [] : passLeave" :striped="true" :hoverable="true" > 
     <template slot-scope="props">
       <b-table-column field="id" label="Applicant" width="300" >
          <!-- <a @click="detail(props.row)"> -->
              {{ props.row.user_id }}
          <!-- </a> -->
        </b-table-column>
        <!-- <b-table-column field="date_from" label="Start">
            {{ props.row.date_from }}
        </b-table-column>
        <b-table-column field="date_to" label="End">
            {{ props.row.date_to }}
        </b-table-column>
        <b-table-column field="reason" label="Reason">
            {{ props.row.reason }}
        </b-table-column> -->
        <!-- <b-table-column field="status" label="Status">
            {{ props.row.status }}
        </b-table-column> -->
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
            leaves: [], //do for leave in leaves
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
        this.passLeave = this.leaves[0];
    },
        methods: {
            
        }
    
    
}
</script>

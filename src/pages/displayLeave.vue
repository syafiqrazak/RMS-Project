<template>
    <div class="container" border="3px" height="5000px">  
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Leave Application Details</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4><strong> Start Date:</strong> {{date_from}}</h4>
            </div>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4><strong> End Date:</strong> {{date_to}}</h4>
            </div>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4>Reasons:</h4>
                <h4>{{reason}}</h4>
            </div>
            <div  style=" margin-left: 42%; margin-right: 42%;">
                <b-button style="float:left;" type="is-success" @click.prevent="approve_leave()">Approve</b-button>
                <b-button style="float:right;" type="is-danger">Decline</b-button>
                {{error}}
             </div>
             <br><br>
        </md-card-content>
        </md-card>
    </div>
</template>

<script>
import leaves from "@/js/leave.js"; //directory to leave.js
export default {
    data(){
        return{
            id: localStorage.id,
            leave_id: this.$route.params.leave_id,  //vue-router - to get leave_id
            po_no: this.$route.params.po_no,
            date_from: '',
            date_to: '',
            reason: '',
            status: '',
            error: '',
        };
    },
    async created() {
        try {
            const leave = await leaves.report(this.leave_id);
            this.date_from = leave.date_from;
            this.date_to = leave.date_to;
            this.reason = leave.reason;
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async approve_leave() {
            try {
                const leave = await leaves.approve_leave(this.leave_id);
                this.status = leave.status;
                alert(this.status);
                alert("Leave application approved");
            } catch (err) {
                this.error = err.message;
            }
        },
    }
}
</script>
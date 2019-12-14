<template>
    <div class="container" border="3px" height="5000px">  
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Users</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
            {{users}}
            {{error}}
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
                <b-table :data="isEmpty ? [] : leaves" :striped="true" :hoverable="true" :paginated="true" :per-page="10" aria-next-label="Next page"
                            aria-previous-label="Previous page"
                            aria-page-label="Page"
                            aria-current-label="Current page"
                            :pagination-simple="true"> 
                    <template slot-scope="props">
                    <b-table-column field="id" label="Applicant" width="300" >
                        <a @click="detail(props.row)">
                            {{ props.row.user_leave.firstname }}
                        </a>
                        </b-table-column>
                        <b-table-column field="date_from" label="Start">
                            {{ props.row.date_from | moment("D/MM/YYYY")}}
                        </b-table-column>
                        <b-table-column field="date_to" label="End">
                            {{ props.row.date_to | moment("Do MMMM YYYY") }}
                        </b-table-column>
                        <b-table-column field="reason" label="Reason">
                            {{ props.row.reason }}
                        </b-table-column>
                        <b-table-column field="status" label="Status">
                            {{ props.row.status }}
                        </b-table-column>
                    </template>
                </b-table>
        </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import admin from "@/js/admin.js"; //directory to leave.js
    export default {
        name: "notify-leave",
        data(){
            return{
                users: [], 
                error: '',
                isLoading: false,
                id: localStorage.id,
            };
        },
        async created() {
            try {
                this.isLoading = true
                const data = await admin.get_all_user();
                console.log("Users:");
                this.users = data;
                alert(this.users);
                // this.users = data.map(users => ({
                //     ...users
                // })) 
                this.isLoading = false
            } catch (err) {
                this.error = err.message;
            }
        },
            methods: {
                detail(value){
                    console.log(value.id);
                    this.$router.push({ path: `/displayLeave/${this.id}/${value.id}/approval` });
                },
                openLoading() {
                    this.isLoading = true
                    setTimeout(() => {
                        this.isLoading = false
                    }, 10 * 1000)
                }
            }
    }
</script>
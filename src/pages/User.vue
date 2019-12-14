<template>
    <div class="container" border="3px" height="5000px">  
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Users</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
            <!-- {{users}}
            {{error}} -->
            <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
                <b-table :data="isEmpty ? [] : users" :striped="true" :hoverable="true" :paginated="true" :per-page="10" aria-next-label="Next page"
                            aria-previous-label="Previous page"
                            aria-page-label="Page"
                            aria-current-label="Current page"
                            :pagination-simple="true"> 
                    <template slot-scope="props">
                    <b-table-column field="id" label="Username" width="300" >
                        <a @click="detail(props.row)">
                            {{ props.row.username }}
                        </a>
                    </b-table-column>
                    <b-table-column field="id" label="Firstname" width="300" >
                            {{ props.row.firstname }}
                    </b-table-column>
                    <b-table-column field="id" label="Lastname" width="300" >
                            {{ props.row.lastname }}
                    </b-table-column>
                    <b-table-column field="id" label="Role" width="300" >
                            <span v-if="props.row.t1 == true">Level 1</span>
                            <span v-else-if="props.row.t2 == true">Level 2</span>
                            <span v-else-if="props.row.t3 == true">Level 3</span>
                            <span v-else-if="props.row.t4 == true">Level 4</span>
                            <span v-else-if="props.row.is_admin == true">Admin</span>
                            <span v-else>Invalid User</span>
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
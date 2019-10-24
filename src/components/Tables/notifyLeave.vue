<template>
  <div >
    <!-- <router-link :to="{ name: 'PSR', params: { id: this.id } }">PSR</router-link> -->
    <!-- <md-table v-model="leaves" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }" v-on:click="routerLinkToDetails(item)" >
        <md-table-cell md-label="Employee ID" click="routerLinkToDetails">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Date Start">{{ item.date_from }}</md-table-cell>
        <md-table-cell md-label="Date End">{{ item.date_to }}</md-table-cell>
        <md-table-cell md-label="Reason">{{ item.reason }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
      </md-table-row>
    </md-table> -->

    <!-- <b-table :data="leaves" :columns="columns" :hoverable="true" :striped="true" selectable @select="routerLinkToDetails"></b-table> -->

   <b-table :data="isEmpty ? [] : leaves" :striped="true" :hoverable="true" :paginated="true" :per-page="10" aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :pagination-simple="true"> 
     <template slot-scope="props">
       <b-table-column field="id" label="ID" width="300" >
          <a @click="routerLinkToDetails(props.row)">
              {{ props.row.id }}
          </a>
        </b-table-column>
        <b-table-column field="date_from" label="Start">
            {{ props.row.date_from }}
        </b-table-column>
        <b-table-column field="date_to" label="End">
            {{ props.row.date_to }}
        </b-table-column>
        <b-table-column field="reason" label="Reason">
            {{ props.row.reason }}
        </b-table-column>
        <b-table-column field="status" label="Status">
            {{ props.row.status }}
        </b-table-column>
     </template>
   </b-table>
       {{leaves}}

  </div>
  <!-- <div v-else>
      <b-message title="No Data" type="is-danger" has-icon aria-close-label="Close message">
          {{leaves}}
        </b-message>
  </div> -->
</template>

<script>
import leave from "@/js/leave.js"; //directory to leave.js
export default {
    name: "notify-leave",
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: ''
        };
    },
    async created() {
        try {
            const data = await leave.show_all_leave();
            this.leaves = data.map(leave => ({
                ...leave
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        
    }
    
}
</script>

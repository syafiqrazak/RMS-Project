<template>
  <div>
    {{pos}}
   <b-table :data="isEmpty ? [] : leaves" :striped="true" :hoverable="true"> 
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
       <!-- {{leaves}} -->

  </div>
</template>

<script>
import leave from "@/js/po.js"; //directory to leave.js
export default {
    data(){
        return{
            pos:[],  //for po in pos {{po.[var name]}}
            page:1,
            error: ''
        };
    },
    async created() {
        try {
            const data = await po.report(this.po_id);
            this.pos = data.map(pos => ({
                ...pos,
                createdAt: new Date(pos.createdAt)
            })) 
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
                const data = await po.report(this.page);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async get_submits() {
            try {
                const data = await po.report(this.page);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await po.report(this.po_id);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>

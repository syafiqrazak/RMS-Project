<template>
    <div>
        <h5>testing</h5>
        {{pos}}
        {{page}}
        <b-table :data="isEmpty ? [] : pos" :striped="true" :hoverable="true" :paginated="true" :per-page="5" aria-next-label="Next page"
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
                <b-table-column field="po_date" label="Date Created">
                    {{ props.row.po_date }}
                </b-table-column>
                    {{ props.row.status }}
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>




<script>
import po from "@/js/po.js"; //directory to po.js

export default {
    name: "notify-PO",
    data(){
        return{
            pos:[],  //for po in pos {{po.[var name]}}
            page:1,
            error: ''
        };
    },
    async created() {
        try {
            const data = await po.show_all_po();
                this.pos = data.map(pos => ({
                ...pos
                }))
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
            const data = await po.get_submits(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))
                return this.pos

            } catch(err) {
                this.error = err.message;
                return this.error
            }
            
        },
        async get_submits() {
            try {
            const data = await po.get_pending(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))

            } catch(err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await po.find(this.po_no);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        //create in vue:
        // if page == 1, hide previous button, show next button
        // if page == total_page, show previous button, show next button
        nextPage() {
            page += 1;
            if(page > total_page) {
                page = total_page;
            }
        },
        previousPage() {
            page -+ 1;
            if(page <= 0) {
                page = 1;
            }
        }
    }
    
}
</script>
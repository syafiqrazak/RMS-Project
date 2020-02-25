<template>
  <div>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
    <h5>
    </h5>
    <b-table :data="isEmpty ? [] : pos" :striped="true" :hoverable="true">
      <template slot-scope="props">
        <b-table-column field="id" label="PO Number" width="500">
          <a @click="detail(props.row)">
            PO/TRD-{{ props.row.po_no | numeral("000000") }}
          </a>
        </b-table-column>
        <b-table-column
          v-if="
            props.row.status_decline == false && props.row.status_t2 == false
          "
          field="id"
          label="Status"
          width="300"
        >
          <p>
            Pending
          </p>
        </b-table-column>
        <b-table-column
          v-else-if="props.row.status_decline == true"
          field="id"
          label="Status"
          width="300"
        >
          <p>
            Decline
          </p>
        </b-table-column>
        <b-table-column v-else field="id" label="Status" width="300">
          <p>
            Approved
          </p>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import purchaseOrder from "@/js/po.js"; //directory to po.js
import poClass from "@/js/class/po_class.js"; //directory to po_class.js

export default {
  name: "my-PO",
  data() {
    return {
      poObj: new poClass(),
      error: "",
      isLoading: false,
      id: localStorage.id,
      page: 1,
      pos: [],
      total_page: ""
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.poObj.in_page = 1;
      this.poObj.branch = localStorage.branch;
      this.poObj.department = localStorage.department;
      
      const data = await purchaseOrder.show_own_po_page(this.poObj);
      const pos1 = data.result[0];
      this.total_page = data.result[1];
      this.pos = pos1.map(pos => ({
        ...pos
      }));
      this.isLoading = false;
    } catch (err) {
      this.error = err.message;
      alert(err);
      this.isLoading = false;
    }
  },
  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({
        path: `/displayPO/${this.id}/${value.id}/status`
      });
    }
  }
};
</script>

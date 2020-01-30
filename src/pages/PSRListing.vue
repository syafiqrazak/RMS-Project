<template>
  <div>
    <!-- <div>{{ new Date() | dateFormat('YYYY.MM.DD') }}</div> -->
    <!-- <div>Date: {{psrs.psr_date[0]}}</div> -->
    {{ psrs }}
    <b-table :data="isEmpty ? [] : psrs" :striped="true" :hoverable="true">
      <template slot-scope="props">
        <b-table-column field="po_no" label="PO Number" width="400" sortable>
          <a @click="detail(props.row)">
            PSR/TRD-{{ props.row.psr_no | numeral("000000") }}
          </a>
          <!-- <a @click="detail(props.row)">
                        PSR/TRD-{{ props.row.id  }}
                    </a> -->
        </b-table-column>
        <b-table-column field="createdBy" label="Create By" width="500">
          {{ props.row.create_user_psr.firstname }}
          {{ props.row.create_user_psr.lastname }}
        </b-table-column>
        <b-table-column field="po_date" label="Date Created">
          {{ props.row.createdAt | moment("Do MMMM YYYY") }}
        </b-table-column>
        <!-- <b-table-column>
                    {{ props.row.status }}
                </b-table-column> -->
      </template>
    </b-table>
    <br /><br />
    <div style=" width:15%; float:right; display:block-inline; ">
      <form v-on:submit="pagination">
        <md-input
          style="width:30px; float: left; height:28px; text-align: right; "
          type="number"
          v-model="page"
          :disabled="false"
        />
      </form>
      &nbsp; <b>/{{ total_page }}</b>
      &nbsp;&nbsp;
      <b-tooltip label="Previous" type="is-light" position="is-bottom">
        <b-button
          @click="previousPage"
          :disabled="isPrevious"
          size="is-small"
          float="right"
          type="is-light"
        >
          <md-icon>navigate_before</md-icon>
        </b-button>
      </b-tooltip>
      <!-- &nbsp; -->
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
    <!-- {{psrs[0]}} -->
    <!-- {{page}} -->
    {{ error }}
  </div>
</template>

<script>
import psr from "@/js/psr.js"; //directory to psr.js
import psrClass from "@/js/class/psr_class.js"; //directory to po_class.js

export default {
  name: "notify-PSR",
  data() {
    return {
      psrObj: new psrClass(),
      psrs: [], //for psr in psrs {{psr.[var name]}}
      page: 1,
      error: "",
      total_page: "",
      isNext: false,
      isPrevious: true,
      id: this.$route.params.id,
      t1: null,
      t2: null,
      t4: null,
      t3: null,
      is_admin: null
    };
  },
  async created() {
    try {
      //testing starts
      this.psrObj.in_param_1 = null;
      this.psrObj.in_param_2 = null;
      this.psrObj.in_param_3 = null;
      this.psrObj.in_param_4 = null;
      this.psrObj.in_param_5 = null;
      this.psrObj.in_page = 1;
      console.log(this.psrObj);
      this.psrObj.toJson();
      //testing ends
      const data = await psr.psr_search(this.psrObj);
      const psrs1 = data.result[0];
      this.total_page = data.result[1];
      this.psrs = psrs1.map(psrs => ({
        ...psrs
      }));
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    detail(value) {
      alert(value.id);
      this.$router.push({
        path: `/displayPSR/${this.id}/${value.psr_no}/approval`
      });
    },
    async search() {
      try {
        const data = await psr.psr_search(this.poObj);
        this.pos = data;
        this.po_id = this.pos.id;
      } catch (err) {
        this.error = err.message;
      }
    },
    async get_pending() {
      try {
        const data = await psr.report(this.page);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async get_submits() {
      try {
        const data = await psr.report(this.page);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async find() {
      try {
        const data = await psr.report(this.psr_id);
        this.psrs = data.map(psrs => ({
          ...psrs,
          createdAt: new Date(psrs.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) this.isNext = true;
      try {
        // alert(this.page);
        this.psrObj.in_page = this.page;
        const data = await psr.show_psr_page(this.psrObj);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async previousPage() {
      this.isNext = false;
      if (this.page <= 1) {
        this.page = 1;
        this.isPrevious = true;
      } else this.page -= 1;
      if (this.page == 1) this.isPrevious = true;
      try {
        this.psrObj.in_page = this.page;
        const data = await psr.show_psr_page(this.psrObj);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async pagination() {
      if (this.page >= this.total_page) {
        this.page = this.total_page;
        this.isNext = false;
      } else if (this.page < 1) {
        this.page = 1;
        this.isPrevious = false;
      } else this.page = this.page;
      try {
        const data = await psr.show_psr_page(this.page);

        const psrs1 = data.result[0];
        this.total_page = data.result[1];
        this.psrs = psrs1.map(psrs => ({
          ...psrs
        }));
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

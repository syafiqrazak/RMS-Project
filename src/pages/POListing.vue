<template>
  <div>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">PURCHASE SERVICE AND REQUISITION DETAILS</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <md-card-expand-trigger>
            <md-button>Filter</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <md-card-content>
          <div class="alert alert-info" style="color: black; background-color:white;width:100%; display: inline-block;">
            <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">

                    <tr>
                        <td class="clsLabel">
                            <h4>Purchase Order No.: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="poNo" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Company Name: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="companyName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Date </h4>
                        </td>
                        <td class="clsValue">
                            
                          <b-field>
                            <b-select v-model="date" style="width:10%">
                                <option value= null> </option>
                                <option value="1">1 </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4 </option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7 </option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10 </option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13 </option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16 </option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19 </option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22 </option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25 </option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28 </option>
                                <option value="28">29</option>
                                <option value="30">30</option>
                                <option value="31">31 </option>
                            </b-select>
                            <b-select v-model="month">
                                <option value= ''> </option>
                                <option value="1">January </option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">Aptil</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </b-select>
                            <b-input v-model="year" style="width:20%"></b-input>
                        </b-field>
                        {{month}}
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Is Approved </h4>
                        </td>
                        <td class="clsValue">
                          <b-checkbox v-model="isApproved">
                            {{ isApproved }}
                        </b-checkbox>
                        </td>
                    </tr>

            </table>
            
        <md-card-actions md-alignment="right">
            <md-button @click="filter()">Submit</md-button>
        </md-card-actions>
          </div>
        </md-card-content>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
      <md-card-content>
        <b-table
          :data="isEmpty ? [] : pos"
          :striped="true"
          :hoverable="true"
        >
          <template slot-scope="props">
            <b-table-column field="po_no" label="PO Number" sortable>
              <a @click="detail(props.row)">
                PO/TRD-{{ props.row.po_no | numeral("000000") }}
              </a>
            </b-table-column>
            <b-table-column field="create_user" label="Create By">
              {{ props.row.create_user }}
            </b-table-column>
            <b-table-column field="created_at" label="Date Created">
              {{ props.row.created_at | moment("Do MMMM YYYY") }}
            </b-table-column>
          </template>
        </b-table>
        <br /><br />
        <div style=" width:15%; float:right; ">
          <form v-on:submit="pagination">
            <md-input
              style="width:30px; float: left; height:28px;text-align: right; "
              type="number"
              v-model="page"
              :disabled="false"
            />
          </form>
          &nbsp;<b>/{{ total_page }}</b>
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
          <br /><br /><br />
        </div>
        {{ error }}
        <!-- {{ pos }} -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import po from "@/js/po.js"; //directory to po.js
import poClass from "@/js/class/po_class.js"; //directory to po_class.js

export default {
  name: "notify-PO",
  data() {
    return {
      isApproved: false,
      poObj: new poClass(),
      pos: [], //for po in pos {{po.[var name]}}
      page: 1,
      error: "",
      total_page: 1,
      isNext: false,
      isPrevious: true,
      id: this.$route.params.id,
      t1: null,
      t2: null,
      t4: null,
      t3: null,
      is_admin: null,
      poNo: null,
      companyName: null,
      date:null,
      month: null,
      year: null,
      isEmpty: false
    };
  },
  async created() {
    try {
      //testing starts
      this.poObj.in_param_1 = null;
      this.poObj.in_param_2 = null;
      this.poObj.in_param_3 = null;
      this.poObj.in_param_4 = null;
      this.poObj.in_param_5 = null;
      this.poObj.in_page = 1;
      console.log(this.poObj);
      // this.poObj.toJson();
      //testing ends
      this.poObj.in_page = 1;
      // alert(new Date().getDate());
      const data = await po.po_search(this.poObj.toJson());
      console.log(data);
      const pos1 = data.result[0];
      // this.total_page = data.result[1];
      this.total_page = data.totalrecords;
      this.pos = pos1.map(pos => ({
        ...pos
      }));
      console.log(this.pos);
    } catch (err) {
      this.error = err.message;
    }
  },

  methods: {
    detail(value) {
      console.log(value.po_no);
      this.$router.push({
        path: `/displayPO/${this.id}/${value.po_no}/audit`
      });
    },
    async filter(){
      try {
      //testing starts
      this.poObj.in_param_1 = this.poNo;
      this.poObj.in_param_2 = this.companyName;
      this.poObj.in_param_3 = this.date;
      this.poObj.in_param_4 = this.month;
      this.poObj.in_param_5 = this.year;
      this.poObj.in_param_6 = this.isApproved;
      this.poObj.in_page = 1;
      console.log(this.poObj);
      // this.poObj.toJson();
      //testing ends
      this.poObj.in_page = 1;
      // alert(new Date().getDate());
      const data = await po.po_search(this.poObj.toJson());

      const pos1 = data.result[0];
      console.log(data);
      // this.total_page = data.result[1];
      this.total_page = data.totalrecords;
      this.pos = pos1.map(pos => ({
        ...pos
      }));
      console.log(this.pos);
    } catch (err) {
      this.error = err.message;
      alert(err);
    }
    },
    async get_pending() {
      try {
        const data = await po.get_submits(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
        return this.pos;
      } catch (err) {
        this.error = err.message;
        return this.error;
      }
    },
    async get_submits() {
      try {
        const data = await po.get_pending(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    async find() {
      try {
        const data = await po.find(this.po_no);
        this.pos = data.map(pos => ({
          ...pos,
          createdAt: new Date(pos.createdAt)
        }));
      } catch (err) {
        this.error = err.message;
      }
    },
    //create in vue:
    // if page == 1, hide previous button, show next button
    // if page == total_page, show previous button, show next button
    async nextPage() {
      this.isPrevious = false;
      if (this.page >= this.total_page - 1) {
        this.page = this.total_page;
      } else this.page += 1;
      if (this.page == this.total_page) this.isNext = true;
      try {
        this.poObj.in_page = this.page;
        const data = await po.show_po_page(this.poObj);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
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
        this.poObj.in_page = this.page;
        const data = await po.show_po_page(this.poObj);
        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
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
        const data = await po.show_po_page(this.page);

        const pos1 = data.result[0];
        this.total_page = data.result[1];
        this.pos = pos1.map(pos => ({
          ...pos
        }));
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
.clsLabel{
    /* background-color: #969191; */
    /* color: #ffffff; */
    height: 65px;
    vertical-align: middle;
    padding-left: 1em;
    font-weight: 700;
    font-size: 150%;
    text-align: left;
    /* border-right:8px solid #ffffff; */
    /* border-bottom: 5px solid #ffffff; */
    border-radius: 10px;
    /* border-right: 7px; */
}
.clsLabel h4{
    font-weight: 500;

}
.clsValue{
    /* background-color: #f3f3f3; */
    /* background-color: #ffffff; */
    color: black;
    height: 20px;
    vertical-align: middle;
    padding-left: 5%;
    font-weight: 400;
    border-bottom: 5px solid #ffffff;
    /* border: 5px solid red; */
    border-radius: 10px;
}
.clsForm{
    border-radius: 30px;
    border: 1px solid #ffffff;
}
</style>

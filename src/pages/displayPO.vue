<template>
  <div class="container" border="3px">
    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Purchase Order Details</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <table style="width:100%">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>
                <b>{{ company }}</b>
              </td>
              <td>
                <p><b>Purchase Order Number:</b></p>
              </td>
              <td>
                <p>{{ PO_no }}</p>
              </td>
            </tr>
            <td rowspan="9"><b>Address:</b> {{ address }}</td>
            <tr>
              <td>
                <p><b>Date</b></p>
              </td>
              <td>
                <p>{{ Dates }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Page:</b></p>
              </td>
              <td>
                <p>{{ Page_no }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Our Ref:</b></p>
              </td>
              <td>
                <p>{{ ref }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Your Quotation:</b></p>
              </td>
              <td>
                <p>{{ quot }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Delivery Due Date:</b></p>
              </td>
              <td>
                <p>{{ dueDate }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>Mode of Shipment:</b></p>
              </td>
              <td>
                <p>{{ shipment }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>PSR No.:</b></p>
              </td>
              <td>
                <p>{{ PSR }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>CCA No.:</b></p>
              </td>
              <td>
                <p>{{ CCA }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p><b>To: </b> {{ to }}</p>
              </td>
              <td>
                <p><b>Mode of Shipment:</b></p>
              </td>
              <td>
                <p>{{ shipment }}</p>
              </td>
            </tr>
          </table>

          <div>
            <md-table
              style="width:100%"
              v-model="item"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              md-card
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Description">{{
                  item.desc
                }}</md-table-cell>
                <md-table-cell md-label="Quantity">{{
                  item.quantity
                }}</md-table-cell>
                <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
                <md-table-cell md-label="Total Price"
                  ><b>RM {{ item.quantity * item.price }}</b></md-table-cell
                >
              </md-table-row>
            </md-table>
          </div>

          {{ total }}
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import user from "@/js/leave.js"; //directory to leave.js
export default {
  name: "edit-profile-form",
  data() {
    return {
      error: "",
      company: "Dinastia Jati SDN BHD",
      PO_no: "PO-1234",
      Dates: "12-12-2019",
      Page_no: "1",
      ref: "Ref",
      quot: "Quotation",
      dueDate: "15-12-2019",
      shipment: "Ship",
      PSR: "PSR-9808",
      CCA: "CCA-5678",
      payment: "As per invoice",
      address:
        "A1-L2-2 Pantai Hillpark Phase 1, Pantai Hillpark, 59200 Kuala Lumpur",
      to: "Mr Adnan Azhar",
      total: 0,
      item: [
        {
          desc: "Racket",
          quantity: "2",
          price: "20"
        },
        {
          desc: "Sugar",
          quantity: "100",
          price: "4"
        },
        {
          desc: "Cake",
          quantity: "2",
          price: "55"
        }
      ]
    };
  },
  created: function() {
    // `this` points to the vm instance
    for (i = 0; i < this.item.length; i++) {
      this.total += this.item.quantity[i] * this.item.price[i];
    }
  },
  methods: {
    async add_leave() {
      this.$router.push({ path: "/leaveSubmitSuccess" }); //add redirect to other page here

      try {
        const leave = await user.add_leave(
          this.leave.startDate,
          this.leave.endDate,
          this.leave.reason
        );
        console.log(leave); //can be ignored
        this.$router.push({ path: "/leaveSubmitSuccess/id" }); //add redirect to other page here
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
.md-card {
  display: inline-block;
  position: relative;
  /* width: 390%; */
  width: 1000px;
  margin: 25px 0;
  overflow: unset;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
}
.md-textarea {
  border: 1px solid #ccc !important;
  border-radius: 16px;
}
tr {
  border: 1px;
}
</style>

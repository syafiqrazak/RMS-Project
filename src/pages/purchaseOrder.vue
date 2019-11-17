<template>
  <div v-if="PSRAvailable" id="app">
    <div class="container">
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase Order Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content>
            <div v-show="step === 1">
              <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                <!-- <tr>
                        <td class="clsLabel">
                            <h4>Date:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="details.date" style="width:98%"></b-input>
                        </td>
                    </tr>-->
                     <tr>
                        <td class="clsLabel">
                            <h4>Our Reference: </h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="details.reference" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Your Quotation:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="details.quotation" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <h4>Delivery Due Date:</h4>
                        </td>
                        <td class="clsValue">
                          <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:3.5em; width:98%; verticle-align:middle;">
                            <!-- <b-field label="Select datetime"> -->
                              <md-datepicker v-model="selectedDate" style="padding-top: 0px;" md-immediately />
                          </div>
                        </td>
                    </tr>
                  <tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Mode of Shipment</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                            <b-select expanded style="width:98%;">
                                <option value="flint">Land </option>
                                <option value="silver">Ship</option>\
                                <option value="silver">Air</option>
                            </b-select>
                        </b-field>
                        </td>
                    </tr>
                  <tr>
                        <td class="clsLabel">
                            <h4>CCA No.:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="details.CCANo" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Mode of Payment:</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                            <b-select expanded style="width:98%;">
                                <option value="flint">Debit </option>
                                <option value="silver">Credit</option>\
                                <option value="silver">As per Invoice</option>
                            </b-select>
                        </b-field>  
                        </td>
                    </tr>
                
              </table>

              <div class="md-layout"></div>
              <md-button
                class="md-raised md-success"
                @click.prevent="next()"
                style="float:right"
                >Next</md-button
              >
              {{ details }}
              <!-- </div> -->
            </div>

            <div v-show="step === 2" style="width:100%;">
              <md-card-content style="width:100%;">
                <md-button
                  class="md-raised md-success"
                  @click="clone()"
                  style="float:left"
                  >Add</md-button
                >
                <br /><br /><br />
              </md-card-content >
              <!-- <h1>Step Two</h1> -->
              <md-card-content style="width:100%;">
                <table style="width:100%;">
                  <tr>
                    <th>No.</th>
                    <th>Item Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  <tr v-for="items in item" :key="items.desccription">
                    <td>{{ items.index }}</td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.description" ></md-input>
                      </md-field>
                    </td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.unitPrice"></md-input>
                      </md-field>
                    </td>
                    <td>
                      <md-field>
                        <!-- <label>Company (disabled)</label> -->
                        <md-input v-model="items.quantity"></md-input>
                      </md-field>
                    </td>
                    <td>RM {{ items.unitPrice * items.quantity |numeral('0.00') }}</td>
                    <td>
                      <div @click="remove()">
                        <md-icon>cancel</md-icon>
                      </div>
                    </td>
                  </tr>
                </table>
              </md-card-content>

              <md-button
                class="md-raised md-success"
                @click.prevent="po_addpo()"
                style="float:right"
                >Submit</md-button
              >
              <md-button
                class="md-raised md-success"
                @click.prevent="prev()"
                style="float:right"
                >Previous</md-button
              >
              <!-- <input type="submit" value="Save"> -->
              {{ item }}
              {{ error }}
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
  </div>
  <div v-else>
    
  </div>
</template>

<script>
import purchaseOrder from "@/js/po.js"; //directory to po.js
import { SimpleTable, notifyLeave, notifyPO, notifyPSR, psrSearch } from "@/components";
export default {
  data() {
    return {
      PSRAvailable: true,
      inputMethod: '0',
      isSearch: false,
      isEnter: false,
      error: "",
      step: 1,
      index: 2,
      details: {
        date: new Date(),
        reference: null,
        quotation: null,
        dueDate: null,
        modeOfShipment: null,
        PSRNo: null,
        paymentMode: null,
        CCANo: null,
        po_no: null,
        address: null
      },
      item: [
        {
          index: 1,
          description: null,
          quantity: 0,
          unitPrice: 0
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  // async created() {},
  methods: {
    async po_addpo() {
      try {
        const po = await purchaseOrder.po_add(
          this.details.po_no,
          this.details.date,
          this.details.reference,
          this.details.dueDate,
          this.details.modeOfShipment,
          this.details.PSRNo,
          this.details.CCANo,
          this.details.paymentMode,
          this.details.address,
          this.item
        );
        // const po = await po.po_add("123", "date", "po_ref", "due", "ship", "psr", "cca", "pay", "address", {});
        console.log(po); //can be ignored
        alert("Success");
      } catch (err) {
        alert("Fail");
        this.error = err.message;
        console.log(this.error);
      }
    },
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    submit() {
      alert("Submit to blah and show blah and etc.");
    },
    addRow() {
      this.inputs.push({
        one: "",
        two: ""
      });
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    },
    clone() {
      this.item.push({
        index: this.index,
        description: null,
        quantity: 0,
        unitPrice: 0
      });
      this.index++;
    },
    remove() {
      this.item.pop({
        description: this.index,
        quantity: 0,
        unitPrice: 0
      });
      this.index--;
    }
  }
};
</script>

<style scoped src="@/assets/style/style.css">
.md-card {
  width: 1200px;
}
select {
  width: 100%;
}
table td,
table th {
  vertical-align: baseline;
  font-size: 20px;
}
td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}
table {
  widows: 100%;
}
/* tr:nth-child(even) {
  background-color: #59fcff;
} */
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
#body {
  background-color: #120136;
}
</style>

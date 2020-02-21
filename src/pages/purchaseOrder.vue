<template>
  <div v-if="PSRAvailable" id="app">
    <div class="container">
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase Order Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content style="width:100%;">
            <div v-show="step === 1">
              <md-card-content>
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
                              <md-datepicker v-model="details.dueDate" style="padding-top: 0px;" md-immediately />
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
                            <b-select v-model="details.modeOfShipment" expanded style="width:98%;">
                                <option value="Land">Land </option>
                                <option value="Ship">Ship</option>\
                                <option value="Air">Air</option>
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
                            <b-select v-model="details.paymentMode" expanded style="width:98%;">
                                <option value="Debit">Debit </option>
                                <option value="Credit">Credit</option>
                                <option value="As per Invoice">As per Invoice</option>
                            </b-select>
                        </b-field>  
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Address:</h4>
                        </td>
                        <td class="clsValue">
                          <b-field>
                            <b-input v-model="details.address1" style="width:98%"></b-input>
                        </b-field>  
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"></td>
                        <td class="clsValue">
                            <b-input v-model="details.address2" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"> </td>
                        <td class="clsValue">
                            <b-input v-model="details.address3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel"> </td>
                        <td class="clsValue">
                            <b-input v-model="details.address4" style="width:98%"></b-input>
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
              </md-card-content>
            </div>

            <div v-show="step === 2" style="width:150%;">
             <md-card-content style="width:100%;">
                
                <div class="alert alert-info" style="background-color:#bdfffc; color: black;">
                  <md-card-content>
                    <md-button
                      class="md-raised md-danger"
                      @click="remove()"
                      style="float:right"
                      >Remove</md-button>
                    <md-button
                      class="md-raised md-success"
                      @click="clone()"
                      style="float:right"
                      >Add</md-button>
                <br /><br /><br />
              </md-card-content>
                  <table>
                    <tr>
                      <th>No.</th>
                      <th style="width:50%">Item Description</th>
                      <th style="width:150px">Unit Price(RM)</th>
                      <th style="width:150px">Quantity</th>
                      <th>Total</th>
                    </tr>
                    <tr v-for="items in desc" :key="items">
                      <td>{{ items.index }}.</td>
                      <td>
                          <b-field>
                            <b-input v-model="items.description" placeholder="">
                            </b-input>
                        </b-field>
                      </td>
                      <td>
                        <b-field>
                            <b-input v-model="items.unitPrice" placeholder="" type="number">
                            </b-input>
                        </b-field>
                      </td>
                      <td>
                        <b-field>
                            <b-input v-model="items.quantity" placeholder="" type="number">
                            </b-input>
                        </b-field>
                      </td>
                      <td><b-field>
                            <!-- <b-input disabled type="number" value=items.unitPrice * items.quantity>
                            </b-input> -->
                        </b-field>RM {{ items.unitPrice * items.quantity |numeral('0.00')}}</td>
                      <!-- <td>
                        <div @click="remove()">
                          <md-icon>cancel</md-icon>
                        </div>
                      </td> -->
                    </tr>
                  </table>
                </div>
              </md-card-content>
              {{ desc }}
              <md-button class="md-raised"
                @click.prevent="po_addpo()"
                style="float:right"
                >Submit</md-button
              >
              <md-button
                class="md-raised"
                @click.prevent="prev()"
                style="float:right"
                >Previous</md-button
              >
              {{error}}
              <!-- <input type="submit" value="Save"> -->
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
import poClass from "@/js/class/po_class.js"; //directory to po_class.js
export default {
  data() {
    return {
      
      poObj: new poClass(),
      psr_id: this.$route.params.psr_id,
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
        address1: null,
        address2: null,
        address3: null,
        address4: null,
      },
      desc: [
        {
          index: 1,
          description: null,
          quantity: null,
          unitPrice: null,
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  // async created() {},
  methods: {
    async po_addpo() {
      try {
        alert(this.psr_id)
        this.mapObj();
        const po = await purchaseOrder.po_add(this.poObj);
        // const po = await po.po_add("123", "date", "po_ref", "due", "ship", "psr", "cca", "pay", "address", {});
        console.log(po); //can be ignored
        // alert("Success");
          localStorage.message = "Purchase Order Application Submitted";
          this.$router.push({ path: `/message/${this.id}` });
      } catch (err) {
        alert("Fail");
        this.error = err.message;
        console.log(this.error);
      }
    },
    mapObj(){
          this.poObj.po_ref = this.details.reference;
          this.poObj.delv_due = this.details.dueDate;
          this.poObj.ship_mode = this.details.modeOfShipment;
          this.poObj.psr_id = this.details.psr_id;
          this.poObj.cca_no = this.details.CCANo;
          this.poObj.pay_mode = this.details.paymentMode;
          this.poObj.address_1 = this.details.address1;
          this.poObj.address_2 = this.details.address2;
          this.poObj.address_3 = this.details.address3;
          this.poObj.address_4 = this.details.address4;
          this.poObj.po_desc = this.desc;
          this.poObj.branch = localStorage.branch;
          this.poObj.department = localStorage.department;
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

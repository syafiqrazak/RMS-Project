<template>
  <div id="app">
    <div class="container">
      <form action="https://postman-echo.com/post" method="post">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Purchase, Service and Requisition Application</h4>
            <!-- <p class="category">Complete your profile</p> -->
          </md-card-header>

          <md-card-content>
            <div v-show="step === 1">
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
                </tr>
                <tr>
                  <td class="desc">Services:</td>
                  <td>
                    <md-field>
                      <select v-model="details.services">
                        <option disabled value>Please select one</option>
                        <option>Dinastia Jati</option>
                        <option>DJ Marine Services</option>
                      </select>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Purchase Classification:</td>
                  <td>
                    <md-field>
                      <select v-model="details.purchaseClassification">
                        <option disabled value>Please select one</option>
                        <option>CAPEX</option>
                        <option>OPEX</option>
                      </select>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Purchase Type:</td>
                  <td>
                    <md-field>
                      <select v-model="details.purchaseType">
                        <option disabled value>Please select one</option>
                        <option>Project Material</option>
                        <option>Project Consumerable</option>
                        <option>Tools and Equipment</option>
                        <option>Tools(Consumerable)</option>
                        <option>Services</option>
                      </select>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Justification For Purchase:</td>
                  <td>
                    <md-field>
                      <select v-model="details.purchaseJustification">
                        <option disabled value>Please select one</option>
                        <option>Project Use(Consumerable)</option>
                        <option>Operations</option>
                        <option>Continue Rentals</option>
                        <option>Client Materials</option>
                        <option>Single Sources</option>
                        <option>Others</option>
                      </select>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Date Required:</td>
                  <td>
                    <md-field>
                      <md-input type="date" v-model="details.dateRequired"
                        >Date</md-input
                      >
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Delivery:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.delivery"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Project Title:</td>
                  <td>
                    <md-field>
                      <md-input v-model="details.projectTitle"></md-input>
                    </md-field>
                  </td>
                </tr>
                <tr>
                  <td class="desc">Vessel Code:</td>
                  <td>
                    <md-field>
                      <md-input type="date" v-model="details.vesselCode"
                        >Date</md-input
                      >
                    </md-field>
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

            <div v-show="step === 2">
              <md-card-content>
                <md-button
                  class="md-raised md-success"
                  @click="clone()"
                  style="float:left"
                  >Add</md-button
                >
                <br /><br /><br />
              </md-card-content>
              <!-- <h1>Step Two</h1> -->
              <md-card-content>
                <table>
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
                        <md-input v-model="items.description"></md-input>
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
                    <td>{{ items.unitPrice * items.quantity }}</td>
                    <td>
                      <div @click="remove()">
                        <md-icon>cancel</md-icon>
                      </div>
                    </td>
                  </tr>
                </table>
              </md-card-content>
              {{ item }}
              <md-button
                class="md-raised md-success"
                @click.prevent="psr_add()"
                style="float:right"
                >Save</md-button
              >
              <md-button
                class="md-raised md-success"
                @click.prevent="prev()"
                style="float:right"
                >Previous</md-button
              >
              <!-- <input type="submit" value="Save"> -->
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import user from "@/js/psr.js"; //directory to psr.js
export default {
  data() {
    return {
      error: "",
      step: 1,
      index: 2,
      details: {
        psr_no: null,
        services: null,
        purchaseClassification: null,
        purchaseType: null,
        purchaseJustification: null,
        dateRequired: null,
        delivery: null,
        projectTitle: null,
        vesselCode: null,
        date: new Date(),
        psr_data: null
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
  async created() {},
  methods: {
    async psr_add() {
      try {
        const psr = await psr.psr_add(
          this.details.psr_no,
          this.details.date,
          this.details.psr_data,
          this.details.purchaseClassification,
          this.details.purchaseType,
          this.details.purchaseJustification,
          this.details.dateRequired,
          this.details.projectTitle,
          this.details.vesselCode,
          this.details.delivery,
          this.item
        );
        console.log(psr); //can be ignored
        //add redirect to other page here
      } catch (err) {
        this.error = err.message;
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

<style scoped>
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

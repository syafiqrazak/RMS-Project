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
              <md-card-content>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                      <p><strong>Purchase Classifiaction: </strong></p>{{date_req}}
                      <md-radio v-model="pur_class" value="OPEX" class="md-primary">OPEX</md-radio>
                      <md-radio v-model="pur_class" value="CAPEX" class="md-primary">CAPEX</md-radio>

                </section>
              </div>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                  <div class="inline" style="border:1px">
                      <p><strong>Purchase Type: </strong></p>
                      <md-radio v-model="pur_typ" value="PROJECT MATERIALS" class="md-primary">PROJECT MATERIALS</md-radio>
                      <md-radio v-model="pur_typ" value="PROJECT CONSUMABLES" class="md-primary">PROJECT CONSUMABLES</md-radio>
                      <md-radio v-model="pur_typ" value="TOOLS AND EQUIPMENT" class="md-primary">TOOLS AND EQUIPMENT</md-radio>
                      <md-radio v-model="pur_typ" value="TOOLS(CONSUMERABLES)" class="md-primary">TOOLS(CONSUMERABLES)</md-radio>
                      <md-radio v-model="pur_typ" value="SERVICES" class="md-primary">SERVICES</md-radio>

                  </div>
                </section>
              </div>
              <div class="alert alert-info" style="border:1px; background-color:white; color:black;">
                <section>
                      <p><strong>Justification of Purchase: </strong></p>
                      <md-radio v-model="pur_just" value="PROJECT USE(CONSUMERABLES)" class="md-primary">PROJECT USE(CONSUMERABLES)</md-radio>
                      <md-radio v-model="pur_just" value="OPERTATIONS" class="md-primary">OPERTATIONS</md-radio>
                      <md-radio v-model="pur_just" value="CONTINUE RENTALS" class="md-primary">CONTINUE RENTALS</md-radio>
                      <md-radio v-model="pur_just" value="CLIENT MATERIALS" class="md-primary">CLIENT MATERIALS</md-radio>
                      <md-radio v-model="pur_just" value="SINGLE SOURCE" class="md-primary">SINGLE SOURCE</md-radio>
                      <md-radio v-model="pur_just" value="OTHERS" class="md-primary">OTHERS</md-radio>
                  
                </section>
              </div>
              <div style="width:100%;">
                <div class="alert alert-info" style="background-color:white;width:49%; display: inline-block;">
                  <section>
                    <md-datepicker v-model="date_req">
                      <label>Required Date</label>
                    </md-datepicker>
                  </section>
                </div>
                 <div class="alert alert-info" style="background-color:white;width:49%; height:120px; display: inline-block; float:right">
                   <section>
                    <b-field label="Delivery">
                      <b-input v-model="delv" ></b-input>
                  </b-field>
              </section>
                  </div>
              </div>
            <!-- </div> -->
            <div style="width:100%; display:block-inline">
                <div class="alert alert-info" style="color: black; background-color:white;width:49%; display: inline-block;">
                  <section>
                        <p><strong>Cost Type: </strong></p>
                        <md-radio v-model="ty" value="UNIT RATE" class="md-primary">UNIT RATE</md-radio>
                        <md-radio v-model="pur_just" value="AT COST" class="md-primary">AT COST</md-radio>
                        <md-radio v-model="pur_just" value="OVERHEAD" class="md-primary">OVERHEAD</md-radio>
                        <md-radio v-model="pur_just" value="COST PLUS" class="md-primary">COST PLUS</md-radio>
                  </section>
                </div>
                 <div class="alert alert-info" style="color: black; background-color:white;width:49%; display: inline-block; float:right">
                   <section>
                      <p><strong>IS APPLICABLE:</strong></p>
                      <md-radio v-model="isApplicable" value="1" class="md-primary">APPLICABLE</md-radio>
                      <md-radio v-model="isApplicable" value="2" class="md-primary">NOT APPLICABLE</md-radio>
                      
                    </section>
                  </div>
              </div>
           
              <div class="md-layout" v-show="isApplicable === '1'" style="float:right;">
                  <md-button
                    class="md-raised md-success"
                    @click.prevent="next()"
                    style="float:right"
                    >Next</md-button>
              </div>
              <div class="md-layout" v-show="isApplicable === '2'" style="float:right;">
                  <md-button
                    class="md-raised md-success"
                    @click.prevent="psr_adds()"
                    style="float:right"
                    >Submit</md-button>
              </div>
              </md-card-content>
                                {{delv}}

                </div>
            <div v-show="step === 2">
              
              <!-- <h1>Step Two</h1> -->
              <md-card-content>
                <div class="alert alert-info" style="background-color:white;">
                  <section>
                    <b-field label="Project Title:">
                      <b-input v-model="p_title"></b-input>
                  </b-field>
                  </section>
                </div>
                <div class="alert alert-info" style="background-color:white;">
                  <section>
                    <b-field label="Vessel Code">
                      <b-input v-model="vessel_cd"></b-input>
                  </b-field>
                  </section>
                </div>
                
                <div class="alert alert-info" style="background-color:#bdfffc; color: black;">
                  <md-card-content>
                    <md-button
                      class="md-raised md-success"
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
                      <th style="width:150px">Unit Price</th>
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
              {{ item }}
              <md-button class="md-raised"
                @click.prevent="psr_adds()"
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
</template>

<script>
import psrs from "@/js/psr.js"; //directory to psr.js
export default {
  data() {
    return {
      costType:'',
      radio:'',
      radio2:'',
      error: "",
      step: 1,
      index: 2,
      isApplicable: '0',
      psr_no : '',
      date :new Date().toJSON().slice(0,10),
      psr_data : '',
      pur_class : '',
      pur_typ : '',
      pur_just : '',
      date_req : '',
      p_title : '',
      vessel_cd : '',
      delv : '',
      desc: [  //must be in json format
        {
          index: 1,
          description: null,
          quantity: '',
          unitPrice: ''
          //   price:(quantity*unitPrice)
        }
      ]
    };
  },
  async created() {},
  methods: {
    async psr_adds() {
            try {
                 const psr = await psrs.psr_add(
                                              this.psr_data,
                                              this.pur_class, 
                                              this.pur_typ, 
                                              this.pur_just, 
                                              this.date_req,
                                              this.p_title, 
                                              this.vessel_cd, 
                                              this.delv, 
                                              this.desc);
                console.log("PSR");
                console.log(psr); //can be ignored
                //add redirect to other page here
                alert("Success");
            } catch (err) {
                this.error = err.message;
                alert("Error!!!");
                alert(error);
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
      this.desc.push({
        index: this.index,
        description: null,
        quantity: 0,
        unitPrice: 0
      });
      this.index++;
    },
    remove() {
      this.desc.pop({
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

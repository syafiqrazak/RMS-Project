<template>
  <div class="container">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>

    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Leave Application</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <b-field
              label="Start Date:"
              style="display:inline-block; float:left; width:47%"
            >
              <!-- {{isDateDisabled2}} -->
              <md-field>
                <md-datepicker
                  v-model="startDate"
                  md-immediately
                  :md-disabled-dates="disabled"
                />
                <!-- <md-input v-model="startDate" type="date" ></md-input> -->
              </md-field>
              <div class="error" v-if="!$v.startDate.required && isPosted">  Start Date is required </div>
              <div class="error" v-else-if="!$v.startDate.minValue && isPosted">  Start Date must after today date </div>
              <!-- <div class="error" v-else>  </div> -->
            </b-field>
            <!-- <b-field></b-field> -->
            <b-field
              label="End Date:"
              style="display:inline-block; float:right; width:47%"
            >
              <md-field>
                <md-datepicker v-model="endDate" md-immediately />
              </md-field>
              <div class="error" v-if="!$v.endDate.required && isPosted">  End Date is required </div>
              <!-- <div class="error" v-else-if="!$v.endDate.minValue && isPosted">  End Date must after start date </div> -->
            </b-field>
          </div>
          <b-field label="Reasons:">
            <md-field>
              <md-textarea v-model="reason" type="textbox"></md-textarea>
            </md-field>
          </b-field>
              <div class="error" v-if="!$v.reason.required && isPosted" style="margin-top:-2em">  Reason is required </div>
          <b-field label="Emergency Contact Number:">
            <md-field>
              <md-input v-model="emergency_contact" type="number"></md-input>
            </md-field>
          </b-field>
              <div class="error" v-if="!$v.emergency_contact.required && isPosted" style="margin-top:-2em">  Emergency Contact is required </div>
          <b-field label="Replacement:">
            <md-field>
              <md-input v-model="replacement"></md-input>
            </md-field>
          </b-field>
          {{ user }}
          <md-button
            class="md-raised md-success"
            @click="add_leave()"
            style="float:right"
            >Apply</md-button
          >
          {{ endDate }}
          {{ t4 }}
          {{ error }}
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import leave from "@/js/leave.js"; //directory to leave.js
import leaveClass from "@/js/class/leave_class.js"; //directory to leave_class.js
import { required, minLength, sameAs, minValue } from "vuelidate/lib/validators";
export default {
  name: "edit-profile-form",
  data() {
    return {
      leaveObj: new leaveClass(),
      isLoading: false,
      error: "",
      is_admin: null,
      name: "null",
      startDate: new Date(),
      endDate: null,
      reason: null,
      emergency_contact: null,
      replacement: null,
      isPosted: false,
      disabled: {
        from: new Date()
      },
      isDateDisabled2: function() {
        var today = new Date();
        // compare if today is greater then the datepickers date
        return new Date() > today;
      }
    };
  },
  validations: {
    startDate: {
      required,
      minValue: value => value > new Date()
    },
    endDate: {
      required,
      minValue: value => value > this.startDate
    },
    reason: {
      required
    },
    emergency_contact: {
      required
    }
  },
  mounted() {
    if (localStorage.is_admin) {
      this.is_admin = localStorage.is_admin;
    }
  },
  methods: {
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000);
    },

    async add_leave() {
      this.isPosted = true;
        if (!this.$v.$invalid){
          try {
        this.isLoading = true;
        // To calculate the time difference of two dates
        var Difference_In_Time =
          this.endDate.getTime() - this.startDate.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (this.startDate >= new Date()) {
          if (
            this.startDate &&
            this.endDate &&
            this.reason &&
            Difference_In_Days > 0
          ) {
            this.mapObj();
            const leave_data = await leave.add_leave(this.leaveObj);
            // alert(leave_data); //can be ignored
            console.log(this.admin);
            this.isLoading = false;
            localStorage.message = "Leave Application Submitted";
            this.$router.push({ path: `/message/${this.id}` });
          } else if (Difference_In_Days < 0) {
            alert("End Date must after Start Date");
            this.isLoading = false;
          } else {
            alert("All fields are Mandatory");
            this.isLoading = false;
          }
        } else {
          alert("Start date must be later than today");
          this.isLoading = false;
        }

        //add redirect to other page here
        // alert("Success");
      } catch (err) {
        this.error = err.message;
        alert("Fail");
      }
        }
      
    },
    mapObj() {
      this.leaveObj.date_from = this.startDate;
      this.leaveObj.date_to = this.endDate;
      this.leaveObj.reason = this.reason;
      this.leaveObj.emergency_contact = this.emergency_contact;
      this.leaveObj.replace_id = this.replacement;
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
.error {
  color: red;
  margin-top: -2em;
  font-weight: 600;
  align-content: center;
  margin-left: 1em;
}
</style>

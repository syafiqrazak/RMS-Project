<template>
  <div class="container">
    <form>
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Leave Application {{ $route.params.nama }}</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <b-field
              label="Start Date:"
              style="display:inline-block; float:left; width:47%"
            >
              <md-field>
                <md-datepicker v-model="leave.startDate" />
                <!-- <md-input v-model="leave.startDate" type="date" ></md-input> -->
              </md-field>
            </b-field>
            <!-- <b-field></b-field> -->
            <b-field
              label="End Date:"
              style="display:inline-block; float:right; width:47%"
            >
              <md-field>
                <md-datepicker v-model="leave.endDate" />
                <!-- <md-input v-model="leave.endDate" type="date" ></md-input> -->
              </md-field>
            </b-field>
          </div>
          <b-field label="Reasons:">
            <md-field>
              <md-textarea v-model="leave.reason" type="textbox"></md-textarea>
            </md-field>
          </b-field>
          {{ user }}
          <md-button
            class="md-raised md-success"
            @click.prevent="add_leave()"
            style="float:right"
            >Apply</md-button
          >
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import leave from "@/js/leave.js"; //directory to leave.js
export default {
  name: "edit-profile-form",
  data() {
    return {
      error: "",
      name: "null",
      leave: {
        startDate: null,
        endDate: null,
        reason: null
      }
    };
  },
  async created() {},
  methods: {
    async add_leave() {

      try {
        const leave_data = await leave.add_leave(
          this.leave.startDate,
          this.leave.endDate,
          this.leave.reason,
          this.$router.push({ path: "/leaveSubmitSuccess" }) //add redirect to other page here

        );
        alert(leave_data); //can be ignored
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
</style>

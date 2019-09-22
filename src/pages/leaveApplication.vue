<template>
  <div class ="container">
    <form>
      <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Leave Application</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content>
        <b-field label="Start Date:">
            <md-field>
              <md-input v-model="user.startDate" type="date" ></md-input>
            </md-field>
        </b-field>
        <b-field label="End Date:">
            <md-field>
              <md-input v-model="user.endDate" type="date" ></md-input>
            </md-field>
        </b-field>
        <b-field label="Reasons:">
            <md-field>
              <md-input v-model="user.reason" type="textbox"  ></md-input>
            </md-field>
        </b-field>
        {{user}}
      </md-card-content>
      
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "edit-profile-form",
  data() {
    return {
        user:{
            startDate:null,
            endDate:null,
            reason:null
        },
    };
  },
   methods:{
    }
}
</script>

<style scoped>
  .md-card {
      display: inline-block;
      position: relative;
      /* width: 390%; */
      width :1000px;
      margin: 25px 0;
      overflow: unset;
      -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
      border-radius: 3px;
      color: rgba(0,0,0, 0.87);
      background: #fff;
  }
</style>



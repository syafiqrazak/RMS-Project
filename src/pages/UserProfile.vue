<template>
  <div class="container">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Users Profile</h4>
        <!-- <p class="category">Complete your profile</p> -->
      </md-card-header>
      <md-card-content v-if="!isEdit">
        {{users}}
            {{error}}
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="true"
        ></b-loading>
        <md-table md-card striped>
      <!-- <md-table-toolbar>
        <h1 class="md-title"></h1>
      </md-table-toolbar> -->

      <md-table-row>
        <md-table-head width="15%">Username</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.username}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Designation</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.acct_t">Account Department</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.t1">User T1 </md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.t2">User T2 </md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.t3">User T3 </md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.t4">User T4 </md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff" v-if="users.is_admin">System Admin </md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">First Name</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.firstname}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Last Name</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.lastname}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Branch</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.branch.cd}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Department</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.department.cd}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Email</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.email}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Contact Number</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.contact_no}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%">Address</md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.address_1}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%"></md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.address_2}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%"></md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.address_3}}</md-table-head>
      </md-table-row>
      
      <md-table-row>
        <md-table-head width="15%"></md-table-head>
        <md-table-head width="70%"  style="background-color:#8af4ff">{{users.address_4}}</md-table-head>
      </md-table-row>

    </md-table>
    <md-card-actions md-alignment="right">
          <b-button  type="is-danger"  @click.prevent="deleteUser()" style="margin-right:1em" >Delete</b-button>
          <b-button  type="is-warning"  @click.prevent="isEdit = true">Edit</b-button>
      </md-card-actions>
        
      </md-card-content>
      <md-card-content v-if="isEdit" style="width:98%; padding-left:5%;">
                <br><br>
                <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            <h4>First Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.firstname" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Last Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.lastname" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.email" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.username" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Role:</h4>
                        </td>
                        <td class="clsValue">
                            <!-- <b-field type="is-danger"> -->
                            <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:8.5em; width:98%; verticle-align:middle;">
                                    <!-- <label>Role</label><p>&nbsp</p> -->
                                    <md-radio v-model="tier" value="usert1" class="md-primary">User Tier 1</md-radio>
                                    <md-radio v-model="tier" value="usert2" class="md-primary">User Tier 2</md-radio>
                                    <md-radio v-model="tier" value="usert3" class="md-primary">User Tier 3</md-radio>
                                    <md-radio v-model="tier" value="usert4" class="md-primary">User Tier 4</md-radio>
                                    <md-radio v-model="tier" value="acct_t" class="md-primary">Accountant Tier</md-radio>
                                    <md-radio v-model="tier" value="is_admin" class="md-primary">Admin</md-radio>
                            </div>
                            <!-- </b-field> -->
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Branch:</h4>
                        </td>
                        <td class="clsValue">
                            <b-select v-model="branch" expanded="" style="width:98%;">
                                <option value= "DJSB"> DJSB</option>
                            </b-select>
                        </td>
                    </tr>
                    <tr v-if="tier != 'usert4'">
                        <td class="clsLabel">
                            <h4>Department:</h4>
                        </td>
                        <td class="clsValue">
                            <b-select v-model="department" expanded="" style="width:98%;">
                                <option value= "MAR"> Marine</option>
                                <option value="CCT">Commercial and Contract </option>
                                <option value="ACCT">Account</option>
                                <option value="ADM">Admin</option>
                                <option value="TGD">Trading</option>
                            </b-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Home Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.address_1" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.address_2" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.address_3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="users.address_4" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Contact Number:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input v-model="users.contact_no" style="width:98%" ></b-input>
                            </b-field>
                        </td>
                    </tr>
                </table>
                <br><br>
                <md-card-actions md-alignment="center">
                            <md-button
                                class="md-raised md-success"
                                @click="update()" style=" margin-left:40%; "
                                >Update</md-button  >
                            <md-button
                                class="md-raised md-accent"
                                @click="isEdit = false" style=" margin-right:40%; "
                                >Back</md-button  >
                  </md-card-actions>
            </md-card-content>
    </md-card>
  </div>
</template>

<script>
import admin from "@/js/admin.js"; //directory to leave.js
import userClass from "@/js/class/user_class.js"; //directory to user_class.js
export default {
  name: "notify-leave",
  data() {
    return {
      tier:'',
      department: '',
      branch: '',
      isEdit: false,
      userObj: new userClass(),
      users: [],
      error: "",
      isLoading: false,
      id: localStorage.id,
      isEmpty: false,
      dataBackgroundColor: "blue",
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.userObj.id = this.$route.params.user_id;
      // alert(this.userObj.id);
      const data = await admin.get_user(this.userObj.toJson());
      console.log("Users:");
      this.users = data;
      // this.users = data.map(users => ({
      //     ...users
      // }))
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = err.message;
      alert(err);
    }
  },
  methods: {
    detail(value) {
      console.log(value.id);
      this.$router.push({
        path: `/userProfile/${this.id}`
      });
    },
    async deleteUser(){
      try {
      this.isLoading = true;
      this.userObj.id = this.$route.params.user_id;
      // alert(this.userObj.id);
      const data = await admin.del_user(this.userObj.toJson());
      console.log("Deleting User:");
      localStorage.message = "User Profile Deleted";
      this.isLoading =  false;
      this.$router.push({ path: `/message/${this.id}` });
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = err.message;
      alert(err);
    }
    },
    mapObj(){
      this.userObj.id = this.$route.params.user_id;
      this.userObj.firstname = this.users.firstname;
      this.userObj.lastname = this.users.lastname;
      this.userObj.username = this.users.username;
      this.userObj.email = this.users.email;
      this.userObj.contact_no = this.users.contact_no;
      this.userObj.address_1 = this.users.address_1;
      this.userObj.address_2 = this.users.address_2;
      this.userObj.address_3 = this.users.address_3;
      this.userObj.address_4 = this.users.address_4;
      this.userObj.department = this.department;
      this.userObj.branch = this.branch;
      // reset designation values to false
      this.userObj.t1 = false;
      this.userObj.t2 = false;
      this.userObj.t3 = false;
      this.userObj.t4 = false;
      this.userObj.acct_t = false;
      this.userObj.is_admin = false;
      
        if(this.tier == "usert1")
            this.userObj.t1 = true;
        else if(this.tier == "usert2")
            this.userObj.t2 = true;
        else if(this.tier == "usert4")
            this.userObj.t4 = true;
        else if(this.tier == "usert3")
            this.userObj.t3 = true;
        else if(this.tier == "acct_t")
            this.userObj.acct_t = true;
        else
            this.userObj.is_admin = true;
    },
    async update() {
      alert("Updating");
      this.userObj.id = this.$route.params.user_id;
      this.mapObj();
      // this.userObj = this.users;
        console.log(this.userObj);
        try {
            this.isLoading =  true;
            // const users = await admin.user_upd(this.userObj.toJson());
            const users = await admin.admin_upd(this.userObj.toJson());
            console.log(users); //can be ignored
            this.posted = true;
            localStorage.message = "User Profile Updated";
            this.isLoading =  false;
            this.$router.push({ path: `/message/${this.id}` });
            //add redirect to other page here
        } catch (err) {
            this.isLoading =  false;
            alert(err);
            this.error = err.message;
        }
    },
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000);
    }
  }
};
</script>

<style scoped src="@/assets/style/style.css">

</style>

<template>
    <div v-if="!posted"  id="container">
        <md-card style="padding-left:10px">
            <md-card-header :data-background-color="dataBackgroundColor">
                <h4 class="title">Register</h4>
                <!-- <p class="category">Complete your profile</p> -->
            </md-card-header>
            <md-card-content style="width:98%; padding-left:5%;">
                <br><br>
                <table cls="clsForm" width="80%:">
                    <col width="25%">
                    <col width="70%">
                    <tr>
                        <td class="clsLabel">
                            <h4>First Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.firstname" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Last Name:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.lastname" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.email" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.username" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Department:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.department" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Home Address:</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.address_1" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.address_2" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.address_3" style="width:98%"></b-input>
                        </td>
                    </tr>
                     <tr>
                        <td class="clsLabel">
                            <!-- <h4>Home Address:</h4> -->
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userObj.address_4" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Contact Number:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="userObj.contact_no" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="userObj.password" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Confirm Password:</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="userObj.confirmPassword" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Role:</h4>
                        </td>
                        <td class="clsValue">
                            <!-- <b-field type="is-danger"> -->
                            <div class="block" style="border: 1px solid #dbdbdb; border-radius:4px; padding-left:1em; height:3.5em; width:98%; verticle-align:middle;">
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
                </table>
                {{userObj.password}}
                <br><br>
                <md-button
                    class="md-raised md-success"
                    @click="new_user()" style=" margin:auto; display:block;"
                    >Submit</md-button  >
            </md-card-content>
        <br><br>
        </md-card>
    </div>
    <div v-else>
        <h5>Success</h5>
        {{posted}}
    </div>
</template>


<script>
import admin from "@/js/admin.js"; //directory to admin.js
import userClass from "@/js/class/user_class.js"; //directory to admin.js
export default {
    name: "edit-profile-form",
  data() {
    return {
    //     firstName: '',
    //     lastName:'',
    //     userName: '',
    //     email:'',
        tier:'',
    //     home_address1:'',
    //     home_address2:'',
    //     home_address3:'',
    //     home_address4:'',
    //     department:'',
    //     contact_number:'',
    //     password:'',
    //     confirmPassword:'',
    //     role:'',
    //     t1: false,
    //     t2: false,
    //     t3: false,
    //     t4: false,
    //     is_admin: false,
        // posted: false,
      userObj: new userClass(),
      posted: false,
    };
  },
  methods: {
    async new_user() {
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

        alert(this.userObj.email);
        alert(this.userObj.t1);
        console.log(this.userObj.toJson());
        // if(this.register.userName && this.register.password)
        try {
            // this.userObj.
            // var temp = this.register.toJson();
            // temp = toJson(this.register);
            const users = await admin.new_user(this.userObj.toJson());
            console.log(users); //can be ignored
            this.posted = true;
            localStorage.message = "New User Created";
            this.$router.push({ path: `/message/${this.id}` });
            //add redirect to other page here
        } catch (err) {
            alert(err);
            this.error = err.message;
        }
    }
  }
    
}
</script>



<style scoped src="@/assets/style/style.css">

</style>

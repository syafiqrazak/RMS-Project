<template>
    <div v-if="!posted" class="content">
        <md-card style="padding-left:10px">
            <md-card-header :data-background-color="dataBackgroundColor">
                <h1 class="title">Reset Password</h1>
                <!-- <p class="category">Complete your profile</p> -->
            </md-card-header>
            <md-card-content style="width:98%; padding-left:3%;">
                <br><br>
                <table cls="clsForm" width="80%:" border="0">
                    <col width="25%">
                    <col width="70%">
                    
                    <tr>
                        <td class="clsLabel">
                            Password:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="password"  style="width:70%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            Confirm Password:
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" v-model="confirmPassword" style="width:70%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    
                </table>
                <br><br>
                <md-button
                    class="md-raised md-success"
                    @click="resetPassword()" style=" margin:auto; display:block;"
                    >Submit</md-button  >
            </md-card-content>
        <br><br>
        </md-card>
    </div>
    <div v-else>
        <h1>Success</h1>
    </div>

</template>

<script>
import admin from "@/js/admin.js"; //directory to admin.js
export default {
    data(){
        return{
        password: '',
        confirmPassword: '',
        posted:false,
        dataBackgroundColor: "blue"
        };
    },
    methods: {
        async resetPassword(){
            alert("Test");
            if(this.password == this.confirmPassword){
                alert("test qq");
                // try {
                //     alert("1232");
                //     const data = await admin.get_user(localStorage.id);
                //     alert("Test 1");
                //     console.log(data);
                //     // const user = data.result[0]
                //     //     this.total_page = data.result[1]
                //     //     this.pos = pos1.map(pos => ({
                //     //         ...pos
                //     //     }))
                    
                // }
                //     catch{
                //         alert(err);
                //         this.error = err.message;
                //     }

                try {
                    const users = await admin.reset_password(localStorage.id, this.password);
                    console.log(users); //can be ignored
                    this.posted = true;
                    alert("Success");
                    //add redirect to other page here
                } catch (err) {
                    alert(err);
                    this.error = err.message;
                }
            }
            else{
                alert("Error: Password not identical!")
            }
            
        }
    }
}
</script>

<style scoped src="@/assets/style/style.css">

</style>
<template>
    <div id="container">
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
                            <h4>First Name</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="firstName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Last Name</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="lastName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Email Address</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="email" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Username</h4>
                        </td>
                        <td class="clsValue">
                            <b-input v-model="userName" style="width:98%"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Password</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="password" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="clsLabel">
                            <h4>Confirm Password</h4>
                        </td>
                        <td class="clsValue">
                            <b-field>
                                <b-input type="ConfirmPassword" style="width:98%"  password-reveal></b-input>
                            </b-field>
                        </td>
                    </tr>
                </table>
            </md-card-content>
        <br><br>
        </md-card>
    </div>
</template>

<style scoped>
.clsLabel{
    background-color: #2bd5ff;
    color: #ffffff;
    height: 65px;
    vertical-align: middle;
    padding-left: 1em;
    font-weight: 700;
    font-size: 150%;
    border-right:5px solid #ffffff;
    border-bottom: 20px solid #ffffff;
    border-radius: 10px;
}
.clsLabel h4{
    font-weight: 500;

}
.clsValue{
    background-color: #f3f3f3;
    /* background-color: #ffffff; */
    color: black;
    height: 20px;
    vertical-align: middle;
    padding-left: 1%;
    font-weight: 400;
    border-bottom: 20px solid #ffffff;
    /* border: 5px solid red; */
    border-radius: 10px;
}
.clsForm{
    border-radius: 30px;
    border: 1px solid #ffffff;
}
</style>>

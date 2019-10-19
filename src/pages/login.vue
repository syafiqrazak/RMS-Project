<template>
  <!-- Material form login -->

  <div class="background">
    <md-card>
      <div
        v-show="isShow"
        class="alert alert-danger"
        style="display:inline-block; margin-left: 15%; margin-top: 5%;  width: 70%"
      >
        <span><b>Warning: </b>{{ error }}</span>
      </div>
      <form>
        <b-field label="Username:">
          <md-field>
            <md-input v-model="name"></md-input>
          </md-field>
        </b-field>
        <b-field label="Password:">
          <md-field>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
        </b-field>
        <br />
        <md-button
          class="md-raised md-success"
          @click="login()"
          style="float:right"
          >Submit</md-button
        >

        {{ password }}
        {{ name }}
        {{ error }}
      </form>
    </md-card>
  </div>
</template>

<script>
// import router from "@/routes/routes.js"
import user from "@/js/user.js"; //directory to user.js

export default {
  data() {
    return {
      // nama: null,
      isShow: false,
      name: null,
      password: null,
      error: ""
    };
  },
  async created() {},
  methods: {
    // navigate() {
    //     console.log(this.data.name);
    //     // this.$router.router.push({ path: `/leaveApplication/${this.nama}` });
    //     this.$router.push({path: `/leaveApplication/${this.nama}`});
    // }
    async login() {
      try {
        const login = await user.login(this.name, this.password);

        if (await login.hasOwnProperty("err")) {
          console.log("wrong");
          this.error = login.err;
        } else if (await login.hasOwnProperty("id")) {
          this.error = "Work";
          console.log("Work");
          this.$router.push({ path: `/leaveApplication/${login.id}` });
        }
        console.log(login); //can be ignored
      } catch (err) {
        // document.getElementsByClassName("alert alert-danger").style.display = 'block';
        // var x = document.getElementsByClassName("alert alert-danger");
        // x[0].style.visibility = 'visible';
        aler("Enter error");
        this.isShow = true;
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
form {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.md-card {
  background-color: #07b5e6;
  margin: auto;
  /* margin-top: 10%; */
  margin-bottom: 10%;
  margin-left: 25%;
  margin-right: 25%;
  width: 40%;
  height: 80vh;
  border: 1px;
  border-radius: 16px;
}
.background {
  width: 200vh;
  height: 100vh;
  background-color: #1dd1ad;
}
</style>

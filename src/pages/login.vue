<template>
  <!-- Material form login -->
  <div class="background">
    <div class="container">
    <form>
        <p>Name: </p>
        <md-input v-model="data.name"></md-input>
        <p>Password: </p>
        <md-input v-model="data.password"></md-input>
        <br>
        <md-button class="md-raised md-success"  @click="navigate()" style="float:right" >Submit</md-button>
        
        {{data}}
    </form>
    <!-- <h1>Testign</h1> -->

    </div>
  </div>

  <!-- Material form login -->
</template>

<script>

// import router from "@/routes/routes.js"
export default {
    data(){
        return{
            data: 
                {
                name: null,
                password: null,
                },
        };
    },
    methods: {
            navigate() {
                console.log(this.data.name);
                this.$router.push({ path: "/leaveApplication" });
            }
        }
    
}
</script>

<style scoped>
    form{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .container{
        background-color:#07b5e6;
        margin: auto;
        /* margin-top: 10%; */
        margin-bottom: 10%;
        width: 40%;
        height: 80vh;
        border: 1px;
        border-radius: 16px;
    }
    .background{
        width: 200vh;
        height: 100vh;
        background-color:#1dd1ad
    }

</style>
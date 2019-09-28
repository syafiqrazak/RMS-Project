<template>
  <!-- Material form login -->
  <div class="container">
  <form>
      <p>Name: </p>
      <md-input v-model="data.name"></md-input>
      <p>Password: </p>
      <md-input v-model="data.password"></md-input>
      <md-button class="md-raised md-success"  @click="navigate()" style="float:right" >Submit</md-button>
      
    {{data}}
  </form>
  <!-- <h1>Testign</h1> -->

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

</style>
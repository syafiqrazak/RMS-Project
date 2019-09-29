<template>
  <!-- Material form login -->
  <div class="background">
    <!-- <div class="container"> -->
    <md-card>
    <form>
        <b-field label="Username:">
            <md-field>
              <md-input v-model="nama"  ></md-input>
            </md-field>
        </b-field>
        <b-field label="Password:">
            <md-field>
              <md-input v-model="data.password" type="password" ></md-input>
            </md-field>
        </b-field>
        <br>
        <md-button class="md-raised md-success"  @click="navigate()" style="float:right" >Submit</md-button>
        
        {{data}}
        {{nama}}
    </form>
    </md-card>
    <!-- <h1>Testign</h1> -->

    </div>
  <!-- </div> -->

  <!-- Material form login -->
</template>

<script>

// import router from "@/routes/routes.js"
export default {
    data(){
        return{
            nama: null,
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
                // this.$router.router.push({ path: `/leaveApplication/${this.nama}` });
                this.$router.push({path: `/leaveApplication/${this.nama}`});
            }
        },
    
}
</script>

<style scoped>
    form{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .md-card{
        background-color:#07b5e6;
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
    .background{
        width: 200vh;
        height: 100vh;
        background-color:#1dd1ad
    }

</style>
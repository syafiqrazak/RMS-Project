<template>
  <!-- Material form login -->
  <form>
      <p>Name: </p>
      <md-input v-model="name"></md-input>
      <p>Password: </p>
      <md-input v-model="password"></md-input>
      <md-button
                class="md-raised md-success"
                @click.prevent="save()"
                style="float:right"
              >Submit</md-button>
  </form>

  <!-- Material form login -->
</template>

<script>
export default {
    data(){
        return{
            name: null,
            password: null
        };
    }
    
}
</script>

<style scoped>

</style>
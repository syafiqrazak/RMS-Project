<template>
    <div class="container" border="3px" height="5000px">  
        <md-card>
            <md-card-header :data-background-color="dataBackgroundColor">
          <h4 class="title">Leave Application Details</h4>
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <md-card-content>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4><strong> Start Date:</strong> 12/3/2019</h4>
            </div>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4><strong> End Date:</strong> 12/3/2019</h4>
            </div>
            <div class="alert alert-info" style="background-color:white; color:black;" centered>
                <h4>Reasons:</h4>
                <h4>12/3/2019</h4>
            </div>
            <div  style=" margin-left: 42%; margin-right: 42%;">
                <b-button style="float:left;" type="is-success" @click.prevent="approve()">Approve</b-button>
                <b-button style="float:right;" type="is-danger">Decline</b-button>
                {{error}}
             </div>
             <br><br>
        </md-card-content>
        </md-card>
    </div>
</template>
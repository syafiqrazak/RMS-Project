<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <!-- <h3 class="md-title">{{ $route.name }}</h3> -->
      </div>
      <div class="md-toolbar-section-end">
        <!-- <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button> -->

        <!-- <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div> -->
          <md-list>
            <!-- <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item> -->

            <!-- <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                  <li><a href="#">You're now friend with Andrew</a></li>
                  <li><a href="#">Another Notification</a></li>
                  <li><a href="#">Another One</a></li>
                </ul>
              </drop-down>
            </md-list-item> -->

            <!-- <li class="md-list-item">
              <a
                href="#/notifications"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li> -->

            <!-- <md-list-item href="#/user"> -->
            <md-list-item @click="test()">
              <i class="material-icons">person</i> 
              <p style="padding-top:10px; color:#07a8e3;"> Hi, {{staffName}}</p>
            </md-list-item>
            <md-list-item @click="logout()">
              <i class="fas fa-power-off"></i>
              <p style="padding:5px 10px; color:#07a8e3;"> Logout</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
  </md-toolbar>
</template>

<script>
import user from "@/js/user.js"; //directory to user.js
export default {
  data() {
    return {
      selectedEmployee: null,
      staffName: localStorage.staffName,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    test(){
      alert("HI "+ this.staffName);
    },
    async logout() {
            try {
                const logout = await user.logout();
                // console.log(logout); //can be ignored
                var scripts =  document.getElementsByTagName('script');
                var torefreshs = ['myscript.js', 'myscript2.js'] ; // list of js to be refresh
                var key = 1; // change this key every time you want force a refresh
                for(var i=0;i<scripts.length;i++){ 
                  for(var j=0;j<torefreshs;j++){ 
                      if(scripts[i].src && (scripts[i].src.indexOf(torefreshs[j]) > -1)){
                        new_src = scripts[i].src.replace(torefreshs[j],torefreshs[j] + 'k=' + key );
                        scripts[i].src = new_src; // change src in order to refresh js
                      } 
                  }
                }
                if(logout){
                  console.log("Logout success");
                  this.$router.push({ path: '/login' })    //add redirect to other page here
                }
                else
                  alert("Logout Fail");
            } catch (err) {
                this.error = err.message;
            }
        
        }
  }
};
</script>

<style lang="css"></style>

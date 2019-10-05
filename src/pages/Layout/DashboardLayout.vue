<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link :to="{ name: 'Leave Application', params: { id: this.id } }">
        <md-icon>thumb_up</md-icon>
        <p>Leave Application</p>
      </sidebar-link>
        <sidebar-link :to="{ name: 'Purchase Order', params: { id: this.id } }">
        <md-icon>dashboard</md-icon>
        <p>Purchase Order</p>
      </sidebar-link>
        <sidebar-link :to="{ name: 'PSR', params: { id: this.id } }">
        <md-icon>thumb_up</md-icon>
        <p>PSR</p>
      </sidebar-link>
        <sidebar-link :to="{ name: 'Notification', params: { id: this.id } }">
        <md-icon>thumb_up</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <!-- <sidebar-link to="/stepForm">
        <md-icon>dashboard</md-icon>
        <p>2 Steps Form</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/dynamicForm">
        <md-icon>dashboard</md-icon>
        <p>Dynamic Form</p>
      </sidebar-link> -->
        <sidebar-link :to="{ name: 'Dashboard', params: { id: this.id } }">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
        <sidebar-link :to="{ name: 'Icons', params: { id: this.id } }">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  data(){
        return{
            id : this.$route.params.id
        };
    },
    // created() {
    //         this.id = this.$route.params.id;
    //     },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>

<template>
  <div>
    <v-app id="inspire" transition="slide-x-transition" v-if="loggedUser.logged">
      <drawer-menu></drawer-menu>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
    <v-app v-else>
      <login />
    </v-app>
  </div>
</template>
<script>
import Login from "./views/Login.vue";
import DrawerMenu from "@/components/DrawerMenu";
export default {
  components: {
    Login,
    DrawerMenu,
  },
  methods: {
    async logout() {
      this.$store.dispatch("logoffUser");
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getLoggedUser;
    },
  },
  created() {
    window.getApp = this;
  },
};
</script>

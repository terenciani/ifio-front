<template>
  <div>
    <v-app v-if="loggedUser">
      <router-view></router-view>
    </v-app>
    <v-app id="inspire" transition="slide-x-transition" v-else-if="!loggedUser">
      <drawer-menu></drawer-menu>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import DrawerMenu from "@/components/DrawerMenu";
export default {
  components: {
    DrawerMenu,
  },
  methods: {
    async logout() {
      this.$store.dispatch("logoffUser");
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getStateLog;
    },
  },
  async beforeMount() {
    await this.$store.dispatch("loadLoggedUser");
  },
  created() {
    window.getApp = this;
  },
};
</script>

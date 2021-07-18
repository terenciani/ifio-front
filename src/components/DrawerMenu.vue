<template>
  <div>
    <v-app-bar color="teal accent-4" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-list color="transparent" class="d-none d-sm-flex">
        <v-menu offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon>
                <v-icon large>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list dense>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list class="text-xs-center" dense>
        <v-img
          :src="`${host}/assets/icon/logo`"
          style="width: 50%; margin: 0 auto"
          alt="Logo"
        />
        <v-divider />
        <template v-for="item in items">
          <v-list-item
            v-if="!item.heading"
            :key="item.text"
            :to="item.to"
            @click="toolbarTitle = item.text"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
          <v-list-group
            :key="item.text"
            v-else
            :value="false"
            :prepend-icon="item.icon"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="child in item.children"
              :key="child.text"
              :to="child.to"
              @click="toolbarTitle = child.text"
              class="ml-5"
            >
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <div class="pa-2">
        <v-menu offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn block outlined v-bind="attrs" v-on="on">
              <v-icon left dark> mdi-logout </v-icon>
              Sair
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import DrawerItems from "../data/DrawerItems";
import config from "../../config";
import AuthService from "../service/AuthService";
export default {
  data() {
    return {
      toolbarTitle: "",
      user: {},
      host: config.apiHost,
      drawer: true,
      group: null,
      items: [],
    };
  },
  methods: {
    logout() {
      // AuthService.removeUserFromLocalStorage();
      this.$store.dispatch("logoffUser");
      // this.$router.push('/login');
    },
  },
  async mounted() {
    this.user = AuthService.getLoggedUser();
    this.items = await DrawerItems.getItems();
  },
};
</script>

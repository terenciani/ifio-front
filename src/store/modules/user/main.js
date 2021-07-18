"use strict";

import AuthService from "./../../../service/AuthService";
import API from "../../../Api";
//import Store from "../../../store";
import Router from "../../../router";
export default {
  state: {
    user: {
      id_user: "",
      logged: null,
      name: "",
      role: "",
      email: "",
      token: "",
      status: "",
    },
  },
  getters: {
    getStateLog: (state) => state.user.logged,
    getUserLogged: (state) => state.user,
  },
  mutations: {
    setLoggedUser(state, payload) {
      state.user.id_user = payload.id_user;
      state.user.logged = payload.id_user ? true : false;
      state.user.name = payload.name;
      state.user.role = payload.role;
      state.user.email = payload.email;
      state.user.token = payload.token;
      state.user.status = payload.status;
      API.defaults.headers["x-access-token"] = payload.token;
    },
    loggoutUser(state) {
      state.user.id_user = "";
      state.user.logged = null;
      state.user.name = "";
      state.user.role = "";
      state.user.email = "";
      state.user.token = "";
      state.user.status = "";
      API.defaults.headers["x-access-token"] = "";
    },
  },
  actions: {
    async loadLoggedUser() {
      /*try {
        let loggedUser = AuthService.getLoggedUser();
        const tokenIsValid = await AuthService.varefyIfTokenIsValid(
          loggedUser.token
        );
        if (tokenIsValid && loggedUser && loggedUser.id_user) {
          context.commit("setLoggedUser", loggedUser);
          if (
            loggedUser.status ===
            Store.getters["apiHelper/userHelpers"].status.update
          )
            Router.push("/profile");
          else Router.push("/");
        } else {
          context.dispatch("logoffUser");
        }
      } catch (error) {
        console.log(error);
      }*/
    },
    logoffUser(context) {
      try {
        AuthService.removeUserFromLocalStorage();
        context.commit("loggoutUser");
      } catch (error) {
        console.log(error);
      } finally {
        Router.push("/login");
      }
    },
  },
};

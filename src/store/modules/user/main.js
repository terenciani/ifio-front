"use strict";

import AuthService from "./../../../service/AuthService";
import API from "../../../Api";
//import Store from "../../../store";
import Router from "../../../router";
export default {
  state: {
    user: {
      _id: "",
      logged: null,
      name: "",
      rule: "",
      email: "",
      token: "",
      status: "",
    },
  },
  getters: {
    getStateLog: (state) => state.user.logged,
    getLoggedUser: (state) => state.user,
  },
  mutations: {
    setLoggedUser(state, payload) {
      state.user._id = payload._id;
      state.user.logged = payload._id ? true : false;
      state.user.name = payload.name;
      state.user.rule = payload.rule;
      state.user.email = payload.email;
      state.user.token = payload.token;
      state.user.status = payload.status;
      API.defaults.headers["x-access-token"] = payload.token;
    },
    loggoutUser(state) {
      state.user._id = "";
      state.user.logged = null;
      state.user.name = "";
      state.user.rule = "";
      state.user.email = "";
      state.user.token = "";
      state.user.status = "";
      API.defaults.headers["x-access-token"] = "";
    },
  },
  actions: {
    async loggedUser(context, loggedUser) {
      try {
        const tokenIsValid = await AuthService.varefyIfTokenIsValid(
          loggedUser.token
        );
        if (tokenIsValid && loggedUser?._id) {
          context.commit("setLoggedUser", loggedUser);
          Router.push("/");
        } else {
          context.commit("loggoutUser");
        }
      } catch (error) {
        context.commit("loggoutUser");
        throw error;
      }
    },
    logoffUser(context) {
      try {
        context.commit("loggoutUser");
      } catch (error) {
        console.log(error);
      } finally {
        Router.push("/login");
      }
    },
  },
};

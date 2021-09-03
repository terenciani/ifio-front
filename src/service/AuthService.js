"use strict";
var md5 = require("md5");
import API from "../Api";

export default class AuthService {
  static async signIn({ email, password }) {
    let passwordMd5 = md5(password);
    try {
      let response = await API.post("signin", {
        email: email.toLowerCase(),
        password: passwordMd5,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } // signIn()

  static async varefyIfTokenIsValid(token) {
    try {
      const res = await API.post("/validate-token", { token });
      return res.data.isValid;
    } catch (error) {
      throw error.response.data;
    }
  } //varefyIfTokenIsValid
} // class

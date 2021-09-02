<template>
  <v-row align="center" justify="center" class="font-weight-light">
    <v-col cols="12" sm="10" md="8">
      <v-card>
        <v-toolbar dark color="teal">
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-center d-block"
            >Acesso restrito</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="pa-5">
          <v-form ref="loginForm" v-model="loginValid">
            <v-text-field
              v-model="user.email"
              prepend-icon="mdi-email"
              label="E-mail"
              required
              :rules="emailRules"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              prepend-icon="mdi-lock"
              label="Senha"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-btn
              block
              large
              @click="signIn"
              color="primary"
              class="elevation-0 mt-5 font-weight-light text-uppercase"
              >ENTRAR</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog v-model="loadingDialog" hide-overlay persistent width="350">
      <v-card color="primary" dark>
        <v-card-text>
          <v-card-text>
            Aguarde! Sua solicitação está sendo enviada!</v-card-text
          >
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="response.active" :color="response.type">
      {{ response.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :class="response.type"
          text
          v-bind="attrs"
          @click="response.active = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import AuthService from "@/service/AuthService";
export default {
  data() {
    return {
      loginValid: true,
      recoveryValid: true,
      user: {},
      defaultRoute: "/",
      recoveryEmail: "",
      recoveryDialog: false,
      loadingDialog: false,
      response: {
        message: "",
        type: "success",
        active: false,
      },
      emailRules: [
        (v) => !!v || "O e-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "Informe um e-mail válido.",
      ],
      passwordRules: [(v) => !!v || "A senha é obrigatória"],
    };
  },

  methods: {
    recoveryCancel() {
      this.$refs.recoveryForm.reset();
      this.$refs.recoveryForm.resetValidation();
      this.recoveryDialog = false;
      this.recoveryEmail = "";
    },
    async recoverySubmit() {
      if (!this.$refs.recoveryForm.validate()) return;
      this.loadingDialog = true;
      try {
        let resp = await AuthService.recovery(this.recoveryEmail);
        this.response.message = resp.message;
        if (resp.status == 200) {
          this.response.type = "success";
          this.$refs.recoveryForm.resetValidation();
          this.$refs.recoveryForm.reset();
          this.recoveryDialog = false;
        } else {
          this.response.type = "warning";
        }
      } catch (error) {
        this.response.message =
          "Ocorreu um erro interno ao processar sua solicitação. Tente novamente mais tarde!";
        this.response.type = "error";
      } finally {
        this.loadingDialog = false;
        this.response.active = true;
      }
    },

    async signIn() {
      if (!this.$refs.loginForm.validate()) return;
      this.loadingDialog = true;
      try {
        let resp = await AuthService.signIn(this.user);
        this.response.message = resp.message;
        if (resp.status == 200 && resp.user && resp.user.id_user) {
          await AuthService.setUserInLocalStorage(resp.user);
          this.$store.dispatch("loadLoggedUser");
          this.response.type = "success";
          this.$refs.loginForm.resetValidation();
          this.$refs.loginForm.reset();
        } else this.response.type = "warning";
      } catch (error) {
        console.log(error);
        this.response.message =
          "Ocorreu um erro interno ao processar sua solicitação. Tente novamente mais tarde!";
        this.response.type = "error";
      } finally {
        this.loadingDialog = false;
        this.response.active = true;
      }
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.r)
      this.defaultRoute = this.$route.query.r;
  },
};
</script>

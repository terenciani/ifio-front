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
      user: {
        email: "terenciani@outlook.com",
        password: "12345",
      },
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
    async signIn() {
      if (!this.$refs.loginForm.validate()) return;
      this.loadingDialog = true;
      try {
        let userData = await AuthService.signIn(this.user);
        if (userData?._id) {
          await this.$store.dispatch("loggedUser", userData);
          this.showMessage("success", "Usuário Autorizado", true);
          this.$refs.loginForm.resetValidation();
          this.$refs.loginForm.reset();
        } else {
          this.showMessage(
            "error",
            "Não foi possível autenticar esse usuário",
            true
          );
        }
      } catch (error) {
        let type = error.statusCode == 500 ? "error" : "warning";
        this.showMessage(type, error.message, true);
      } finally {
        this.loadingDialog = false;
      }
    },
    showMessage(type, message, active) {
      this.response.type = type;
      this.response.message = message;
      this.response.active = active;
    },
  },
};
</script>

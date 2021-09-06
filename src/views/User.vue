<template>
  <v-container fill-height align-start>
    <v-col cols="12">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="users"
        :search="search"
        class="elevation-1"
        width="100%"
      >
        <template v-slot:top>
          <v-container>
            <v-row align="center" class="d-flex justify-space-between">
              <v-col
                cols="12"
                sm="6"
                md="3"
                class="d-flex align-content-center"
              >
                <h3>Gestão de Usuários</h3>
                <v-spacer></v-spacer>
                <v-divider
                  class="mx-4 d-none d-sm-flex"
                  inset
                  vertical
                ></v-divider>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  class="pt-0"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Procurar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col md="4" class="d-none d-md-flex">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  block
                  large
                  @click="openCreateDialog"
                >
                  Registrar Usuário
                  <v-icon class="pl-5" dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <v-btn
                v-show="$vuetify.breakpoint.smAndDown"
                fab
                dark
                fixed
                bottom
                x-large
                right
                @click="openCreateDialog"
                color="primary"
              >
                <v-icon>mdi-plus </v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </template>
        <template v-slot:[`item.create_at`]="{ item }">
          {{ utilFormatter.formatDateISOToBR(item.create_at) }}
        </template>
        <template v-slot:[`item.rule`]="{ item }">
          <v-chip
            class="ma-2"
            outlined
            :color="item.rule == 'ADMIN' ? 'primary' : 'default'"
          >
            {{ item.rule == "ADMIN" ? "Administrador" : "Cliente" }}
          </v-chip>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            class="ma-2"
            outlined
            :color="formatStatus(item.status).color"
          >
            {{ formatStatus(item.status).text }}
          </v-chip>
        </template>
        <template slot="footer" v-if="records > 0">
          <v-container>
            <strong> {{ footerText }} {{ records }} </strong>
          </v-container>
        </template>
        <template slot="no-data" v-else>
          <strong> {{ emptyRecordsText }} </strong>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="loading"
                title="Visualizar dados"
                icon
                large
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <strong>Nome: </strong> {{ item.name }} {{ item.lastname }}
                <br />
                <strong>E-mail:</strong> {{ item.email }} <br />
                <strong>Criado em:</strong>
                {{ utilFormatter.formatDateISOToBR(item.create_at) }}
                <br />
                <strong>Último acesso em:</strong>
                {{ utilFormatter.formatDateISOToBR(item.access_at) }}
              </v-card-text>
            </v-card>
          </v-menu>
          <v-btn
            :disabled="loading"
            @click="openEditDialog(item)"
            color="warning"
            title="Editar registro"
            icon
            large
          >
            <v-icon color="warning">mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            :disabled="loading"
            @click="openConfirmDialog(item)"
            color="error"
            title="Editar registro"
            icon
            large
          >
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialogForm"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        max-width="600px"
      >
        <v-card>
          <v-toolbar color="teal" dark>
            {{ user._id != "" ? "Editando" : "Novo" }} Usuário
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="init">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pb-0">
            <v-container class="pt-5">
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <v-text-field
                      label="Nome *"
                      v-model="user.name"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <v-text-field
                      label="Sobrenome *"
                      :rules="lastNameRules"
                      v-model="user.lastname"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <v-text-field
                      label="E-mail *"
                      :rules="emailRules"
                      v-model="user.email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <v-text-field
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      :rules="passwordRules"
                      hint="A senha deve ter no mínimo 8 characteres."
                      label="Senha de acesso *"
                      v-model="user.password"
                      required
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <v-text-field
                      :rules="confirmRules"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      label="Confirmação de Senha *"
                      v-model="user.confirmpass"
                      @click:append="show2 = !show2"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <strong>Permissão</strong>
                    <v-radio-group v-model="user.rule">
                      <v-radio label="Gestão" value="MANAGER"></v-radio>
                      <v-radio label="Servidor" value="SERVER"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    :class="$vuetify.breakpoint.xs ? 'py-2' : ''"
                  >
                    <strong>Situação Cadastral</strong>
                    <v-radio-group v-model="user.status">
                      <v-radio label="Ativo" value="Ativo"></v-radio>
                      <v-radio label="Inativo" value="Inativo"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions bottom>
            <v-container class="py-0 text-right">
              <v-btn @click="init" color="error" text> Cancelar </v-btn>
              <v-btn color="success lighten-1" text @click="save">
                Salvar
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog
        :show="dialogRemove"
        :message="`<span class='font-weight-bold'>${user.name} ${user.lastname}</span>
                (${user.email}) será removido e essa ação não poderá ser desfeita.`"
        @confirm="remove()"
        @cancel="
          dialogRemove = false;
          user = {};
        "
      >
      </confirm-dialog>
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
    </v-col>
  </v-container>
</template>

<script>
import UtilFormatter from "@/utils/UtilFormatter";
import UserService from "@/service/UserService";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  components: { ConfirmDialog },
  name: "Users",
  data() {
    return {
      dialogForm: false,
      dialogRemove: false,
      footerText: "Total de registros: ",
      headers: [
        {
          text: "Nome",
          align: "left",
          value: "name",
        },
        {
          text: "Sobrenome",
          align: "left",
          value: "lastname",
        },
        {
          text: "E-mail",
          align: "center",
          value: "email",
        },
        {
          text: "Criado em",
          align: "center",
          value: "create_at",
        },
        {
          text: "Situação",
          align: "center",
          value: "status",
        },
        {
          text: "Perfil",
          align: "center",
          value: "rule",
        },
        {
          text: "Ações",
          align: "center",
          value: "actions",
        },
      ],
      loading: false,
      emptyRecordsText: "Nenhum registro encontrado",
      records: 0,
      response: {
        message: "",
        type: "success",
        active: false,
      },
      search: "",
      user: {},
      users: [],
      show: false,
      show2: false,
      utilFormatter: UtilFormatter,
      valid: true,
      nameRules: [(v) => !!v || "O nome é obrigatório."],
      lastNameRules: [(v) => !!v || "O sobrenome é obrigatório."],
      emailRules: [
        (v) => !!v || "O e-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "Informe um e-mail válido.",
      ],
      phoneRules: [(v) => !!v || "O telefone é obrigatório."],
      passwordRules: [
        (v) => !!v || "A senha é obrigatória.",
        (v) =>
          (v && v.length >= 8) || "A senha deve ter no mínimo 8 characteres.",
      ],
      confirmRules: [
        (v) => !!v || "A confirmação de senha é obrigatória.",
        (v) => (v && v == this.user.password) || "As senhas não conferem.",
      ],
    };
  },
  methods: {
    openCreateDialog() {
      this.user = Object.assign({}, undefined);
      this.dialogForm = true;
    },
    openEditDialog(item) {
      this.user = Object.assign({}, item);
      this.dialogForm = true;
    },
    openConfirmDialog(item) {
      this.user = item;
      this.dialogRemove = true;
    },
    async remove() {
      this.loading = true;
      try {
        this.response.message = await UserService.remove(this.user);
        this.response.type = "success";
      } catch (error) {
        this.response.message = error;
        this.response.type = "error";
      } finally {
        this.init();
        this.response.active = true;
      }
    },
    async init() {
      this.loading = true;
      try {
        this.users = await UserService.getAll();
        this.user = {};
        this.dialogForm = false;
        this.calculateRecords();
        this.dialogRemove = false;
        this.response.active = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    calculateRecords() {
      let amount = 0;
      for (let i = 0; i < this.users.length; i++) {
        amount++;
      }
      this.records = amount;
    },
    async save() {
      if (!this.$refs.form.validate()) return;
      try {
        if (this.user._id) {
          this.response.message = await UserService.update(this.user);
          this.response.type = "success";
        } else {
          await UserService.save(this.user);
          this.response.message = "Usuário cadastrado com sucesso!";
          this.response.type = "success";
        }
      } catch (error) {
        this.response.message = error;
        this.response.type = "error";
      } finally {
        this.init();
        this.response.active = true;
      }
    }, // save()
    formatStatus(status) {
      const { users } = this.$store.getters["apiHelper/allHelpers"];
      switch (status) {
        case users.status.active:
          return { text: "Ativo", color: "primary" };
        case users.status.inactive:
          return { text: "Inativo", color: "red" };
        default:
          return { text: "ERRO", color: "red" };
      }
    },
  },
  created() {
    this.init();
  },
  watch: {
    dialogForm() {
      if (!this.user._id) this.$refs.form?.reset();
      this.$refs.form?.resetValidation();
    },
  },
};
</script>

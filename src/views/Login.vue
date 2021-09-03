<template>
  <v-container fluid fill-height class="bg-image flex-column flex-sm-row">
    <v-row>
      <v-col cols="12" sm="6" align="center" class="align-self-center">
        <v-img
          class="v-responsive"
          :src="$vuetify.breakpoint.xs ? logoHorizontal : logoVertical"
          :max-width="$vuetify.breakpoint.xs ? 350 : 200"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <form-login></form-login>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormLogin from "@/components/FormLogin";
export default {
  components: {
    FormLogin,
  },
  data() {
    return {
      logoHorizontal: require("@/assets/paranavai-horizontal.png"),
      logoVertical: require("@/assets/paranavai-vertical.png"),
    };
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("../assets/bg_main.png");
  background-position: center;
  background-size: cover;
}
</style>

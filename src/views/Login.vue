<template>
  <v-container fluid fill-height class="bg-image">
    <form-login></form-login>
  </v-container>
</template>

<script>
import FormLogin from "@/components/FormLogin";
export default {
  components: {
    FormLogin,
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("../assets/bg_main.jpg");
  background-position: center;
  background-size: cover;
}
</style>

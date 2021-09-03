<template>
  <v-layout justify-center align-center>
    <v-container>
      <v-col cols="12" class="text-center">
        <v-icon size="60px">{{ expiredSection.icon }}</v-icon>
      </v-col>
      <v-col cols="12" class="text-center">
        <span class="display-1">{{ expiredSection.text }}</span>
      </v-col>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      expiredSection: {
        icon: "mdi-lock",
        text: "Acesso não autorizado!",
      },
    };
  },
};
</script>

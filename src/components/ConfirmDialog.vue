<template>
  <v-dialog v-model="show" max-width="400">
    <v-card shaped>
      <v-card-title class="text-center d-block">
        <v-icon color="warning" large>mdi-alert-circle-outline</v-icon>
        <p>Tem certeza disso?</p>
      </v-card-title>
      <v-card-text class="text-justify" v-html="message" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')" color="error" text> Cancelar </v-btn>
        <v-btn color="success lighten-1" text @click="$emit('confirm')">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    message: String,
    show: Boolean,
  },
};
</script>

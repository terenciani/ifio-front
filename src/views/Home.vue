<template>
  <v-row class="mt-5">
    <v-col cols="12">
      <v-card elevation="2" class="pa-5 text-center text-h4">
        Quantidade atual pessoas no estabelecimento
        <v-divider class="my-5"></v-divider>
        {{ counter }}
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" class="text-center">
      <v-btn
        block
        x-large
        class="pa-5 btn-counter"
        color="primary"
        @click="increment"
      >
        <v-icon x-large> mdi-plus-thick </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6" class="text-center">
      <v-btn
        block
        x-large
        class="pa-5 btn-counter"
        color="error"
        @click="decrement"
      >
        <v-icon x-large> mdi-minus-thick </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter <= 0) return;
      this.counter--;
    },
  },
  async mounted() {},
};
</script>

<style scoped>
.btn-counter {
  height: 100px !important;
}
</style>
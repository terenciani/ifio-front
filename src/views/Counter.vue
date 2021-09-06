<template>
  <v-container fill-height align-start>
    <v-col cols="12">
      <v-card class="mx-auto" color="grey lighten-4">
        <v-card-title>
          <v-icon color="indigo" class="mr-12" size="64">
            mdi-account-group
          </v-icon>
          <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
          <v-row align="start">
            <div class="text-caption grey--text text-uppercase mr-5">
              Pessoas no estabelecimento
            </div>
            <div>
              <span class="text-h3 font-weight-black" v-text="counter"></span>
            </div>
          </v-row>
        </v-card-title>
        <v-sheet color="transparent" v-if="lastCountersValues">
          <v-sparkline
            :key="String(counter)"
            :smooth="16"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            :line-width="3"
            :value="lastCountersValues"
            auto-draw
            stroke-linecap="round"
          ></v-sparkline>
        </v-sheet>
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
  </v-container>
</template>

<script>
import CounterService from "@/service/CounterService";
export default {
  name: "Home",
  data() {
    return {
      counter: 0,
      lastCounters: [10, 50, 20, 30, 15, 0],
    };
  },
  methods: {
    async increment() {
      this.counter = await CounterService.increment(this.counter++);
      this.lastCounters[this.lastCounters.length - 1] = { counter: this.counter };
    },
    async decrement() {
      if (this.counter <= 0) return;
      this.counter = await CounterService.decrement(this.counter++);
      this.lastCounters[this.lastCounters.length] = { counter: this.counter };
    },
    async init() {
      this.counter = await CounterService.getCounter();
      this.lastCounters =
        (await CounterService.getLastCountersByLimit(5)) || new Array();
      this.lastCounters.push({ counter: this.counter });
    },
  },
  computed: {
    lastCountersValues() {
      return this.lastCounters.map(x => x.counter) || [{ counter: 0 }];
    },
  },
  async mounted() {
    this.init();
  },
};
</script>

<style scoped>
.btn-counter {
  height: 100px !important;
}
</style>

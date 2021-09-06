import API from "../Api";
export default class CounterService {
  static async increment() {
    try {
      const res = await API.get("/increment");
      return res.data.counter;
    } catch (error) {
      throw error.response.data;
    }
  }
  static async decrement() {
    try {
      const res = await API.get("/decrement");
      return res.data.counter;
    } catch (error) {
      throw error.response.data;
    }
  }
  static async getCounter() {
    try {
      const res = await API.get("/counter");
      return res.data.counter;
    } catch (error) {
      throw error.response.data;
    }
  }
  static async getLastCountersByLimit(limit) {
    try {
      const res = await API.get("/last-counter/" + limit);
      return res.data.reverse();
    } catch (error) {
      throw error.response.data;
    }
  }
}

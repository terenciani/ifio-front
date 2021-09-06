import API from "../Api";
export default class UserService {
  static async update(user) {
    console.log(user);
  }
  static async save(user) {
    console.log(user);
  }
  static async getAll() {
    try {
      const res = await API.get("/user");
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  static async remove(user) {
    console.log(user);
  }
}

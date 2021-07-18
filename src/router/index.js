import Vue from "vue";
import VueRouter from "vue-router";
// import Store from "./../store";
// import AuthService from "../service/AuthService";
import routes from "./routes";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/*
const validationPipeline = [
  ({ logged }) => logged,
  ({ to, role }) => role === "ADMIN" || to.matched.meta?.access?.includes(role),
];
const findLoggedUser = () =>
  Store.getters.getUserLogged || AuthService.getLoggedUser();

const isAvaliable = (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = findLoggedUser();
    const unauthorized = validationPipeline.some((fn) => !fn(user));
    unauthorized ? next({ path: "/login" }) : next();
  } else next();
};
router.beforeEach(isAvaliable);

*/
export default router;

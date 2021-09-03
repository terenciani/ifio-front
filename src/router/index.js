import Vue from "vue";
import VueRouter from "vue-router";
import Store from "./../store";
import routes from "./routes";

const { users } = Store.getters["apiHelper/allHelpers"];

const { rules } = users;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const isAvaliable = (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = Store.getters.getLoggedUser;

    if (user.rule === rules.manager || to.meta?.access?.includes(user.rule))
      next();
    else next({ path: "/unauthorized" });
  } else next();
};
router.beforeEach(isAvaliable);

export default router;

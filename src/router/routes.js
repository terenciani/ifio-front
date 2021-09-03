import Store from "../store";

const { users } = Store.getters["apiHelper/allHelpers"];

const { rules } = users;

const routes = [
  {
    path: "/unauthorized",
    name: "Acesso não autorizado",
    component: () => import(`@/views/Unauthorized.vue`),
  },
  {
    path: "/expired",
    name: "Sessão expirada",
    component: () => import(`@/views/Expired.vue`),
  },
  {
    path: "/infographic",
    name: "Relatórios Gerenciais",
    meta: {
      access: [rules.manager],
      requiresAuth: true,
    },
    component: () => import(`@/views/Infographic.vue`),
  },
  {
    path: "/counter",
    name: "Contador",
    meta: {
      access: [rules.server],
      requiresAuth: true,
    },
    component: () => import(`@/views/Counter.vue`),
  },
  {
    path: "/user",
    name: "Usuários",
    meta: {
      access: [rules.manager],
      requiresAuth: true,
    },
    component: () => import(`@/views/User.vue`),
  },
];
export default routes;

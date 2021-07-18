const routes = [
  {
    path: "/unauthorized",
    name: "Acesso não autorizado",
  },
  {
    path: "/expired",
    name: "Sessão expirada",
    component: () => import(`@/views/Expired.vue`),
  },
  {
    path: "/login",
    name: "Página de Login",
    component: () => import(`@/views/Login.vue`),
  },
  {
    path: "/",
    name: "Contador",
    meta: {
      access: ["USER"],
      requiresAuth: true,
    },
    component: () => import(`@/views/Home.vue`),
  },
];
export default routes;

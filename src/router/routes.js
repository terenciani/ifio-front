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
    path: "/infographic",
    name: "Relatórios Gerenciais",
    component: () => import(`@/views/Infographic.vue`),
  },
  {
    path: "/counter",
    name: "Contador",
    meta: {
      access: ["USER"],
      requiresAuth: true,
    },
    component: () => import(`@/views/Counter.vue`),
  },
];
export default routes;

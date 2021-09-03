/* eslint-disable */
import Store from "../store";

const { users } = Store.getters["apiHelper/allHelpers"];

const { rules } = users;

const internalRoutes = [
  {
    path: "/unauthorized",
    name: "Acesso não autorizado",
    component: () => import(`@/views/Unauthorized.vue`),
  },
  {
    path: "/expired",
    name: "Sessão expirada",
    component: () => import(`@/views/Expired.vue`),
  }
];

const adminRoutes = [
  {
    path: "/infographic",    
    name: "Relatórios Gerenciais",
    icon: "mdi-slot-machine",
    meta: {
      access: [rules.manager],
      requiresAuth: true,
    },
    component: () => import(`@/views/Infographic.vue`),
  },
  {
    path: "/user",
    name: "Usuários",
    icon: "mdi-account-group",
    meta: {
      access: [rules.manager],
      requiresAuth: true,
    },
    component: () => import(`@/views/User.vue`),
  },
];

const userRoutes = [
  {
    path: "/counter",
    name: "Contador",    
    icon: "mdi-home",
    heading: false,
    meta: {
      access: [rules.server],
      requiresAuth: true,
    },
    component: () => import(`@/views/Counter.vue`),
  },
];

const adminHeader = [
  {
    icon: "mdi-cogs",
    name: "Administração",
    heading: true,
    children: new Array()
  },
];

class DrawerItems {
  static async getItems() {
    const user = Store.getters.getLoggedUser;
    if(user.rule === rules.manager){
      adminHeader[0].children = adminRoutes;
      return userRoutes.concat(adminHeader)
    }else {
      return userRoutes;
    }
  }
}

const routes = adminRoutes.concat(userRoutes).concat(internalRoutes);

export { routes, DrawerItems };

// import AuthService from "../service/AuthService";
const adminItems = [
  {
    icon: "mdi-cogs",
    text: "Administração",
    heading: true,
    children: [
      {
        icon: "mdi-slot-machine",
        text: "Infográficos",
        to: "/infographic",
      },
      {
        icon: "mdi-account-group",
        text: "Gestão de Usuários",
        to: "/user",
      },
    ],
  },
];

const userItems = [
  {
    icon: "mdi-home",
    text: "Contador",
    to: "/counter",
    heading: false,
  },
];

class DrawerItems {
  static async getItems() {
    return userItems.concat(adminItems);
    /*let roleUser = await AuthService.getRoleUser();
    if (roleUser == "ADMIN") return userItems.concat(adminItems);
    return userItems;*/
  }
}
export default DrawerItems;

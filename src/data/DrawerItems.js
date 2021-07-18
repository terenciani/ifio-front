import AuthService from "../service/AuthService";
const adminItems = [
  {
    icon: "mdi-cogs",
    text: "Administração",
    heading: true,
    children: [
      {
        icon: "mdi-slot-machine",
        text: "Infográfico",
        to: "/infographic",
      },
    ],
  },
];

const userItems = [
  {
    icon: "mdi-home",
    text: "Contador",
    to: "/",
    heading: false,
  },
];

class DrawerItems {
  static async getItems() {
    let roleUser = await AuthService.getRoleUser();
    if (roleUser == "ADMIN") return userItems.concat(adminItems);
    return userItems;
  }
}
export default DrawerItems;

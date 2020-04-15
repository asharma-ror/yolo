module.exports = [
  {
    key: "pricing",
    name: "Pricing",
    icon: "ios-cash-outline",
    child: [
      {
        key: "dashboard",
        name: "Dashboard",
        link: "/pricing/dashboard",
        icon: "ios-cash-outline",
      },
      {
        key: "details",
        name: "Details",
        link: "/pricing/details",
        icon: "ios-grid-outline",
      },
    ],
  },
  {
    key: "products",
    name: "Products",
    icon: "ios-briefcase-outline",
    child: [
      {
        key: "list",
        name: "Products List",
        link: "/product/list",
        icon: "ios-list-box-outline",
      },
      // {
      //   key: "allotments",
      //   name: "Allotments",
      //   link: "/product/allotments",
      //   icon: "ios-options-outline",
      // },
    ],
  },
  {
    key: "reservations",
    name: "Reservations",
    icon: "ios-cart-outline",
    child: [
      {
        key: "list",
        name: "Reservations List",
        link: "/reservations/list",
        icon: "ios-list-box-outline",
      },
      // {
      //   key: "assignation",
      //   name: "Assignation",
      //   link: "/reservations/assignation",
      //   icon: "ios-grid-outline",
      // },
    ],
  },
  // {
  //   key: "auth",
  //   name: "Auth Page",
  //   icon: "ios-contact-outline",
  //   child: [
  //     {
  //       key: "auth_page",
  //       name: "User Authentication",
  //       title: true,
  //     },
  //     {
  //       key: "login",
  //       name: "Login",
  //       link: "/login",
  //       icon: "ios-person-outline",
  //     },
  //     {
  //       key: "register",
  //       name: "Register",
  //       link: "/register",
  //       icon: "ios-key-outline",
  //     },
  //     {
  //       key: "reset",
  //       name: "Reset Password",
  //       link: "/reset-password",
  //       icon: "ios-undo-outline",
  //     },
  //   ],
  // },
  // {
  //   key: "errors",
  //   name: "Errors",
  //   icon: "ios-paw-outline",
  //   child: [
  //     {
  //       key: "errors_page",
  //       name: "Errors Pages",
  //       title: true,
  //     },
  //     {
  //       key: "not_found_page",
  //       name: "Not Found Page",
  //       link: "/app/pages/not-found",
  //       icon: "ios-warning-outline",
  //     },
  //     {
  //       key: "error_page",
  //       name: "Error Page",
  //       link: "/app/pages/error",
  //       icon: "ios-warning-outline",
  //     },
  //   ],
  // },
  // {
  //   key: "menu_levels",
  //   name: "Menu Levels",
  //   multilevel: true,
  //   icon: "ios-menu-outline",
  //   child: [
  //     {
  //       key: "level_1",
  //       name: "Level 1",
  //       link: "/#",
  //     },
  //     {
  //       key: "level_2",
  //       keyParent: "menu_levels",
  //       name: "Level 2",
  //       child: [
  //         {
  //           key: "sub_menu_1",
  //           name: "Sub Menu 1",
  //           link: "/#",
  //         },
  //         {
  //           key: "sub_menu_2",
  //           name: "Sub Menu 2",
  //           link: "/#",
  //         },
  //       ],
  //     },
  //   ],
  // },
]

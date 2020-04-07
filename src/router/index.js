import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Welcome.vue")
      },
      {
        path: "/users",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/user/User.vue")
      },
      {
        path: "/roles",
        name: "Roles",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/permission/Role.vue")
      },
      {
        path: "/menus",
        name: "Menus",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/permission/Menu.vue")
      },
      {
        path: "/permission",
        name: "Permission",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "../views/permission/SignPermission.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, fron, next) => {
  if (to.path === "/login") {
    return next();
  }
  const token = window.sessionStorage.getItem("token");
  if (!token) {
    return next("/login");
  }
  next();
});

export default router;

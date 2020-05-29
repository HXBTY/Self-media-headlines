import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // @别名, 代表src目录的绝对路径名地址
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user")
  }
];

const router = new VueRouter({
  routes
});

export default router;
